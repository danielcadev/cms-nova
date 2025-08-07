<div align="center">

# 🚀 Create CMS Nova

**The fastest way to create a modern headless CMS**

[![npm version](https://badge.fury.io/js/create-cms-nova.svg)](https://badge.fury.io/js/create-cms-nova)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org/)

*Build powerful content management systems with Next.js, Prisma, and Better Auth*

[Quick Start](#-quick-start) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 🚀 Quick Start

Get your CMS up and running in under 2 minutes:

```bash
npx create-cms-nova my-cms
cd my-cms
```

### Setup & Launch

```bash
# 1. Configure your database
cp .env.example .env
# Edit DATABASE_URL in .env

# 2. Initialize database
npx prisma db push
npx prisma generate

# 3. Start development server
npm run dev
```

### First Steps

1. 🌐 Visit **http://localhost:3000** → Redirects to admin setup
2. 👤 Go to **/admin/signup** → Create your first admin account
3. 🎛️ Access **/admin** → Full-featured dashboard
4. 🎉 **You're ready to build!**

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 **Core CMS**
- ✅ **Headless Architecture** with REST APIs
- ✅ **Visual Content Builder** drag & drop interface
- ✅ **Dynamic Content Types** create any structure
- ✅ **Rich Media Management** images, files, galleries
- ✅ **SEO Optimization** built-in meta management

</td>
<td width="50%">

### 🔐 **Admin & Security**
- ✅ **Robust Authentication** with Better Auth
- ✅ **Role-based Permissions** granular access control
- ✅ **User Management** complete admin interface
- ✅ **Secure APIs** authentication & authorization
- ✅ **Audit Logging** track all changes

</td>
</tr>
<tr>
<td width="50%">

### 🎨 **Design & UX**
- ✅ **Notion-style Interface** clean & intuitive
- ✅ **Dark/Light Mode** automatic theme switching
- ✅ **Fully Responsive** mobile-first design
- ✅ **Custom Components** no external UI dependencies
- ✅ **Accessibility** WCAG compliant

</td>
<td width="50%">

### 🚀 **Developer Experience**
- ✅ **TypeScript** full type safety
- ✅ **Hot Reload** instant development feedback
- ✅ **Database Agnostic** PostgreSQL, MySQL, SQLite
- ✅ **Easy Deployment** Vercel, Railway, Docker
- ✅ **Extensible** plugin architecture

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 15+ |
| **Runtime** | React | 19+ |
| **Language** | TypeScript | 5+ |
| **Database** | Prisma ORM | Latest |
| **Auth** | Better Auth | Latest |
| **Styling** | Tailwind CSS | 3+ |
| **Deployment** | Vercel/Railway | - |

</div>

---

## 📁 Project Structure

```
my-cms/
├── 📱 src/app/                 # Next.js App Router
│   ├── 🔐 admin/              # Admin dashboard
│   ├── 🌐 api/                # REST API routes
│   └── 📄 (pages)/            # Public pages
├── 🧩 src/components/          # Reusable components
│   ├── 🎛️ admin/              # Admin UI components
│   ├── 📝 cms/                # CMS core components
│   └── 🎨 ui/                 # Base UI components
├── 🗄️ prisma/                 # Database schema & migrations
├── 🔧 src/lib/                # Utilities & configurations
└── 📊 src/types/              # TypeScript definitions
```

---

## 🎯 Use Cases

<div align="center">

| **Blog/News** | **E-commerce** | **Portfolio** | **Documentation** |
|:-------------:|:---------------:|:-------------:|:-----------------:|
| Articles, categories, tags | Products, inventory | Projects, galleries | Guides, tutorials |
| Author management | Order processing | Client testimonials | Version control |
| SEO optimization | Payment integration | Contact forms | Search functionality |

</div>

---

## 📚 Documentation

- 📖 **[Full Documentation](https://github.com/danielcadev/cms-nova#readme)**
- 🎥 **[Video Tutorials](https://github.com/danielcadev/cms-nova/wiki)**
- 💡 **[Examples & Templates](https://github.com/danielcadev/cms-nova/tree/main/examples)**
- 🔧 **[API Reference](https://github.com/danielcadev/cms-nova/wiki/api)**

---

## 🤝 Community & Support

<div align="center">

[![GitHub Issues](https://img.shields.io/github/issues/danielcadev/cms-nova)](https://github.com/danielcadev/cms-nova/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/danielcadev/cms-nova)](https://github.com/danielcadev/cms-nova/discussions)
[![GitHub Stars](https://img.shields.io/github/stars/danielcadev/cms-nova)](https://github.com/danielcadev/cms-nova/stargazers)

**[🐛 Report Bug](https://github.com/danielcadev/cms-nova/issues)** • **[💡 Request Feature](https://github.com/danielcadev/cms-nova/discussions)** • **[💬 Join Discussion](https://github.com/danielcadev/cms-nova/discussions)**

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Daniel CA](https://github.com/danielcadev)**

*Star ⭐ this repo if you find it helpful!*

</div>
