const EventEmitter = require("events");

class DataEmitter extends EventEmitter {
  emitData(arr) {
    arr.forEach((el, index) => {
      setTimeout(() => {
        this.emit("data", el * 2);

        if (index === arr.length - 1) {
          this.emit("end");
        }
      }, Math.random() * 1000);
    });
  }
}

const emitter = new DataEmitter();

emitter.on("data", (data) => {
  console.log("Received data:", data);
});

emitter.on("end", () => {
  console.log("Processing completed.");
});

emitter.emitData([1, 2, 3, 4, 5, 6, 7]);
