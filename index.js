
runScript('npm install', { stdio: 'pipe' }, { timeout: 10000 })
  .then(stdio => {
    console.log(stdio);
  })
  .catch(err => {
    console.error(err);
  });