<template>

  <div class="lds-facebook">
    <div>
    </div>
    <div>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true,
      },
    },
  }
</script>

<style>
  .lds-facebook {
    display: inline-block;
    position: fixed;
    width: 64px;
    height: 64px;
    top: 50%;
    left: 56%;
  }
  .loding-title{
    display: inline-block;
    position: fixed;
    top: 57%;
    left: 52.5%;
    color:#163945;
    font-size:1.5vh;
  }

  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 6px;
    width: 13px;
    background: #43de91;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  .lds-facebook div:nth-child(1) {
    left: 6px;
    animation-delay: -0.24s;
  }

  .lds-facebook div:nth-child(2) {
    left: 26px;
    animation-delay: -0.12s;
  }

  .lds-facebook div:nth-child(3) {
    left: 45px;
    animation-delay: 0;
  }

  @keyframes lds-facebook {
    0% {
      top: 6px;
      height: 51px;
    }

    50%,
    100% {
      top: 19px;
      height: 26px;
    }
  }
</style>