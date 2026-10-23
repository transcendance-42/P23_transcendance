# Ft_Transcendance

*This project has been created as part of the 42 curriculum by dchellen, jubelda, pchatagn, masase and csarfati.*

## Description

Tindog is our ft_transcendence project, the final mandatory project at 42 School.

Inspired by Tinder, Tindog is a swipe-based matching app, but for dog owners. Users create a profile for their dog and browse other dogs nearby. A simple swipe right means interest, swipe left means pass. When two dogs mutually like each other, it's a match and their owners can start chatting.

Tindog is designed as a social network for dog owners and supports multiple simultaneous users. The goal is to make it easier for dog owners to connect, whether to arrange playdates, share advice, or simply bond over their love of dogs.

## Team

| Login | Role | Responsibilities |
|-------|------|-----------------|
| masase | Product Owner / Developer | Defined features and priorities, validated completed work, communicated with evaluators and peers. Implemented features, participated in code reviews, tested and documented work |
| dchellen | Project Manager / Developer| Facilitated team coordination, organized meetings and planning sessions, tracked progress and managed blockers. Implemented features, participated in code reviews, tested and documented work |
| pchatagn | Technical Lead / Developer | Evaluated and selected the tech stack, defined the architecture, ensured code quality and reviewed critical changes. Implemented features, participated in code reviews, tested and documented work |
| jubelda | Developer | Implemented features, participated in code reviews, tested and documented work |
| csarfati | Developer | Implemented features, participated in code reviews, tested and documented work |

## Individual Contributions

| Login | Contributions |
|-------|--------------|
| masase | ... |
| dchellen | ... |
| pchatagny | ... |
| jubedla | ... |
| csarfati | ... |

## Project Management

The team used the following tools and practices to organize the work:

- **GitHub Issues** to track tasks, bugs and feature requests. Each issue was assigned to a team member with a clear description and acceptance criteria.
- **Pull Requests** were reviewed and approved by at least one other team member before merging.
- **Miro** for planning sessions, brainstorming and mapping out features at the start of the project.
- **Discord** and **WhatsApp** as our main communication channels for day-to-day coordination.
- The team worked **side by side as much as possible**, meeting regularly in person to sync, pair program and unblock each other.

## Features List

| Feature | Description | Team Member(Frontend) |  Team Member(Backend) |
|---------|-------------|----------------|----------------|
| Registration | Create an account with email and password | pchatagn | dchellen |
| Login / Logout | Authenticate securely with JWT and refresh tokens | csarfati | masase |
| Google OAuth | Sign in with Google | masase | masase |
| Profile Setup | Fill in personal information (name, city, date of birth) | csarfati | dchellen |
| Avatar Upload | Upload a profile photo | pchatagn | dchellen |
| Dog Profile | Create a dog profile with name, breed, age and bio | jubelda | masase/dchellen |
| Dog Photo Upload | Upload up to 5 photos per dog | csarfati/pchatagn | dchellen |
| Swipe | Like or pass on nearby dogs | jubelda | pchatagn/dchellen |
| Matching | When two dogs mutually like each other, a match is created | pchatagn | dchellen/masase |
| Chat | Real-time messaging between matched users | csarfati | masase |
| Geolocation | Discover dogs based on proximity | dchellen | masase |
| Online Status | See when other users were last active | masase | masase |
| Unmatch | Remove a match and its chat | pchatagn | dchellen |
| Deactivate Account | Users can deactivate their own account | pchatagn | pchatagn |
| Admin Panel | Admins can view, deactivate, reactivate and delete users | pchatagn | dchellen |
| Internationalization | App available in English, French and German | pchatagn | - |
| PWA | Installable as a mobile app | csarfati | - |

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
| Design System | Minor | 1 | Custom design system with Tailwind (color palette, typography, 10+ reusable components) |
| File Upload | Minor | 1 | Image upload for avatars and dog photos and pdf for dog's documentation with type/size validation and secure storage |
| Internationalization | Minor | 1 | 3 languages (English, French, German) with i18n and language switcher |
| Additional Browser Support | Minor | 1 | Compatible with Chrome and Firefox |
| OAuth 2.0 | Minor | 1 | Google OAuth login |

**Total: 6 Major × 2pts + 7 Minor × 1pt = 19 points**

## Technical Choices

- **Version Control**: Git is used throughout the project with clear and meaningful commit messages. All team members contributed commits reflecting proper work distribution.
- **Containerization**: The entire stack (frontend, backend, database, reverse proxy) runs via Docker.
- **Browser compatibility**: The application is compatible with the latest stable versions of Google Chrome and Mozilla Firefox.

### Frontend

We use **React** for building the user interface. React is appropriate for Tindog because:
- It is widely adopted in the industry and well-documented
- It makes it easy to build reusable UI components (cards, modals, buttons) that are reused across the app
- It handles dynamic state efficiently, which is essential for a real-time chat and swipe interface

We use **Vite** as our build tool and dev server. Compared to Create React App, Vite starts and rebuilds significantly faster, which improved our development experience. It is now the recommended standard for React projects.

We chose **JavaScript** over TypeScript to keep the learning curve manageable for the team and focus on delivering features faster.

We use **Tailwind CSS** for styling. It is a utility-first CSS framework that allows us to style components directly in JSX without writing separate CSS files. It keeps the codebase consistent and speeds up UI development.

