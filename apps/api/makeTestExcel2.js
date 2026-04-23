const XLSX = require('xlsx');
const ws = XLSX.utils.json_to_sheet([
  { "Rider ID": "R005", "Date": "2024-05-01", "Name": "Rider5", "Single": "5", "Batch": 1 },
  { "Rider ID": "R005", "Date": "2024-05-02", "Name": "Rider5", "Single": "10", "Batch": 1 }
]);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "test2.xlsx");
