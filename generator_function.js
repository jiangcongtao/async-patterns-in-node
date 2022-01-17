function* generatorFunction(y) {
  console.log('Generator function is running');

  let x = 5;
  yield x;

  x++;
  y = yield x;
  return x + y;
}

// since generator functions return generator objects that
// implements the iterator protocol, we assign the return
//value to a variable
let iterator = generatorFunction();

// the body of the function wont beging to execute till
// you call the .next method on the iterator
console.log(iterator.next()); //  done false

// because of first yield
console.log(iterator.next()); // done false

// because of second yield
console.log(iterator.next(4)); // done true

console.log('All done');
