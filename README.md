# Brainly [demo-video](https://youtu.be/T2GQm_iaP88)

[![GitHub stars](https://img.shields.io/github/stars/0x4nud33p/brainly)](https://github.com/0x4nud33p/brainly/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/0x4nud33p/brainly)](https://github.com/0x4nud33p/brainly/issues)

**Brainly is your personal link management system - save, organize, and revisit all your important links in one place.**

## 🧠 About Brainly

Brainly is a modern, intuitive bookmarking application designed to help you organize your digital life. Stop losing important resources across multiple browsers and devices - Brainly provides a centralized hub for all your important links, organized the way you want.

### Key Features

- 🔗 **Save Links**: Quickly save important URLs with custom titles and descriptions
- 📁 **Create Folders**: Organize links into custom folders for easy navigation
- 🏷️ **Tag System**: Add tags to your links for powerful filtering and search
- 👥 **User Authentication**: Secure access to your personal link collection
- 📱 **Responsive Design**: Perfect experience on any device
- 🌙 **Clean UI**: Intuitive interface that puts your content first

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/0x4nud33p/brainly.git
   cd brainly
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up your environment variables by creating a `.env` file:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/brainly"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. Run the database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Docker Setup

For Docker users, we provide a Docker Compose configuration:

```bash
docker-compose up -d
```

This will start both the Brainly application and a PostgreSQL database.

## 🏗️ Tech Stack

Brainly is built with modern technologies for the best developer and user experience:

- **Next.js**: React framework with server-side rendering
- **TypeScript**: Type-safe code
- **Prisma**: Modern database ORM
- **PostgreSQL**: Reliable relational database
- **NextAuth.js**: Authentication system
- **Tailwind CSS**: Utility-first CSS framework
- **Docker**: Containerization for easy deployment

## 📝 API Documentation

Brainly provides a RESTful API for managing links and folders:

### Links API

- `GET /api/links` - Get all links
- `POST /api/links` - Create a new link
- `GET /api/links/:id` - Get a specific link
- `PUT /api/links/:id` - Update a link
- `DELETE /api/links/:id` - Delete a link

### Folders API

- `GET /api/folders` - Get all folders
- `POST /api/folders` - Create a new folder
- `GET /api/folders/:id` - Get a specific folder
- `PUT /api/folders/:id` - Update a folder
- `DELETE /api/folders/:id` - Delete a folder

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🔗 Links

- [GitHub Repository](https://github.com/0x4nud33p/brainly)
- [Report Bug](https://github.com/0x4nud33p/brainly/issues)
- [Request Feature](https://github.com/0x4nud33p/brainly/issues)

## 👨‍💻 Author

- **0x4nud33p** - [GitHub Profile](https://github.com/0x4nud33p)

---

<p align="center">
  <strong>Brainly</strong> - The smart way to bookmark
</p>