import archieml from 'archieml';

const main = function cliMain() {
  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const archiemlStr = chunks.join('');
    const data = archieml.load(archiemlStr);
    process.stdout.write(JSON.stringify(data));
  });
};

export default main;
