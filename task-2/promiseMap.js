function map(arr, callback) {
  const promises = arr.map(
    (el) =>
      new Promise((resolve, reject) => {
        callback(el, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      }),
  );

  return Promise.all(promises);
}

const numbers = [1, 2, 3];
map(numbers, (num, callback) => {
  setTimeout(() => {
    callback(null, num * 2);
  }, 500);
})
  .then((results) => {
    console.log("Results:", results); // results: 2, 4, 6
  })
  .catch((err) => {
    console.error("Error:", err);
  });
