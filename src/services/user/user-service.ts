import { loadPackageDefinition, ServerCredentials, Server } from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import mongoose from 'mongoose';

import UserModel from '../../Models/User';
import { User, Login } from './types';

mongoose.connect('MONGO_URL=mongodb://localhost:27017/who-are-you',
                 { useNewUrlParser: true, useUnifiedTopology: true },
);

const packageDefinition: any = loadSync(
  path.resolve(__dirname, '../../proto/user.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

const userProto: any = loadPackageDefinition(packageDefinition).user;

async function createUser(call: { request: User }, callback: CallableFunction) {
  const { request } = call;

  try {
    const user = new UserModel({
      ...request,
    });

    await user.save();
    return callback(null, { user });
  } catch (e) {
    callback(e);
  }
}

async function getUserByUsername(call: { request: { username: string } }, callback: CallableFunction) {
  try {
    const { username } = call.request;

    // const regex = `.*${username}.*`;

    const user = await UserModel
      .find({ username })
      .select('name lastname username bio -_id');
    // .limit(10);

    return callback(null, { user });

  } catch (e) {
    callback(e);
  }
}

async function login(call: { request: Login }, callback: CallableFunction) {
  try {
    const { username, password } = call.request;

    const auth: any = await UserModel
    .findOne({ username })
    .select('name username password lastname -_id');

    if (auth && auth.password === password) {
      return callback(null, { auth });
    }

    return callback('Invalid Credentials');

  } catch (e) {
    callback(e);
  }

}

function main() {
  const server: Server = new Server();

  server.addService(userProto.UsersService.service, {
    createUser,
    getUserByUsername,
    login,
  });

  server.bind('0.0.0.0:50051', ServerCredentials.createInsecure());
  console.log('gRPC running on http://localhost:50051');
  server.start();
}

main();

