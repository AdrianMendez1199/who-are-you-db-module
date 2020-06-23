import path from 'path';
import { loadPackageDefinition, credentials } from 'grpc';
import { loadSync } from '@grpc/proto-loader';

import { User } from './types';

const proto = loadSync(path.resolve(__dirname, '../../proto/user.proto'), {
  keepCase: true,
  enums: String,
  oneofs: true,
});

const usersServiceClient: any = loadPackageDefinition(proto).user;
const userService = usersServiceClient.UsersService;
const userClient = new userService('0.0.0.0:50051', credentials.createInsecure());

const createUser = (data: User) => new Promise((resolve, reject) => {
  // tslint:disable-next-line: ter-prefer-arrow-callback
  userClient.createUser({ ...data }, function (err: any, response: any) {
    // tslint:disable-next-line: whitespace
    if (err) {
      return reject(err);
    }
    return resolve(response);
  });
});

const getUserByUsername = (data: { username: string }) => new Promise((resolve, reject) => {
  const { username } = data;
  // tslint:disable-next-line: ter-prefer-arrow-callback
  userClient.getUserByUsername({ username }, function (err: any, response: any) {
    // tslint:disable-next-line: whitespace
    if (err) {
      return reject(err);
    }
    return resolve(response.user);
  });
});


export default {
  createUser,
  getUserByUsername,
};
