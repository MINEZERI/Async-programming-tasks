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

        callback(arr[currentIndex])
          .then((result) => {
            results[currentIndex] = result;
            running--;
            next();
          })
          .catch(reject);
      }
    }

    next();
  });
}

const numbers = [1, 2, 3];
map(
  numbers,
  (num) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(num * 2);
      }, 1000);
    });
  },
  2,
)
  .then((results) => {
    console.log("Results:", results);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
