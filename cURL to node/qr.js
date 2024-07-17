const fs = require('fs');
const qr = require('qrcode');

// ข้อมูลที่ต้องการใช้สร้าง QR Code
const qrData = "[your qr raw data]";

// สร้าง QR Code
qr.toFile('qr_code.png', qrData, function (err) {
    if (err) throw err;
    console.log('QR Code ถูกสร้างและบันทึกเป็นไฟล์ qr_code.png สำเร็จแล้ว');
});
