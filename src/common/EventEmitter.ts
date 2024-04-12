export class EventEmitter {
    private static instance: EventEmitter;

    events: Record<string, any[]>;

    constructor() {
        this.events = {};
    }

    on(event: any, listener: any) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event: any, data?: any) {
        if (this.events[event]) {
            this.events[event].forEach((listener: any) => listener(data));
        }
    }

    off(event: any, listenerToRemove: any) {
        if (!this.events[event]) {
            return;
        }
        this.events[event] = this.events[event].filter((listener: any) => listener !== listenerToRemove);
    }

    public static get Instance(): EventEmitter {
        if (EventEmitter.instance) {
            return EventEmitter.instance;
        }

        EventEmitter.instance = new EventEmitter();

        return EventEmitter.instance;
    }
}