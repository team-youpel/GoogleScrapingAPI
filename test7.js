const CronJob = require('cron').CronJob;
const PremiumProx = require('./methodes/PremiumProx');
const Task = require('./models/taskModel');

taskRunning = false;
console.log('Before job instantiation');
const job3 = new CronJob('*/2 * * * * *', async () => {
  if (taskRunning) {
    console.log('returning');
    return;
  }
  taskRunning = true;
  try {
    const task = await Task.findOne({
      status: 'queued'
    });
    console.log(task);
    // await PremiumProx('Hello', '');
  } catch (err) {
    console.log(err);
  }
});
console.log('After job instantiation');
job3.start();
