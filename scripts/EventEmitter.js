export class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, cb) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(cb);
  }

  unsubscribeAll() {
    this.events = [];
  }

  emit(eventName, payload) {
    const callbacks = this.events[eventName];

    if (callbacks) {
      callbacks.forEach((cb) => {
        cb.call(null, payload);
      });
    }

    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (event) => event !== cb
      );
    };
  }
}
