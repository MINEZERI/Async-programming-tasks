function map(arr, callback, finalCallback, abortSignal) {
  const results = [];
  let completed = 0;

  if (abortSignal) {
    abortSignal.addEventListener("abort", () => {
      finalCallback(new Error("Operation aborted"));
    });
  }

  arr.forEach((el, index) => {
    if (abortSignal?.aborted) return;

    callback(el, (err, result) => {
      if (err) {
        finalCallback(err);
        return;
      }
      results[index] = result;
      completed++;

      if (completed === arr.length && !abortSignal?.aborted) {
        finalCallback(null, results);
      }
    });
  });
}

const controller = new AbortController();
const signal = controller.signal;

setTimeout(() => controller.abort(), 500); // Скасувати після 500 мс

map(
  [1, 2, 3],
  (num, callback) => {
    setTimeout(() => callback(null, num * 2), 1000);
  },
  (err, results) => {
    if (err) {
      console.error("Error:", err.message); // Операція була скасована
    } else {
      console.log("Results:", results);
    }
  },
  signal,
);