### Backend

We use **Node.js** as our runtime environment, which allows us to run JavaScript server-side — keeping the language consistent across the full stack.

On top of it, we use **Fastify** as our web framework to handle HTTP requests and expose our REST API. We chose Fastify over Express because it is significantly faster, includes built-in request validation, schema-based serialization, and structured logging out of the box.

We use **Prisma** as our ORM. Instead of writing raw SQL, Prisma lets us query the database using JavaScript with auto-completion, auto-generated types, and built-in protection against SQL injection. It also handles database migrations, which made evolving our schema safer throughout the project.

### Database

We use **PostgreSQL** as our primary database. It is:
- Robust, open-source, and production-ready
- Well-suited for structured data with complex relationships — users, dogs, matches, messages all rely on foreign keys and joins
- Extended with **PostGIS** to support geolocation queries, which powers our distance-based dog discovery feature
- Fully compatible with Prisma

## Database Schema

<img width="696" height="542" alt="Database Schema" src="https://github.com/user-attachments/assets/b732736b-bd4d-4886-9e2d-4446283289b9" />

The database contains 7 tables:

- **users** — stores user accounts with personal info, geolocation (`position`), role (`admin`/`user`), avatar path and online status (`lastSeenAt`)
- **dogs** — each user owns one dog, with name, breed, age, bio, gender, size and optional health certificate
- **dog_pics** — up to 5 photos per dog, ordered by `position`
- **swipes** — records every like/pass action between two dogs (`swiper_id` → `target_id`)
- **matches** — created when two dogs mutually like each other, links `id_dog1` and `id_dog2`, can be deactivated on unmatch
- **messages** — chat messages linked to a match (`match_id`) and a sender (`sender_id`)
- **refresh_tokens** — stores hashed refresh tokens for JWT authentication, with expiry and revocation status

## Instructions

A COMPLETER PARCE QUE LA CEST UN PEU NIMP

### Prerequisites

- **Docker** >= 24.0
- **Docker Compose** >= 2.0
- **Git**
- A `.env` file configured (see `.env.example`)

### Installation & Running

1. Clone the repository:
```bash
git clone https://github.com/transcendance-42/P23_transcendance.git
cd P23_transcendance
```

2. Copy the environment file and fill in your values:
```bash
cp .env.example .env
```

3. Build and start all services:
```bash
make up
```

4. Seed the database (optional):
```bash
make seed
```

The app is available at **https://localhost**

### Developer Tools

- **Swagger API documentation**: https://localhost/api/documentation
- **Prisma Studio** (database explorer):
```bash
docker compose exec backend npx prisma studio
```
Then open http://localhost:51212

### Makefile Commands

| Command | Description |
|---------|-------------|
| `make up` | Build and start all containers |
| `make down` | Stop all containers |
| `make re` | Restart all containers |
| `make clean` | Stop containers |
| `make fclean` | Full reset — removes all Docker images and containers |
| `make logs` | Stream logs from all containers |
| `make ps` | Show running containers |

## Resources

### AI Usage

AI tools (primarily **Claude by Anthropic**) were used throughout the project as a learning and development support tool:

- Understanding new concepts and technologies
- Debugging and troubleshooting errors
- Code improvements and suggestions
- Translating i18n strings (English, French, German)

All code was understood and validated by the team before being integrated into the project.

### Workflow & GitHub

- Github Workflow for Issues and pull requests: https://www.youtube.com/watch?v=d3N2yeAaLkc
- Intro to GitHub Issues: https://www.youtube.com/watch?v=c67GaAkf1BE

### Frontend

- Dockerize React app using Vite: https://dev.to/nandhakumar/step-by-step-guide-to-dockerize-react-app-created-using-vite-2jg3
- Fetch API: https://javascript.info/fetch
- useState: https://react.dev/learn/state-a-components-memory
- useEffect: https://react.dev/reference/react/useEffect
- Learn JavaScript (interactive): https://learnjavascript.online
- MDN JavaScript docs: https://developer.mozilla.org/fr/
- Introduction to React: https://www.geeksforgeeks.org/reactjs/react/
- Tinder style swipe cards: https://www.youtube.com/watch?v=bzJHOoiu1Bs
- Tinder card swipe with framer-motion: https://www.geeksforgeeks.org/reactjs/how-to-create-tinder-card-swipe-gesture-using-react-and-framer-motion/
- Tailwind CSS docs: https://tailwindcss.com/docs/font-size
- Google Fonts: https://fonts.google.com

### Backend

- Fastify official docs: https://fastify.dev/docs/latest/Guides/Getting-Started/
- Fastify in Docker: https://fastify.dev/docs/latest/Guides/Serverless/#docker
- Prisma ORM (beginner video): https://www.youtube.com/watch?v=gimSKEsWYb4
- Prisma official docs: https://www.prisma.io/docs/getting-started
- Prisma CRUD operations: https://www.prisma.io/docs/orm/prisma-client/queries/crud
- JWT authentication: https://www.youtube.com/watch?v=Y2H3DXDeS3Q

### Database

- SQL basics: https://sqlbolt.com/
- PostgreSQL official docs: https://www.postgresql.org/docs/
- PostgreSQL for beginners: https://www.youtube.com/watch?v=qw--VYLpxG4
- PostGIS with Prisma: https://github.com/prisma/orm/discussions/29537
