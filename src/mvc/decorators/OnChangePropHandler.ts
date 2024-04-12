import { EventEmitter } from "../../common/EventEmitter";

export function OnChangePropHandler(modelProperty: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        EventEmitter.Instance.on(`on${modelProperty}Change`, originalMethod.bind(target));
    };
}