const express = require("express");
const ExcelJS = require("exceljs");
const router = express.Router();

router.get("/downloadExcel", async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Dữ liệu cần xuất ra Excel
  const data = [
    { name: "John Doe", age: 30, email: "john@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
  ];

  // Định nghĩa cột
  worksheet.columns = [
    { header: "Tên", key: "name", width: 30 },
    { header: "Tuổi", key: "age", width: 10 },
    { header: "Email", key: "email", width: 30 },
  ];

  // Thêm dữ liệu vào worksheet
  data.forEach((item) => {
    worksheet.addRow(item);
  });

  // Thiết lập header cho response
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", 'attachment; filename="data.xlsx"');

  // Xuất file Excel
  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;
