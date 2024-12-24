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
