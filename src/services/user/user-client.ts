import path from 'path';
import { loadPackageDefinition, credentials } from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import { promisify } from 'util';

const proto = loadSync(path.resolve(__dirname, '../../proto/user.proto'), {
  keepCase: true,
  enums: String,
  oneofs: true,
});

const usersServiceClient: any = loadPackageDefinition(proto).user;
const userService = usersServiceClient.UsersService;
const userClient = new userService('0.0.0.0:50051', credentials.createInsecure());

export default {
  createUser: promisify(userClient.getUserByUsername).bind(userClient),
  getUserByUsername: promisify(userClient.getUserByUsername).bind(userClient),
  login: promisify(userClient.getUserByUsername).bind(userClient),
};
