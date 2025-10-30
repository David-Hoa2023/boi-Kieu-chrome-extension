# Bói Kiều - Chrome Extension

Một tiện ích mở rộng Chrome giúp hiển thị các câu thơ từ "Truyện Kiều" của Nguyễn Du một cách ngẫu nhiên. Bói Kiều là một hình thức xem bói dân gian của người Việt, dựa trên việc chọn ngẫu nhiên một đoạn thơ trong “Truyện Kiều” của Nguyễn Du để luận giải vận mệnh, tình duyên, công việc hoặc thi cử.

## 📁 Cấu trúc dự án

```
quote-extension/
├── manifest.json          # File cấu hình của Chrome Extension
├── popup.html             # Giao diện popup khi nhấn vào icon extension
├── popup.js               # Logic xử lý popup và hiển thị câu thơ
├── background.js          # Script chạy ngầm cho extension
├── quotes.js              # Dữ liệu các câu thơ Truyện Kiều
├── icons/                 # Icon của extension
│   ├── icon16.png         # Icon 16x16 pixels
│   ├── icon48.png         # Icon 48x48 pixels
│   └── icon128.png        # Icon 128x128 pixels
├── create_icons.py        # Script tạo icon cho extension
└── README.md              # File hướng dẫn sử dụng
```

## 🚀 Cài đặt

### Cách 1: Cài đặt từ GitHub Repository
1. Tải về source code từ repository:
   ```bash
   git clone https://github.com/David-Hoa2023/boi-Kieu-chrome-extension.git
   ```

2. Mở Chrome và truy cập vào `chrome://extensions/`

3. Bật **"Chế độ nhà phát triển"** (Developer mode) ở góc trên phải

4. Nhấn vào **"Tải tiện ích đã giải nén"** (Load unpacked)

5. Chọn thư mục `quote-extension` vừa tải về

### Cách 2: Cài đặt từ file ZIP
1. Vào [GitHub Repository](https://github.com/David-Hoa2023/boi-Kieu-chrome-extension)
2. Nhấn vào nút "Code" → "Download ZIP"
3. Giải nén file vừa tải về
4. Làm theo các bước 2-5 ở Cách 1

## 📖 Cách sử dụng

1. **Mở Extension**: Nhấn vào icon Bội Kiều trên thanh công cụ Chrome

2. **Xem câu thơ ngẫu nhiên**: Mỗi khi mở popup, một câu thơ ngẫu nhiên từ Truyện Kiều sẽ được hiển thị

3. **Lấy câu thơ mới**: Nhấn nút "Câu thơ khác" để xem câu thơ tiếp theo

4. **Sao chép câu thơ**: Nhấn nút "Sao chép" để copy câu thơ vào clipboard

## 🎨 Tính năng

- ✨ Hiển thị câu thơ ngẫu nhiên từ Truyện Kiều
- 🎨 Giao diện đẹp, tối giản với font chữ phù hợp
- 📋 Tính năng sao chép câu thơ nhanh chóng
- 🔄 Nút làm mới để lấy câu thơ mới
- 📱 Responsive design, phù hợp mọi kích thước popup

## 🛠️ Kỹ thuật sử dụng

- **HTML5**: Cấu trúc giao diện
- **CSS3**: Thiết kế với Tailwind CSS
- **JavaScript (ES6+)**: Logic xử lý và tương tác
- **Chrome Extension API**: Tích hợp với trình duyệt Chrome

## 📝 Ghi chú

- Extension hoạt động offline sau khi đã cài đặt
- Dữ liệu thơ được lưu trữ local trong file `quotes.js`
- Không thu thập bất kỳ dữ liệu người dùng nào

## 🤝 Đóng góp

Nếu bạn muốn đóng góp thêm câu thơ hoặc cải thiện extension:

1. Fork repository này
2. Tạo branch mới: `git checkout -b feature/ten-tinh-nang`
3. Commit thay đổi: `git commit -m 'Thêm tính năng mới'`
4. Push lên branch: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request

## 📄 Giấy phép

Dự án này được phát hành dưới giấy phép MIT.

## 👨‍💻 Tác giả

- **David Hoa** - *Initial work* - [David-Hoa2023](https://github.com/David-Hoa2023)

---

⭐ Nếu bạn thích extension này, hãy cho tôi một star trên GitHub!
