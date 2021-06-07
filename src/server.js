import dotenv from 'dotenv';
import app from './app';

// load the env configs
dotenv.config({ path: './.development.env' });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}`));