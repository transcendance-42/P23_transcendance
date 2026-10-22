# Ft_Transendance

*This project has been created as part of the 42 curriculum by dchellen, jubelda, pchatagn, masase and csarfati.*

## Team

| Login | Role | Responsibilities |
|-------|------|-----------------|
| masase | Product Owner | Defined features and priorities, validated completed work, communicated with evaluators and peers |
| dchellen | Project Manager | Facilitated team coordination, organized meetings and planning sessions, tracked progress and managed blockers |
| pchatagn | Technical Lead | Evaluated and selected the tech stack, defined the architecture, ensured code quality and reviewed critical changes |
| jubelda | Developer | Implemented features, participated in code reviews, tested and documented work |
| csarfati | Developer | Implemented features, participated in code reviews, tested and documented work |

## Project Management

The team used the following tools and practices to organize the work:

- **GitHub Issues** to track tasks, bugs and feature requests. Each issue was assigned to a team member with a clear description and acceptance criteria.
- **Pull Requests** were reviewed and approved by at least one other team member before merging.
- **Miro** for planning sessions, brainstorming and mapping out features at the start of the project.
- **Discord** and **WhatsApp** as our main communication channels for day-to-day coordination.
- The team worked **side by side as much as possible**, meeting regularly in person to sync, pair program and unblock each other.

## Description

Tindog is our ft_transcendence project, the final mandatory project at 42 School.

Inspired by Tinder, Tindog is a swipe-based matching app, but for dog owners. Users create a profile for their dog and browse other dogs nearby. A simple swipe right means interest, swipe left means pass. When two dogs mutually like each other, it's a match and their owners can start chatting.

Tindog is designed as a social network for dog owners and supports multiple simultaneous users. The goal is to make it easier for dog owners to connect, whether to arrange playdates, share advice, or simply bond over their love of dogs.

## Features List

| Feature | Description | Team Member(s) |
|---------|-------------|----------------|
| Registration | Create an account with email and password | ... |
| Login / Logout | Authenticate securely with JWT and refresh tokens | ... |
| Google OAuth | Sign in with Google | ... |
| Profile Setup | Fill in personal information (name, city, date of birth) | ... |
| Avatar Upload | Upload a profile photo | ... |
| Dog Profile | Create a dog profile with name, breed, age and bio | ... |
| Dog Photo Upload | Upload up to 5 photos per dog | ... |
| Swipe | Like or pass on nearby dogs | ... |
| Matching | When two dogs mutually like each other, a match is created | ... |
| Chat | Real-time messaging between matched users | ... |
| Geolocation | Discover dogs based on proximity | ... |
| Online Status | See when other users were last active | ... |
| Unmatch | Remove a match and its chat | ... |
| Deactivate Account | Users can deactivate their own account | ... |
| Admin Panel | Admins can view, deactivate, reactivate and delete users | ... |
| Internationalization | App available in English, French and German | ... |
| PWA | Installable as a mobile app | ... |

## Technical Choices

The project follows the general requirements defined in the subject:

- **Version Control**: Git is used throughout the project with clear and meaningful commit messages. All team members contributed commits reflecting proper work distribution.
- **Containerization**: The entire stack (frontend, backend, database, reverse proxy) runs via Docker
- **Browser compatibility**: The application is compatible with the latest stable versions of Google Chrome and Mozilla Firefox.

### Frontend

We use **React** for building the user interface. React is appropriate for Tindog because:
- It is widely adopted in the industry and well-documented
- It makes it easy to build reusable UI components (cards, modals, buttons) that are reused across the app
- It handles dynamic state efficiently which is essential for a real-time chat and swipe interface

We use **Vite** as our build tool and dev server. Compared to Create React App, Vite starts and rebuilds significantly faster, which improved our development experience. It is now the recommended standard for React projects.

We chose **JavaScript** over TypeScript to keep the learning curve manageable for the team and focus on delivering features faster.

We use **Tailwind CSS** for styling. It is a utility-first CSS framework that allows us to style components directly in JSX without writing separate CSS files. It keeps the codebase consistent and speeds up UI development.

### Backend

We use **Node.js** as our runtime environment, which allows us to run JavaScript server-side — keeping the language consistent across the full stack.

On top of it, we use **Fastify** as our web framework to handle HTTP requests and expose our REST API. We chose Fastify over Express because it is significantly faster, includes built-in request validation, schema-based serialization, and structured logging out of the box.

We chose **JavaScript** for the same reasons as the frontend: consistency across the codebase and a lower barrier to entry for the team.

We use **Prisma** as our ORM. Instead of writing raw SQL, Prisma lets us query the database using JavaScript with auto-completion, auto-generated types, and built-in protection against SQL injection. It also handles database migrations, which made evolving our schema safer throughout the project.

### Database

We use **PostgreSQL** as our primary database. It is:
- Robust, open-source, and production-ready
- Well-suited for structured data with complex relationships — users, dogs, matches, messages all rely on foreign keys and joins
- Extended with **PostGIS** to support geolocation queries, which powers our distance-based dog discovery feature
- Fully compatible with Prisma

## Database Schema

