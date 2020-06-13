import path from 'path';

import { loadPackageDefinition, credentials } from 'grpc';
import { loadSync } from '@grpc/proto-loader';

const proto = loadSync(path.resolve(__dirname, '../../proto/user.proto'), {
  keepCase: true,
  enums: String,
  oneofs: true,
});

const usersServiceClient: any = loadPackageDefinition(proto).user;
const userService = usersServiceClient.UsersService;
const userClient = new userService('0.0.0.0:50051', credentials.createInsecure());

export default {
  UserService: {
    createUser: (data: any) => new Promise((resolve, reject) => {
      // tslint:disable-next-line: ter-prefer-arrow-callback
      userClient.createUser({ ...data }, function (err: any, response: any) {
        // tslint:disable-next-line: whitespace
        if (err) {
          return reject(err);
        }
        return resolve(response);
      });
    }),
  },

};


