const dotenv = require('dotenv');
// load the env configs
dotenv.config({ path: './.env' });

// load other modules
const { cpus } = require('os');
const cluster = require('cluster');
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

async function bootstrap() {
  await mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.listen(port);
}

if(cluster.isMaster) {
  let cpusArr = cpus();
  
  for(let i = 0; i < cpusArr.length; i++) {
    cluster.fork();
  }

  cluster.on("exit", worker => {
    console.log(`Worker with pid ${worker.id} exited`);
    cluster.fork();
  });

} else {
  bootstrap()
    .then(() => console.log(`App listening on port ${port}`));

  // graceful shutdown of the worker process
  process.on("uncaughtException", err => {
    console.log(err);
    process.exit(0);
  });
  
  process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(0);
  });
}