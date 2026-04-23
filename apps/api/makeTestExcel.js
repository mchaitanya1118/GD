const XLSX = require('xlsx');
const ws = XLSX.utils.json_to_sheet([
  { "Rider ID": "R001", "Date": "2024-05-01", "Single Orders": 10, "Double Orders": 2, "Batch": 1 }
]);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "test.xlsx");
