import { Plugin } from 'vue';
export interface PinchScrollZoomEmitData {
    x: number;
    y: number;
    scale: number;
    originX: number;
    originY: number;
    translateX: number;
    translateY: number;
}
export interface PinchScrollZoomSetData {
    scale: number;
    originX: number;
    originY: number;
    translateX: number;
    translateY: number;
}
export declare type PinchScrollZoomRef = HTMLElement & {
    setData: (data: PinchScrollZoomSetData) => void;
};
import component from "./pinch-scroll-zoom.vue";
declare type InstallableComponent = typeof component & {
    install: Exclude<Plugin['install'], undefined>;
};
declare const _default: InstallableComponent;
export default _default;
