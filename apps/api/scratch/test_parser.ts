
function getCol(row: any, aliases: string[]) {
  const keys = Object.keys(row);
  const stdAliases = aliases.map((a) => a.toLowerCase().replace(/[^a-z0-9]/g, ''));
  for (const key of keys) {
    const stdKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (stdAliases.includes(stdKey)) return row[key];
  }
  return undefined;
}

function parseDate(val: any): Date | null {
  if (!val) return null;
  if (val instanceof Date) return val;
  if (typeof val === 'number') return new Date(Math.round((val - 25569) * 86400 * 1000));
  const str = String(val).trim();
  const dmyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (dmyMatch) {
    const d = parseInt(dmyMatch[1]);
    const m = parseInt(dmyMatch[2]) - 1;
    let y = parseInt(dmyMatch[3]);
    if (y < 100) y += 2000;
    return new Date(Date.UTC(y, m, d));
  }
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

const row = {
  "ID": "2047911",
  "Batch Week Local": "15/04/2024",
  "Batch Number": "101",
  "Completed Pickups": "45"
};

const riderIdRaw = getCol(row, ['rider id', 'id', 'riderid', 'pilot id', 'emp id']);
const dateRaw = getCol(row, ['Batch Week Local', 'BATCH CHANGE DATE', 'date']);
const batchRaw = getCol(row, ['Batch Number', 'BATCH', 'batch']);
const singleRaw = getCol(row, ['Completed Pickups', 'SINGLE ORDERS', 'single orders']);

console.log('Rider ID Raw:', riderIdRaw);
console.log('Date Raw:', dateRaw);
console.log('Parsed Date:', parseDate(dateRaw)?.toISOString());
console.log('Batch Raw:', batchRaw);
console.log('Single Raw:', singleRaw);

if (!riderIdRaw || !dateRaw) {
  console.log('FAILURE: Missing primary identifiers');
} else {
  console.log('SUCCESS: Values found');
}
