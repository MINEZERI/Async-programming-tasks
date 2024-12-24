function map(arr, callback, concurrency = Infinity) {
  const results = [];
  let running = 0;
  let index = 0;

  return new Promise((resolve, reject) => {
    function next() {
      if (index === arr.length && running === 0) {
        resolve(results);
        return;
      }

      while (running < concurrency && index < arr.length) {
        const currentIndex = index++;
        running++;
        callback(arr[currentIndex], (err, result) => {
          running--;
          if (err) {
            reject(err);
            return;
          }
          results[currentIndex] = result;
          next();
        });
      }
    }

    next();
  });
}

const numbers = [1, 2, 3];
map(
  numbers,
  (num, callback) => {
    setTimeout(() => {
      callback(null, num * 2);
    }, 1000);
  },
  2,
)
  .then((results) => {
    console.log("Results:", results); // results: 2, 4, 6
  })
  .catch((err) => {
    console.error("Error:", err);
  });
