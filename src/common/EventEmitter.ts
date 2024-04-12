export class EventEmitter {
    private static instance: EventEmitter;

    events: Record<string, Function[]>;

    constructor() {
        this.events = {};
    }

    on(event: string, listener: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event: string, data?: any) {
        if (this.events[event]) {
            this.events[event].forEach((listener: Function) => listener(data));
        }
    }

    off(event: string, listenerToRemove: Function) {
        if (!this.events[event]) {
            return;
        }
        this.events[event] = this.events[event].filter((listener: Function) => listener !== listenerToRemove);
    }

    public static get Instance(): EventEmitter {
        if (EventEmitter.instance) {
            return EventEmitter.instance;
        }

        EventEmitter.instance = new EventEmitter();

        return EventEmitter.instance;
    }
}