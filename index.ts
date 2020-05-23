import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const db = {
  model: {},
};

mongoose.connect(process.env.MONGO_URL || '',
                 { useNewUrlParser: true, useUnifiedTopology: true },
);

const modelsPath: string = path.join(__dirname, '/src/Models');

fs.readdirSync(modelsPath)
  .forEach((file) => {
    const { default: model } = require(path.join(modelsPath, file));
    db.model = model(mongoose);
  });

export default db;
