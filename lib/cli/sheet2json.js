import XLSX from 'xlsx';

const main = function cliMain() {
  const chunks = [];

  process.stdin
  .on('data', data => chunks.push(data))
  .on('end', () => {
    const buffer = Buffer.concat(chunks);
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet);
    process.stdout.write(JSON.stringify(sheetData));
  });
};

export default main;
