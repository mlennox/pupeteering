const { spawn } = require('child_process');
let child = null;

child = spawn('npm', ['start'], { detached: true, stdio: 'ignore' });

child.on('exit', code => {
  console.log(`Exit code is: ${code}`);
});

child.on('disconnect', code => {
  console.log(`Disconnected: ${code}`);
});

child.on('error', code => {
  console.log(`Error: ${code}`);
});

child.on('close', code => {
  console.log(`Closed: ${code}`);
});

child.on('message', code => {
  console.log(`Message: ${code}`);
});
