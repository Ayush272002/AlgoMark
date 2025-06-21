# AlgoMark - LeetCode Company Tracker

A comprehensive web application for tracking your progress on company-specific LeetCode problems. Practice problems asked by top tech companies and monitor your preparation for technical interviews.

![AlgoMark Landing Page](public/AlgoMark-Landing-Page.png)

## 🚀 Features

- **Company-Specific Problems**: Access curated problem sets from 100+ top tech companies
- **Progress Tracking**: Mark problems as TODO, DONE, or REDO with visual progress indicators
- **User Authentication**: Secure sign-up and sign-in with password validation
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Instant progress synchronization with toast notifications
- **Smart Analytics**: Track completion rates and identify areas for improvement
- **Problem Management**: Direct links to LeetCode problems with difficulty and acceptance rate info

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: NextAuth.js with credentials provider
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod for form and API validation
- **Notifications**: Sonner for toast messages
- **Icons**: Lucide React
- **Password Hashing**: bcryptjs

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.0 or later
- pnpm package manager
- PostgreSQL database

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ayush272002/AlgoMark
   cd AlgoMark
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Configure your environment variables in `.env`**

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/leetcode_tracker"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

5. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push the schema to your database
   npx prisma db push

   # Seed the database with sample data
   npx prisma db seed
   ```

6. **Run the development server**

   ```bash
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                   # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── company/           # Company-specific pages
│   ├── problems/          # Problems listing page
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   ├── AuthProvider.tsx   # Authentication context
│   └── Navbar.tsx         # Navigation component
├── lib/                   # Utility functions
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client
├── prisma/                # Database schema and migrations
├── interface/             # Interfaces
├── types/                 # TypeScript type definitions
├── zodTypes/              # Zod validation schemas
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Add appropriate error handling
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [LeetCode](https://leetcode.com) for providing the problem platform
- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components
- [Next.js](https://nextjs.org) team for the amazing framework
- [Prisma](https://prisma.io) for the excellent ORM

## 📊 Data Source

This application uses LeetCode problem data from the excellent repository:
**[LeetCode-Questions-CompanyWise](https://github.com/krishnadey30/LeetCode-Questions-CompanyWise)** by [@krishnadey30](https://github.com/krishnadey30)

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