<img width="696" height="542" alt="Screenshot 2026-10-22 at 16 23 36" src="https://github.com/user-attachments/assets/b732736b-bd4d-4886-9e2d-4446283289b9" />

The database contains 7 tables:

- **users** — stores user accounts with personal info, geolocation (`position`), role (`admin`/`user`), avatar path and online status (`lastSeenAt`)
- **dogs** — each user owns one dog, with name, breed, age, bio, gender, size and optional health certificate
- **dog_pics** — up to 5 photos per dog, ordered by `position`
- **swipes** — records every like/pass action between two dogs (`swiper_id` → `target_id`)
- **matches** — created when two dogs mutually like each other, links `id_dog1` and `id_dog2`, can be deactivated on unmatch
- **messages** — chat messages linked to a match (`match_id`) and a sender (`sender_id`)
- **refresh_tokens** — stores hashed refresh tokens for JWT authentication, with expiry and revocation status

## Modules

| Module | Type | Points | Description |
|--------|------|--------|-------------|
| Frontend & Backend Frameworks | Major | 2 | React (frontend) + Fastify (backend) |
| Real-time Features | Major | 2 | Online status updated in real-time across clients |
| User Interaction | Major | 2 | Chat system, profile pages, match system |
| Public REST API | Major | 2 | Secured API with rate limiting, Swagger documentation, and full CRUD endpoints |
| Standard User Management | Major | 2 | Profile editing, avatar upload, online status, profile pages |
| Advanced Permissions System | Major | 2 | Admin panel with CRUD on users, role-based views and actions |
| ORM | Minor | 1 | Prisma ORM for all database interactions |
| PWA | Minor | 1 | Installable as a mobile app with offline support |
| Design System | Minor | 1 | Custom design system with Tailwind — color palette, typography, 10+ reusable components |
| File Upload | Minor | 1 | Image upload for avatars and dog photos with type/size validation and secure storage |
| Internationalization | Minor | 1 | 3 languages (English, French, German) with i18n and language switcher |
| Additional Browser Support | Minor | 1 | Compatible with Chrome and Firefox |
| OAuth 2.0 | Minor | 1 | Google OAuth login |

**Total: 6 Major × 2pts + 7 Minor × 1pt = 19 points**

## Instruction 

## Getting Started

1. Copy the environment file and fill in your values:
```bash
   cp .env.example .env
```

2. Start all services:
```bash
   make up
```

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make up` | Build and start all containers |
| `make down` | Stop all containers |
| `make re` | Restart all containers |
| `make clean` | Stop containers|
| `make fclean` | Full reset — removes all Docker images and containers |
| `make logs` | Stream logs from all containers |
| `make ps` | Show running containers |

# Resourcesn and AI Usage

AI tools (primarily **Claude by Anthropic**) were used throughout the project as a learning and development support tool:

- Understanding new concepts and technologies
- Debugging and troubleshooting errors
- Code improvements and suggestions
- Translating i18n strings (English, French, German)

All code was understood and validated by the team before being integrated into the project.

### Workflow Github

Github Workflow for Issues and pull request
https://www.youtube.com/watch?v=d3N2yeAaLkc&themeRefresh=1

Intro to github issues
https://www.youtube.com/watch?v=c67GaAkf1BE

### Frontend 

Dockerrise React app using vite
https://dev.to/nandhakumar/step-by-step-guide-to-dockerize-react-app-created-using-vite-2jg3

Fetch API call
https://javascript.info/fetch

useState
https://react.dev/learn/state-a-components-memory

useEffect
https://react.dev/reference/react/useEffect

Learn JavaScript (interactive course)
https://learnjavascript.online

Doc for Javascript 
https://developer.mozilla.org/fr/

Introduction to React
https://www.geeksforgeeks.org/reactjs/react/

Tinder style swipe cards
https://www.youtube.com/watch?v=bzJHOoiu1Bs

How to create Tinder card swipe gesture 
https://www.geeksforgeeks.org/reactjs/how-to-create-tinder-card-swipe-gesture-using-react-and-framer-motion/

Style with tailwind (Official doc)
https://tailwindcss.com/docs/font-size

Google font et icons 
https://fonts.google.com/?preview.script=Latn

### Backend 

Fastify official docs
https://fastify.dev/docs/latest/Guides/Getting-Started/

Fastify in docker 
https://fastify.dev/docs/latest/Guides/Serverless/#docker

Prisma ORM (youtube vidéo for begginner)
https://www.youtube.com/watch?v=gimSKEsWYb4&t=1076s

Primsa Official Docs 
https://www.prisma.io/docs/getting-started

Primsa CRUD operations
https://www.prisma.io/docs/orm/prisma-client/queries/crud

JWT authentification 
https://www.youtube.com/watch?v=Y2H3DXDeS3Q&t=21s

### Database 

SQL basic
https://sqlbolt.com/

PostgreSQL Official documentation 
https://www.postgresql.org/docs/

PostgreSQL for beginners (youtube)
https://www.youtube.com/watch?v=qw--VYLpxG4&t=593s

Postgis implemenatation with prisma
https://github.com/prisma/orm/discussions/29537
