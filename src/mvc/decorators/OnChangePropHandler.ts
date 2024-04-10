import { EventEmitter } from "../../common/EventEmitter";

export function OnChangePropHandler(modelProperty: string) {
    return function (target: any, _: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        EventEmitter.Instance.on(`on${modelProperty}Change`, originalMethod);
    };
}