const runScript = require('runscript');
const chalk = require('chalk');

async function run() {
  // console.log(chalk.white('[INFO]: waiting eval "cnpm install" '));
  // const stdoutInstall = await runScript('npm install', { stdio: 'pipe' }, { timeout: 20000 })
  // console.log(stdoutInstall);
  
  console.log(chalk.white('[INFO]: waiting eval "npm run build:static" '));
  const stdoutStatic = await runScript('npm run build:static', { stdio: 'pipe' }, { timeout: 10000 })
  console.log(stdoutStatic);

  console.log(chalk.white('[INFO]: waiting eval "npm run start:server" '));
  const stdoutServer = await runScript('npm run start:server', { stdio: 'pipe' }, { timeout: 10000 })
  console.log(stdoutServer);
}

run();