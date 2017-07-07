const serializeObject = function serializeArchieMLObject(o, prop, inArray) {
  const bits = [];

  if (prop) {
    bits.push(`{${prop}}\n`);
  }

  Object.keys(o).forEach((k) => {
    // eslint-disable-next-line no-use-before-define
    const [, s] = serialize(o[k], k, inArray);
    bits.push(s);
  });

  if (prop) {
    bits.push('{}\n');
  }

  return bits.join('\n');
};

const serializeArray = function serializeArchieMLArray(a, prop, inArray) {
  let bits = [];
  let strArray = true;

  a.forEach((d) => {
    // eslint-disable-next-line no-use-before-define
    const [t, s] = serialize(d, null, true);

    if (t !== 'value') {
      strArray = false;
    }

    bits.push(s);
  });

  if (strArray) {
    bits = bits.map(d => `* ${d}`);
  }

  const prefix = inArray ? '.' : '';

  bits.unshift(`[${prefix}${prop}]\n`);
  bits.push('[]\n');

  return bits.join('\n');
};

const serializeValue = function serializeArchieMLValue(d, prop) {
  if (prop) {
    return `${prop}: ${d}\n`;
  }

  return `${d}\n`;
};

const serialize = function serialize(d, prop, inArray) {
  if (Array.isArray(d)) {
    return ['array', serializeArray(d, prop, inArray)];
  }

  if (typeof d === 'object' && d !== null) {
    return ['object', serializeObject(d, prop, inArray)];
  }

  return ['value', serializeValue(d, prop, inArray)];
};

const main = function cliMain(argv) {
  const prop = argv.prop;

  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const jsonStr = chunks.join();
    const data = JSON.parse(jsonStr);
    const [, s] = serialize(data, prop);
    process.stdout.write(s);
  });
};

export default main;
