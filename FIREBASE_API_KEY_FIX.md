# Hướng dẫn sửa lỗi Firebase API Key

## Lỗi: `auth/api-key-not-valid`

Lỗi này xảy ra khi API key của Firebase không hợp lệ hoặc bị hạn chế.

## Cách sửa:

### Bước 1: Lấy lại API key từ Firebase Console

1. Vào [Firebase Console](https://console.firebase.google.com/)
2. Chọn project của bạn (`datban-2cc8a`)
3. Vào **⚙️ Settings** (Cài đặt) → **Project settings**
4. Scroll xuống phần **Your apps**
5. Chọn web app của bạn (hoặc tạo mới nếu chưa có)
6. Copy **API Key** từ phần **Firebase SDK snippet**

### Bước 2: Cập nhật API key trong code

Mở file `src/config/firebase.ts` và cập nhật `apiKey`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_NEW_API_KEY_HERE", // ← Cập nhật API key mới ở đây
  authDomain: "datban-2cc8a.firebaseapp.com",
  projectId: "datban-2cc8a",
  storageBucket: "datban-2cc8a.firebasestorage.app",
  messagingSenderId: "329428413476",
  appId: "1:329428413476:web:4bc96a4306e8be6e62fcb1",
  measurementId: "G-NMCZSEKLNJ",
};
```

### Bước 3: Kiểm tra API Key Restrictions (nếu có)

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project Firebase của bạn
3. Vào **APIs & Services** → **Credentials**
4. Tìm API key của bạn (có thể có tên như "Browser key" hoặc "Web API key")
5. Click vào API key để xem chi tiết
6. Kiểm tra phần **API restrictions** và **Application restrictions**:
   - **Application restrictions**: Nếu có, đảm bảo domain của bạn được thêm vào
   - **API restrictions**: Đảm bảo các API cần thiết được enable:
     - Identity Toolkit API
     - Firebase Authentication API

### Bước 4: Enable các API cần thiết

1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project Firebase của bạn
3. Vào **APIs & Services** → **Library**
4. Tìm và enable các API sau:
   - **Identity Toolkit API**
   - **Firebase Authentication API**

### Bước 5: Kiểm tra Authentication trong Firebase Console

1. Vào Firebase Console → **Authentication**
2. Vào tab **Sign-in method**
3. Đảm bảo **Phone** provider đã được enable
4. Nếu chưa, click vào **Phone** và enable nó

## Lưu ý:

- API key trong Firebase là **public** và an toàn khi expose trong frontend code
- Tuy nhiên, bạn nên set **Application restrictions** để chỉ cho phép domain của bạn sử dụng
- Nếu đang development local, thêm `localhost` vào danh sách allowed domains

## Kiểm tra lại:

Sau khi cập nhật, restart dev server và thử lại:

```bash
npm run dev
```
