const transform = function transformRow(data) {
  const transformed = Object.assign({}, data);

  // Split the `agency_responsible` field into multiple values
  transformed.agency_responsible = transformed.agency_responsible.split(/\s*,\s*/);

  // Make the update columns into a list of update records
  transformed.updates = [];

  // Capture the last update.  We'll append it to the list later
  const lastUpdate = {
    date: transformed.date_last_updated,
    notes: transformed.date_last_updated_notes,
  };
  delete transformed.date_last_updated;
  delete transformed.date_last_updated_notes;

  // Grab any other update columns, e.g. date_2, date_2_notes, date_3 ...
  let i;

  for (i = 2; ; i += 1) {
    const dateProp = `date_${i}`;
    const notesProp = `date_${i}_notes`;

    // date_N doesn't exist.  Stop looking
    if (!(dateProp in data)) {
      break;
    }

    transformed.updates.push({
      date: data[dateProp],
      notes: data[notesProp],
    });

    delete transformed[dateProp];
    delete transformed[notesProp];
  }

  // Make sure the last update is last
  transformed.updates.push(lastUpdate);

  return transformed;
};

const main = function cliMain() {
  const chunks = [];

  process.stdin.resume();
  process.stdin.on('data', chunk => chunks.push(chunk));
  process.stdin.on('end', () => {
    const jsonStr = chunks.join('');
    process.stdout.write(JSON.stringify(JSON.parse(jsonStr).map(transform)));
  });
};


export default main;
