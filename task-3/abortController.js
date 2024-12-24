// File: task-3/abort-controller.js
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
