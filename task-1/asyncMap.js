function map(arr, callback, finalCallback, debounceTime = 0) {
  const results = [];
  let completed = 0;

  arr.forEach((el, index) => {
    callback(el, (err, result) => {
      if (err) {
        finalCallback(err);
        return;
      }
      results[index] = result;
      completed++;

      if (completed === arr.length) {
        setTimeout(() => finalCallback(null, results), debounceTime);
      }
    });
  });
}

const numbers = [1, 2, 3];
map(
  numbers,
  (num, callback) => {
    setTimeout(() => {
      callback(null, num * 2);
    }, 500);
  },
  (err, results) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("Results:", results); // results: 2, 4, 6
    }
  },
  1000,
);
