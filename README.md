# RFID School Demo (React + Firebase + RTDB)

## Chạy nhanh
1) `npm install`
2) Copy `.env.example` thành `.env` và điền thông tin Firebase.
3) `npm run dev`

## Thư mục
- `src/pages/AddUser.jsx` — thêm user
- `src/pages/UserList.jsx` — danh sách
- `src/pages/SimulateScan.jsx` — giả lập quét RFID
- `functions/` — Cloud Functions xử lý `rfid_logs`

## Rules
- `rules.dev.json` — mở full để test
- `rules.secure.json` — rule gợi ý khi triển khai
