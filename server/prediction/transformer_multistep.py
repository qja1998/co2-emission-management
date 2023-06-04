import torch
import torch.nn as nn
import torch.backends.cudnn as cudnn
import numpy as np
import time
import math
import random
# from matplotlib import pyplot

torch.manual_seed(0)
np.random.seed(0)
torch.cuda.manual_seed(0)
torch.cuda.manual_seed_all(0)
cudnn.benchmark = False
cudnn.deterministic = True
random.seed(0)

if torch.cuda.is_available(): device = torch.device("cuda")
elif torch.backends.mps.is_available(): device = torch.device("mps")
else: device = torch.device('cpu')

# This concept is also called teacher forceing. 
# The flag decides if the loss will be calculted over all 
# or just the predicted values.
calculate_loss_over_all_values = False

# S is the source sequence length
# T is the target sequence length
# N is the batch size
# E is the feature number

#src = torch.rand((10, 32, 512)) # (S,N,E) 
#tgt = torch.rand((20, 32, 512)) # (T,N,E)
#out = transformer_model(src, tgt)
#
#print(out)

input_window = 120
output_window = 7
batch_size = 32 # batch size
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class PositionalEncoding(nn.Module):

    def __init__(self, d_model, max_len=5000):
        super(PositionalEncoding, self).__init__()       
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0).transpose(0, 1)
        #pe.requires_grad = False
        self.register_buffer('pe', pe)

    def forward(self, x):
        return x + self.pe[:x.size(0), :]
       

class TransAm(nn.Module):
    def __init__(self,feature_size=256,num_layers=3,dropout=0.1):
        super(TransAm, self).__init__()
        self.model_type = 'Transformer'
        
        self.src_mask = None
        self.pos_encoder = PositionalEncoding(feature_size)
        self.encoder_layer = nn.TransformerEncoderLayer(d_model=feature_size, nhead=16, dropout=dropout)
        self.transformer_encoder = nn.TransformerEncoder(self.encoder_layer, num_layers=num_layers)        
        self.decoder = nn.Linear(feature_size,1)
        self.init_weights()

    def init_weights(self):
        initrange = 0.1    
        self.decoder.bias.data.zero_()
        self.decoder.weight.data.uniform_(-initrange, initrange)

    def forward(self,src):
        if self.src_mask is None or self.src_mask.size(0) != len(src):
            device = src.device
            mask = self._generate_square_subsequent_mask(len(src)).to(device)
            self.src_mask = mask

        src = self.pos_encoder(src)
        output = self.transformer_encoder(src,self.src_mask)#, self.src_mask)
        output = self.decoder(output)
        return output

    def _generate_square_subsequent_mask(self, sz):
        mask = (torch.triu(torch.ones(sz, sz)) == 1).transpose(0, 1)
        mask = mask.float().masked_fill(mask == 0, float('-inf')).masked_fill(mask == 1, float(0.0))
        return mask



# if window is 100 and prediction step is 1
# in -> [0..99]
# target -> [1..100]
def create_inout_sequences(input_data, tw):
    inout_seq = []
    L = len(input_data)
    for i in range(L-tw):
        train_seq = np.append(input_data[i:i+tw][:-output_window] , output_window * [0])
        train_label = input_data[i:i+tw]
        #train_label = input_data[i+output_window:i+tw+output_window]
        inout_seq.append((train_seq ,train_label))
    return torch.FloatTensor(inout_seq)

