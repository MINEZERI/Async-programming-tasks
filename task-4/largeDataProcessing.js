async function* asyncIterator(arr) {
  for (const el of arr) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield el * 2; // Обробка елемента
  }
}

async function processLargeData(arr) {
  const iterator = asyncIterator(arr);

  console.log("Processing...");
  for await (const el of iterator) {
    console.log("Processed:", el);
  }
}

processLargeData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
