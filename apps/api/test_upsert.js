const XLSX = require('xlsx');
const ws = XLSX.utils.json_to_sheet([
  { 
    "Rider ID": "R777", 
    "Rider Name": "Updated Name", 
    "Date": "2024-05-15", 
    "Batch": 1, 
    "Single Orders": 10, 
    "Double Orders": 5,
    "Company Code": "NEW-CORP"
  }
]);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Data");
XLSX.writeFile(wb, "test_upsert.xlsx");
