import { PinchScrollZoomSetData } from "./entry.esm";
declare const _default: import("vue").DefineComponent<{
    contentWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    contentHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    width: {
        type: NumberConstructor;
        required: true;
    };
    height: {
        type: NumberConstructor;
        required: true;
    };
    originX: {
        type: NumberConstructor;
        required: false;
        default: undefined;
    };
    originY: {
        type: NumberConstructor;
        required: false;
        default: undefined;
    };
    translateX: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    translateY: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    scale: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    throttleDelay: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    within: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    minScale: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    maxScale: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    wheelVelocity: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    draggable: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    enableScaling: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableStartDrag: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableStopDrag: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableDragging: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    componentStyle: import("vue").ComputedRef<{
        width: string;
        height: string;
    }>;
    componentClass: import("vue").ComputedRef<{
        "pinch-scroll-zoom--zoom-in": import("vue").Ref<boolean>;
        "pinch-scroll-zoom--zoom-out": import("vue").Ref<boolean>;
    }>;
    containerStyle: import("vue").ComputedRef<{
        transform: string;
        "transform-origin": string;
    }>;
    startDrag: (touchEvent: any) => void;
    doDrag: (touchEvent: any) => void;
    setData: (data: PinchScrollZoomSetData) => void;
    el: import("vue").Ref<HTMLDivElement | undefined>;
    currentScale: import("vue").Ref<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("stopDrag" | "startDrag" | "dragging" | "scaling")[], "stopDrag" | "startDrag" | "dragging" | "scaling", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    contentWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    contentHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    width: {
        type: NumberConstructor;
        required: true;
    };
    height: {
        type: NumberConstructor;
        required: true;
    };
    originX: {
        type: NumberConstructor;
        required: false;
        default: undefined;
    };
    originY: {
        type: NumberConstructor;
        required: false;
        default: undefined;
    };
    translateX: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    translateY: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    scale: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    throttleDelay: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    within: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    minScale: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    maxScale: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    wheelVelocity: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    draggable: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    enableScaling: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableStartDrag: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableStopDrag: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableDragging: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onStopDrag?: ((...args: any[]) => any) | undefined;
    onStartDrag?: ((...args: any[]) => any) | undefined;
    onDragging?: ((...args: any[]) => any) | undefined;
    onScaling?: ((...args: any[]) => any) | undefined;
}, {
    contentWidth: number;
    contentHeight: number;
    originX: number;
    originY: number;
    translateX: number;
    translateY: number;
    scale: number;
    throttleDelay: number;
    within: boolean;
    minScale: number;
    maxScale: number;
    wheelVelocity: number;
    draggable: boolean;
    enableScaling: boolean;
    enableStartDrag: boolean;
    enableStopDrag: boolean;
    enableDragging: boolean;
}>;
export default _default;
