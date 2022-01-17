const { Worker, isMainThread } = require('worker_threads');

const firstWorker = new Worker('cpu_intensive.js');

// OTHER METHOD
const secondWorker = new Worker(
  `console.log('Do CPU intensive stuff here...)`,
  { eval: true }
);

// OTHER OTHER METHOD
// if (isMainThread) {
//   const thirdWorker = new Worker(__filename);
// } else {
//     // Worker thread code goes here...
// }
