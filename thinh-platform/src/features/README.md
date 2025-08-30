# Feature-Based Architecture

Dự án này được tổ chức theo kiến trúc feature-based, mỗi feature được tách biệt thành các thư mục riêng với cấu trúc chuẩn.

## Cấu trúc thư mục

Mỗi feature có cấu trúc như sau:

```
features/
├── feature-name/
│   ├── index.tsx          # Component chính của feature
│   ├── styles.ts          # Styles và CSS classes
│   ├── useFeature.ts      # Custom hooks và logic
│   └── components/        # Các components con
│       ├── Component1.tsx
│       ├── Component2.tsx
│       └── ...
```

## Các features hiện có

### 1. Authentication (`/authentication`)
- **index.tsx**: Component chính cho authentication (AuthForm)
- **styles.ts**: Styles cho forms, buttons, inputs
- **useAuthentication.ts**: Hook quản lý state đăng nhập/đăng ký
- **components/**: 
  - **AuthForm.tsx**: Component chính quản lý chuyển đổi giữa SignIn/SignUp
  - **SignInForm.tsx**: Form đăng nhập với thiết kế Frello
  - **SignUpForm.tsx**: Form đăng ký với validation
  - **SignOutButton.tsx**: Nút đăng xuất

#### Tính năng Authentication:
- **Sign In**: Email, password, remember me, forgot password
- **Sign Up**: Full name, email, password, confirm password, terms agreement
- **Social Login**: Google sign-in (có thể mở rộng)
- **Password Visibility**: Toggle ẩn/hiện mật khẩu
- **Form Validation**: Kiểm tra password match, required fields
- **Responsive Design**: Layout 2 cột với promotional area

### 2. Dashboard (`/dashboard`)
- **index.tsx**: Component chính cho dashboard
- **styles.ts**: CSS classes cho dashboard layout
- **useDashboard.ts**: Hook quản lý data và actions
- **components/**: Content, ResourceCard

### 3. Layout (`/layout`)
- **index.tsx**: Layout chung của ứng dụng
- **styles.ts**: CSS classes cho header và layout
- **components/**: Header

## Quy tắc đặt tên

1. **Files**: Sử dụng PascalCase cho components, camelCase cho hooks
2. **Folders**: Sử dụng kebab-case cho tên feature
3. **Exports**: Export named components và default cho feature chính
4. **Imports**: Import từ index.ts của mỗi feature

## Ví dụ sử dụng

```tsx
// Import từ feature
import { AuthForm, SignInForm, SignUpForm } from "./features/authentication";
import { Content } from "./features/dashboard";
import Layout from "./features/layout";

// Hoặc import từ index tổng thể
import { AuthForm, Content, Layout } from "./features";
```

## Lợi ích

- **Tách biệt concerns**: Mỗi feature có logic riêng biệt
- **Dễ maintain**: Code được tổ chức rõ ràng, dễ tìm và sửa
- **Reusable**: Components có thể được tái sử dụng giữa các features
- **Scalable**: Dễ dàng thêm features mới
- **Testing**: Dễ dàng test từng feature riêng biệt
- **User Experience**: Giao diện đăng nhập/đăng ký chuyên nghiệp với thiết kế Frello
