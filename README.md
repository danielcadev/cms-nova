# 🚀 CMS Nova - Modern Headless CMS

**Modular content management system with Notion-style design**

CMS Nova is a complete and modern CMS that allows you to manage users, dynamic content, and more. With a clean Notion-style interface and advanced production-ready features.

## 🎯 **STATUS: PUBLISHED ON NPM** ✅

[![NPM Version](https://img.shields.io/npm/v/@danielcadev/cms-nova?style=flat-square&color=blue)](https://www.npmjs.com/package/@danielcadev/cms-nova)
[![NPM Downloads](https://img.shields.io/npm/dm/@danielcadev/cms-nova?style=flat-square&color=green)](https://www.npmjs.com/package/@danielcadev/cms-nova)
[![License](https://img.shields.io/npm/l/@danielcadev/cms-nova?style=flat-square&color=orange)](https://github.com/danielcadev/cms-nova/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/danielcadev/cms-nova?style=flat-square&color=yellow)](https://github.com/danielcadev/cms-nova)

## ✨ **Key Features**

- ✅ **Complete Authentication** with Better Auth
- ✅ **User Management** with roles and permissions
- ✅ **🎨 Visual Template Builder** - drag & drop without coding
- ✅ **Flexible Headless CMS** - create dynamic content types
- ✅ **Predefined Template System** (tourism plans, etc.)
- ✅ **☁️ AWS S3 File Upload** - configuration from plugins panel
- ✅ **Notion-style UI** - modern and clean
- ✅ **Administrative Dashboard** with statistics
- ✅ **Complete REST API** for integration
- ✅ **TypeScript** - fully typed
- ✅ **PostgreSQL Database** with Prisma
- ✅ **Deployment Ready** - Docker, Vercel, VPS

## 📦 **Quick Installation from NPM**

```bash
# Install CMS Nova
npm install @danielcadev/cms-nova@beta

# Install dependencies
npm install better-auth @prisma/client prisma next react react-dom
```

## 🚀 **Basic Usage**

```tsx
// app/admin/layout.tsx
import { AdminLayout } from '@danielcadev/cms-nova/src/components/admin/AdminLayout';
import '@danielcadev/cms-nova/dist/styles.css';

export default function MyAdminLayout({ children }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}

// app/admin/page.tsx
import { Dashboard } from '@danielcadev/cms-nova/src/components/admin/dashboard/DashboardPage/Dashboard';

export default function AdminPage() {
  return <Dashboard />;
}
```

## 🛠️ **Full Installation (Development)**

### Option 1: Clone Repository
```bash
git clone https://github.com/danielcadev/cms-nova.git
cd cms-nova
npm install
cp .env.example .env
# Configure .env with your data
npm run dev
```

## 🎨 **Visual Template Builder**

Users can create their own templates **without coding**:

### Drag & Drop Interface
- 📝 Drag fields from palette
- 🔄 Reorder fields easily
- 👀 Real-time preview
- ⚙️ Advanced field configuration

### Available Field Types
- **Short/Long Text** - Titles, descriptions
- **Number** - Prices, quantities, ratings
- **Yes/No** - Boolean options
- **Date** - Dates and times
- **Media** - Images and files

## 🌐 **Available on NPM**

**Package:** [`@danielcadev/cms-nova`](https://www.npmjs.com/package/@danielcadev/cms-nova)

```bash
# Install beta version
npm install @danielcadev/cms-nova@beta

# View all versions
npm view @danielcadev/cms-nova versions --json
```

## 📚 **Complete Documentation**

📖 **[Template Creation Guide](docs/CREATE-TEMPLATES.md)**
📖 **[Integration Guide](INTEGRATION.md)**
📖 **[Deployment Guide](DEPLOYMENT.md)**
📖 **[Visual Builder Demo](examples/template-builder-demo.md)**

## 🎯 Industry Use Cases

### 🏖️ Travel Agency
```tsx
const travelConfig = {
  ui: { title: 'Travel Admin', primaryColor: '#0ea5e9' },
  features: {
    users: true,
    plans: true,        // ✅ Tourism plan templates
    contentTypes: true  // Destinations, hotels, activities
  }
};
```

### 🛍️ E-commerce
```tsx
const ecommerceConfig = {
  ui: { title: 'Store Admin', primaryColor: '#10b981' },
  features: {
    users: true,
    contentTypes: true  // Products, categories, brands
  }
};
```

### 📰 Blog/Magazine
```tsx
const blogConfig = {
  ui: { title: 'Editorial Admin', primaryColor: '#8b5cf6' },
  features: {
    users: true,
    contentTypes: true  // Posts, categories, authors
  }
};
```

### 🏥 Clinic/Hospital
```tsx
const clinicConfig = {
  ui: { title: 'Clinic Admin', primaryColor: '#ef4444' },
  features: {
    users: true,
    contentTypes: true  // Doctors, services, appointments
  }
};
```

## ⚙️ **Configuration**

1. **Set up environment:**
   ```bash
   # Create .env file
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"
   ```

2. **Sync database:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 🚀 **Getting Started**

1. **First User:** Go to `/signup` to create the first administrator
2. **Admin Panel:** Access `/admin/auth/SignIn` after registration
3. **Setup:** Registration is automatically disabled after the first user

## 🎨 **Notion-Style Design**

CMS Nova uses a clean and modern design inspired by Notion, with a minimalist and functional interface.

### ✨ **Design Features**

- **🎯 Clean Interface**: Minimalist and functional design
- **📱 Responsive**: Adapted to all devices
- **🎨 Modern Colors**: Professional color palette
- **⚡ Smooth Animations**: Fluid and natural transitions
- **📐 Consistent Spacing**: Well-structured grid system

### ☁️ **AWS S3 File System**

CMS Nova includes complete integration with Amazon S3 for file upload and management:

#### **S3 Features:**
- **🔧 Panel Configuration**: No need to touch code
- **🔒 Encrypted Credentials**: Secure storage in database
- **📁 Folder Organization**: Files organized automatically
- **🖼️ Multimedia Support**: Images, documents and more
- **🌐 Public URLs**: Direct access to uploaded files
- **⚡ Automatic Validation**: File types and sizes

#### **How to Configure S3:**
1. Go to **Admin Panel → Plugins** (`/admin/dashboard/plugins`)
2. Search for **"Amazon S3 Storage"**
3. Click **"Configure"**
4. Enter your AWS credentials:
   - **Bucket Name**: Your S3 bucket name
   - **Region**: AWS region (e.g., us-east-1)
   - **Access Key ID**: Your AWS access key
   - **Secret Access Key**: Your AWS secret key
5. **Activate the plugin** and you're done!

## 🛠️ **Tech Stack**

- **Frontend:** Next.js 14, React, TypeScript
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Auth:** Better Auth
- **Styling:** Tailwind CSS
- **File Upload:** AWS S3 Integration

## 🔐 **Security**

CMS Nova includes:

- ✅ Authentication with Better Auth
- ✅ Role verification by middleware
- ✅ Data validation with Zod
- ✅ Input sanitization
- ✅ CSRF protection
- ✅ Rate limiting (configurable)

## 🤝 **Contributing**

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 **License**

MIT License - see [LICENSE](LICENSE) for more details.

## 👨‍💻 **Author**

**Daniel CA** - [@danielcadev](https://github.com/danielcadev)

---

**Thank you for using CMS Nova!** 🚀