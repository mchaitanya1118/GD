const XLSX = require('xlsx');
const ws = XLSX.utils.json_to_sheet([
  { 
    "Pilot ID": "R999", 
    "Pilot Name": "Mapping Test Rider", 
    "Service Date": "2024-05-15", 
    "Batch #": 3, 
    "S Quantity": 10, 
    "D Quantity": 5,
    "Company Code": "TEST-MAP"
  }
]);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Data");
XLSX.writeFile(wb, "test_mapping.xlsx");
console.log("Created test_mapping.xlsx");
