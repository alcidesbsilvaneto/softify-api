import { app } from './app';
import {startDatabase} from './common/database/database';

async function initialize() {
  try {
    await startDatabase();
    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  } catch (err) {
    console.log(err);
  }
}

initialize();
