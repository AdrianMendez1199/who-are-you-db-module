import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export interface Schema {
  new (args: object): any;
}


const db: { [key: string]: Schema; } = {};

mongoose.connect(process.env.MONGO_URL || '',
                 { useNewUrlParser: true, useUnifiedTopology: true },
);

const modelsPath: string = path.join(__dirname, '/src/Models');

fs.readdirSync(modelsPath)
  .forEach((file) => {
    const { default: model } = require(path.join(modelsPath, file));
    const baseFile: string = file.replace('.ts', '');
    db[baseFile] = model(mongoose);
  });

export default db;
