import { EventEmitter } from "../../common/EventEmitter";
import { BaseModel } from "../BaseModel";

export function NotifyPropery(target: BaseModel, key: string) {
    let value = (target as any)[key];
    const getter = function () {
        return value;
    };

    const setter = (newValue: any) => {
        value = newValue;
        EventEmitter.Instance.emit(`on${key}Change`, value);
    };

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
    });
}