def get_data(type='A'):
    time        = np.arange(0, 400, 0.1)
    #amplitude   = np.sin(time) + np.sin(time*0.05) +np.sin(time*0.12) *np.random.normal(-0.2, 0.2, len(time))
    
    from pandas import read_csv
    series = read_csv('./data/korea/kor_gas_day.csv', header=0, index_col=0)#, parse_dates=True, squeeze=True)
    series = series.loc[series.type == type]
    series = series.drop(['type','year','month','day'], axis=1)
    from sklearn.preprocessing import MinMaxScaler
    scaler = MinMaxScaler(feature_range=(-1, 1)) 
    amplitude = scaler.fit_transform(series.to_numpy().reshape(-1, 1)).reshape(-1)
    #amplitude = scaler.fit_transform(amplitude.reshape(-1, 1)).reshape(-1)
    
    
    sampels = 2000
    train_data = amplitude[:sampels]
    test_data = amplitude[sampels:]

    # convert our train data into a pytorch train tensor
    #train_tensor = torch.FloatTensor(train_data).view(-1)
    # todo: add comment.. 
    train_sequence = create_inout_sequences(train_data,input_window)
    train_sequence = train_sequence[:-output_window] #todo: fix hack?

    #test_data = torch.FloatTensor(test_data).view(-1) 
    test_data = create_inout_sequences(test_data,input_window)
    test_data = test_data[:-output_window] #todo: fix hack?

    return train_sequence.to(device),test_data.to(device), scaler

def get_pred_input_data(data_array):
    time        = np.arange(0, 400, 0.1)
    #amplitude   = np.sin(time) + np.sin(time*0.05) +np.sin(time*0.12) *np.random.normal(-0.2, 0.2, len(time))
    
    from sklearn.preprocessing import MinMaxScaler
    scaler = MinMaxScaler(feature_range=(-1, 1)) 
    amplitude = scaler.fit_transform(data_array.reshape(-1, 1)).reshape(-1)
    #amplitude = scaler.fit_transform(amplitude.reshape(-1, 1)).reshape(-1)
    

    # convert our train data into a pytorch train tensor
    #train_tensor = torch.FloatTensor(train_data).view(-1)
    # todo: add comment.. 
    sequence = create_inout_sequences(amplitude,input_window)
    sequence = sequence[:-output_window] #todo: fix hack?

    return sequence.to(device), scaler

def get_batch(source, i,batch_size):
    seq_len = min(batch_size, len(source) - 1 - i)
    data = source[i:i+seq_len]    
    input = torch.stack(torch.stack([item[0] for item in data]).chunk(input_window,1)) # 1 is feature size
    target = torch.stack(torch.stack([item[1] for item in data]).chunk(input_window,1))
    return input, target


# def train(train_data):
#     model.train() # Turn on the train mode
#     total_loss = 0.
#     start_time = time.time()

#     for batch, i in enumerate(range(0, len(train_data) - 1, batch_size)):
#         data, targets = get_batch(train_data, i,batch_size)
#         optimizer.zero_grad()
#         output = model(data)        

#         if calculate_loss_over_all_values:
#             loss = criterion(output, targets)
#         else:
#             loss = criterion(output[-output_window:], targets[-output_window:])
    
#         loss.backward()
#         torch.nn.utils.clip_grad_norm_(model.parameters(), 0.5)
#         optimizer.step()

#         total_loss += loss.item()
#         log_interval = int(len(train_data) / batch_size / 5)
#         if batch % log_interval == 0 and batch > 0:
#             cur_loss = total_loss / log_interval
#             elapsed = time.time() - start_time
#             print('| epoch {:3d} | {:5d}/{:5d} batches | '
#                   'lr {:02.6f} | {:5.2f} ms | '
#                   'loss {:5.5f} | ppl {:8.2f}'.format(
#                     epoch, batch, len(train_data) // batch_size, scheduler.get_lr()[0],
#                     elapsed * 1000 / log_interval,
#                     cur_loss, math.exp(cur_loss)))
#             total_loss = 0
#             start_time = time.time()

# def plot_and_loss(eval_model, data_source,epoch, scaler):
#     eval_model.eval() 
#     total_loss = 0.
#     test_result = torch.Tensor(0)    
#     truth = torch.Tensor(0)
#     with torch.no_grad():
#         for i in range(0, len(data_source) - 1):
#             data, target = get_batch(data_source, i,1)
#             # look like the model returns static values for the output window
#             output = eval_model(data)
#             if calculate_loss_over_all_values:                                
#                 total_loss += criterion(output, target).item()
#             else:
#                 total_loss += criterion(output[-output_window:], target[-output_window:]).item()
            
