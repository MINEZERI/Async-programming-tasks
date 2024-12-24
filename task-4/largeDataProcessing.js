async function* asyncIterator(arr) {
  for (const el of arr) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield el * 2; // Обробка елемента
  }
}
