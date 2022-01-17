// THIS CODE IS JUST USED TO BLOCK THE EVENT LOOP

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

if (isMainThread) {
  console.log('Starting the main thread');
  const worker = new Worker(__filename, {
    workerData: {
      outputPrefix: 'Recived message',
      timeToWaste: 500,
    },
  });
  console.log('Still in the main thread');

  worker.on('message', (msg) => {
    console.log(`Worker message: ${msg}`);
  });

  worker.postMessage('Done with my work.');
} else {
  parentPort.on('message', (msg) => {
    console.log(`${workerData.outputPrefix}: ${msg}`);
  });

  parentPort.postMessage('Getting started'); //pass msg to the main thread
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage('In the middle');
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage('All done');
}

function wasteTime(delay) {
  const end = Date.now() + delay;
  while (Date.now() < end) {}
}
