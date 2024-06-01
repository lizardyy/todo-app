# To Do list App
Simple todo list app

## Index

- [About](#about)
- [Development Environtment](#development-environment)
  - [Pre-Requisites](#pre-requisites)
  - [Development](#development)
  - [File Structure](#file-structure)
  - [Build](#build)  
- [Deployment](#deployment)  


## Development Environment

### Pre-Requisites
- Node.js
- PostgreSQL

### Technology Usage
- Next.js (web development framework)
- Prisma (ORM)
- PostgreSQL (Database)
- TailwindCSS (styling)

### Development 

- install all dependencies using command
```shell
npm install
```
- Configure your database by creating `.env` file in the root directory containing
```
POSTGRES_URL = [your_url_database]
```
- push the database schema using command
```shell
npx prisma generate
npx prisma db push
```
### File Structure

```
.
├── prisma
│   └── scheme.prisma
├── public
├── src
│   ├── app
│   │   ├── api
│   │   │   └── todo
│   │   │       ├── [id]
│   │   │       └── route.ts
│   │   └── todo
│   │       └── *.tsx
│   └── lib
│       └── prisma.ts
├── .env.example
├── package.json
└── README.md
```

### Build
run the development server
```
npm run dev
```
or build
```
npm run build
npm run start
```
open `http://localhost:[port]/todo` in browser

## Deployment
Deployment using vercell in this link 
- https://todo-app-opal-beta-63.vercel.app/todo or
- https://todo-gm8ab62gd-mahesa-lizardys-projects.vercel.app/todo