#             test_result = torch.cat((test_result, output[-1].view(-1).cpu()), 0) #todo: check this. -> looks good to me
#             truth = torch.cat((truth, target[-1].view(-1).cpu()), 0)
#     truth = scaler.inverse_transform(truth.reshape(1, -1)).reshape(-1, 1)
#     test_result = scaler.inverse_transform(test_result.reshape(1, -1)).reshape(-1, 1)
#     #test_result = test_result.cpu().numpy()
#     len(test_result)

#     pyplot.figure(figsize=(30,20))
#     pyplot.subplot(211)
#     pyplot.plot(test_result,color="red")
#     pyplot.plot(truth[:500],color="blue")
#     pyplot.grid(True, which='both')
#     pyplot.axhline(y=0, color='k')
#     pyplot.subplot(212)
#     pyplot.plot(test_result-truth,color="green")
#     pyplot.savefig(RESULT_PATH + '/transformer-epoch%d.png'%epoch)
#     pyplot.grid(True, which='both')
#     pyplot.axhline(y=0, color='k')
#     pyplot.close()
    
#     return total_loss / i


def predict_future(eval_model, data_source_list, steps):
    eval_model.eval()
    total_loss = 0.
    test_result = torch.Tensor(0)    
    truth = torch.Tensor(0)
    # pyplot.figure(figsize=(20, 10))
    sub_num = 421
    
    for data_source, type, scaler in data_source_list:
        _ , data = get_batch(data_source, 0,1)
        with torch.no_grad():
            for i in range(0, steps,1):
                input = torch.clone(data[-input_window:])
                input[-output_window:] = 0     
                output = eval_model(data[-input_window:])                        
                data = torch.cat((data, output[-1:]))
                
        data = data.cpu().view(-1)
        data = scaler.inverse_transform(data.reshape(1, -1)).reshape(-1, 1)
    #     pyplot.subplot(sub_num)
    #     plot = pyplot.plot(data,color="red")
    #     pyplot.legend(handles=(plot), labels=(type))
    #     pyplot.plot(data[:input_window],color="blue")
    #     pyplot.grid(True, which='both')
    #     pyplot.axhline(y=0, color='k')
    #     sub_num += 1
    # pyplot.savefig(RESULT_PATH + '/future%d/transformer-future%d.png'%(steps, epoch))
    # pyplot.close()
    return data
        
# entweder ist hier ein fehler im loss oder in der train methode, aber die ergebnisse sind unterschiedlich 
# auch zu denen der predict_future
# def evaluate(eval_model, data_source, scaler):
#     eval_model.eval() # Turn on the evaluation mode
#     total_loss = 0.
#     eval_batch_size = 1000
#     with torch.no_grad():
#         for i in range(0, len(data_source) - 1, eval_batch_size):
#             data, targets = get_batch(data_source, i,eval_batch_size)
#             output = eval_model(data)
#             if calculate_loss_over_all_values:
#                 total_loss += len(data[0])* criterion(output, targets).cpu().item()
#             else:                                
#                 total_loss += len(data[0])* criterion(output[-output_window:], targets[-output_window:]).cpu().item()            
#     return total_loss / len(data_source)

import sys, os

# train_data, val_data, scaler0 = get_data('I')
# train_data1, val_data1, scaler1 = get_data('A')
# train_data2, val_data2, scaler2 = get_data('B')
# train_data3, val_data3, scaler3 = get_data('C')
# train_data4, val_data4, scaler4 = get_data('D')
# train_data5, val_data5, scaler5 = get_data('E')
# train_data6, val_data6, scaler6 = get_data('G')
# train_data7, val_data7, scaler7 = get_data('H')

# val_data_list = ((val_data, 'I', scaler0),
#                 (train_data1, 'A', scaler1),
#                 (train_data2, 'B', scaler2),
#                 (train_data3, 'C', scaler3),
#                 (train_data4, 'D', scaler4),
#                 (train_data5, 'E', scaler5),
#                 (train_data6, 'G', scaler6),
#                 (train_data7, 'H', scaler7))

