import path from 'path';
import Mali from 'mali';
import chalk from 'chalk';
import { config } from 'dotenv';

import { createUser, retrieveUser } from './handlers/members';

const PROTO_PATH = path.resolve(__dirname, '../proto/members.proto');

function main() {
  config();
  const app = new Mali(PROTO_PATH);
  const port = process.env.SERVER_PORT;
  app.use({ createUser });
  app.use({ retrieveUser });
  app.start(`0.0.0.0:${port}`);
  console.log(
    `🚀 ${chalk.bold.blueBright(`gRPC`)} server up and running at ${chalk.green(
      `0.0.0.0:${port}`
    )}. ${chalk.yellow('Enjoy')}!`
  );
}

main();
