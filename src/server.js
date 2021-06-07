import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

// load the env configs
dotenv.config({ path: './.env' });

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

bootstrap().then(() => console.log(`App listening on port ${port}`));