import { loadPackageDefinition, ServerCredentials, Server } from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import UserModel from '../../Models/User';
import mongoose from 'mongoose';

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

async function createUser(call: any, callback: CallableFunction) {
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

function listUsers(call: any, callback: CallableFunction) {
  console.log(call.request.name);
  callback(null, { message: `Hello ${call.request.name}` });
}

function main() {
  const server: Server = new Server();
  server.addService(userProto.UsersService.service, {
    createUser,
    listUsers,
  });
  server.bind('0.0.0.0:50051', ServerCredentials.createInsecure());
  console.log('gRPC running on http://localhost:50051');
  server.start();
}

main();

