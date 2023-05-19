import { Context } from 'mali';
import {
  CreateUserReply,
  ErrorMessage,
  RetrieveUserReply,
  UserRecord,
} from '../typedefs/members_pb';
import chalk from 'chalk';

const print = console.log;

const users: any = {
  2002: {
    id: 2002,
    firstName: 'Gabriel',
    lastName: 'Fernandes',
    username: 'gabrielfernandes-dev',
    phoneNumber: '<missing>',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export async function createUser(ctx: Context<CreateUserReply.AsObject>) {
  const user_id = Math.trunc(Math.random() * 100);

  print(chalk.cyan('[info]'), 'request to insert user');

  Object.assign(users, {
    [user_id]: { ...ctx.req, id: user_id },
  });

  print(chalk.green('[success]'), 'user inserted successfully!');

  ctx.res = { success: true, userId: user_id } as CreateUserReply.AsObject;
}

export async function retrieveUser(ctx: Context<RetrieveUserReply.AsObject>) {
  let reply = {};
  const userFound = users[ctx.req.id];

  print(chalk.cyan('[info]'), 'request to find user');

  if (userFound) {
    reply = { success: true, user: userFound as UserRecord.AsObject };
    print(chalk.green('[success]'), 'user found!', userFound);
  } else {
    reply = {
      success: false,
      error: { message: 'not found', code: 404 } as ErrorMessage.AsObject,
    };

    print(chalk.red('[error]'), 'user was not found!');
  }

  ctx.res = reply;
}
