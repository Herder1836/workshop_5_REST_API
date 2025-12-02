import { createConnection, getConnection, getConnectionManager } from 'typeorm';

import config from './orm/config/ormconfig';

export const dbCreateConnection = async () => {
  try {
    const connection = await createConnection(config);
    console.log('🟢 DB connected:', connection.options.database);
    return connection;
  } catch (err: any) {
    if (err.name === 'AlreadyHasActiveConnectionError') {
      console.log('🔵 Using existing DB connection');
      return getConnectionManager().get(config.name);
    }

    console.log('🔴 DB error:', err);
    throw err;
  }
};