def get_prediction(data):
    feature_size=32
    num_layers=1
    model = TransAm(feature_size=feature_size, num_layers=num_layers)
    model.load_state_dict(torch.load('prediction/120-7_32_32-1_0.005_300/120_32_32-1_0.005_300-best_model-0.04147.pt',
                                            map_location=torch.device('cpu')))
    if len(data) < input_window:
        return [0 for _ in range(180)]
    
    data = np.array(data)
    print(data.shape, data.dtype)#(2191,) float64
    data, scaler = get_pred_input_data(data)
    data_list = [(data, '', scaler)]
    pred = predict_future(model, data_list, 180)

    return [p[0] for p in pred]

if __name__=='__main__':
    train_data, val_data, scaler0 = get_data('I')
    train_data1, val_data1, scaler1 = get_data('A')
    train_data2, val_data2, scaler2 = get_data('B')
    train_data3, val_data3, scaler3 = get_data('C')
    train_data4, val_data4, scaler4 = get_data('D')
    train_data5, val_data5, scaler5 = get_data('E')
    train_data6, val_data6, scaler6 = get_data('G')
    train_data7, val_data7, scaler7 = get_data('H')

    val_data_list = ((val_data, 'I', scaler0),
                    (train_data1, 'A', scaler1),
                    (train_data2, 'B', scaler2),
                    (train_data3, 'C', scaler3),
                    (train_data4, 'D', scaler4),
                    (train_data5, 'E', scaler5),
                    (train_data6, 'G', scaler6),
                    (train_data7, 'H', scaler7))

    feature_size=32
    num_layers=1
    model = TransAm(feature_size=feature_size, num_layers=num_layers)

    model.load_state_dict(torch.load('./120-7_32_32-1_0.005_300/120_32_32-1_0.005_300-best_model-0.04147.pt',
                                         map_location=torch.device('cpu')))
    #print(predict_future(model, val_data_list, 180))

# criterion = nn.MSELoss()
# lr = 0.005
# #optimizer = torch.optim.SGD(model.parameters(), lr=lr)
# optimizer = torch.optim.AdamW(model.parameters(), lr=lr)
# scheduler = torch.optim.lr_scheduler.StepLR(optimizer, 1.0, gamma=0.98)

# best_val_loss = float("inf")
# epochs = 300 # The number of epochs
# best_model = None
# pred_step = 180

# RESULT_PATH = f"./transformer_results/{input_window}-{output_window}_{batch_size}_{feature_size}-{num_layers}_{lr}_{epochs}"

# if not os.path.isdir(RESULT_PATH):
#     os.mkdir(RESULT_PATH)
# if not os.path.isdir(RESULT_PATH + f"/future{pred_step}"):
#     os.mkdir(RESULT_PATH + f"/future{pred_step}")
# sys.stdout = open(RESULT_PATH + "/output.txt", 'w')


# for epoch in range(1, epochs + 1):
#     epoch_start_time = time.time()
#     train(train_data)
    
    
#     if(epoch % 10 == 0):
#         val_loss = plot_and_loss(model, val_data,epoch, scaler0)
#         predict_future(model, val_data_list, pred_step)
#     else:
#         val_loss = evaluate(model, val_data, scaler0)
        
#     print('-' * 89)
#     print('| end of epoch {:3d} | time: {:5.2f}s | valid loss {:5.5f} | valid ppl {:8.2f}'.format(epoch, (time.time() - epoch_start_time),
#                                      val_loss, math.exp(val_loss)))
#     print('-' * 89)

#     if val_loss < best_val_loss:
#         best_val_loss = val_loss
#         best_model = model

#     scheduler.step() 

# torch.save(model.state_dict(), f"{RESULT_PATH}/{input_window}_{batch_size}_{feature_size}-{num_layers}_{lr}_{epochs}-best_model-{best_val_loss:.5f}.pt")

#src = torch.rand(input_window, batch_size, 1) # (source sequence length,batch size,feature number) 
#out = model(src)
#
#print(out)
#print(out.shape)
