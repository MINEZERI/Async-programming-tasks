const EventEmitter = require("events");

class DataEmitter extends EventEmitter {
  emitData(arr) {
    arr.forEach((el, index) => {
      setTimeout(() => {
        this.emit("data", el * 2);

        if (index === arr.length - 1) {
          this.emit("end");
        }
      }, 1000);
    });
  }
}
