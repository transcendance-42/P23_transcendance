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
| masase | Product Owner & Developer worked primarily on the backend of the project. Implemented Google OAuth authentication, including account creation on first login and JWT session handling. Built the real-time chat backend with Socket.IO, covering authenticated socket connections, message persistence and delivery. Designed the geolocation feature using PostgreSQL and PostGIS, with radius-based user search, distance sorting and spatial indexing. Developed the online status system, allowing users to see when others were last active|
| dchellen | Project Manager & Developer. Coordinated the team by organizing meetings, following up on progress, monitoring each member’s contributions, and helping identify and resolve blockers. On the backend, restructured the API to follow a clear separation of concerns between schemas, controllers and database queries. Implemented most CRUD routes, file upload and deletion handling, access control and security measures. Managed regular database schema updates and migrations using Prisma and PostgreSQL/PostGIS. On the frontend, implemented the map functionality and contributed to integration, testing and documentation. |
| pchatagn | Technical Lead & Full-Stack Developer. Defined the project architecture and selected the tech stack. Used Miro to plan the overall project structure, features, modules and API routes. Designed the initial database schema (which evolved throughout the project). Implemented early backend routes for swipes and matches (before the controller/queries split). On the frontend, built a large part of the app: registration, login, dog registration, swipe logic and buttons, admin panel, photo upload, and various UI components. |
| jubedla | Frontend Developer. Built the dog profile page and its reusable profile card (photo carousel, owner card, and a “send message” button shown only for matched dogs), also used as the main card on the swipe page. Improved the user and dog registration forms with live per-field validation, password visibility toggle, field labels and photo error feedback.|
| csarfati | Frontend Developp. Built multiples features in the frontend such as user profile, dog profile, roomlist, chat. Also implement the PWA modules. Add the possibility to upload a pdf in the dog profile and handled the upload loading bar. |

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
| Login / Logout | Authenticate securely with JWT and refresh tokens | csarfati | masase / dchellen |
| Google OAuth | Sign in with Google | masase | masase |
| Profile Setup | Fill in personal information (name, city, date of birth) | csarfati | dchellen |
| Avatar Upload | Upload a profile photo | pchatagn | dchellen |
| Dog Profile | Create a dog profile with name, breed, age and bio | jubelda | masase/dchellen |
| Upload for dog | Upload up to 5 photos per dog, one health_file | csarfati/pchatagn | dchellen |
| Swipe | Like or pass on nearby dogs | jubelda | pchatagn/dchellen |
| Matching | When two dogs mutually like each other, a match is created | pchatagn | dchellen/masase |
| Chat | Real-time messaging between matched users | csarfati | masase |
| Geolocation | Discover dogs based on proximity | dchellen | masase |
| Online Status | See when other users were last active | masase | masase |
| Unmatch | Remove a match and its chat | pchatagn | dchellen |
| Deactivate Account | Users can deactivate their own account | pchatagn | pchatagn |
| Anonymization | Admin can delete, anonymized users accounts | pchatagn | dchellen
| Admin Panel | Admins can view, deactivate, reactivate and delete users | pchatagn | dchellen |
| Internationalization | App available in English, French and German | pchatagn | - |
| PWA | Installable as a mobile app | csarfati | - |

## Modules

| Module | Type | Points | Justification | Features | Team |
|--------|------|--------|---------------|----------|------|
| Frontend & Backend Frameworks | Major | 2 | React permet une UI réactive par composants réutilisables ; Fastify offre des performances supérieures à Express avec validation JSON Schema intégrée | Composants UI (NavBar, Modal, Button…), routes API REST, validation automatique des inputs | |
| Real-time Features | Major | 2 | Le statut en ligne doit se propager instantanément à tous les clients connectés sans polling | Socket.io met à jour `lastSeenAt` en temps réel, affiché dans la RoomList et les profils | |
| User Interaction | Major | 2 | L'application repose entièrement sur l'interaction entre utilisateurs via leurs chiens | Système de swipe (like/pass), chat en temps réel, pages de profil visitables, système de match | |
| Public REST API | Major | 2 | L'API doit être sécurisée, documentée et utilisable par des tiers | JWT sur toutes les routes, rate limiting, documentation Swagger, CRUD complet sur users/dogs/matches | |
| Standard User Management | Major | 2 | Chaque utilisateur doit pouvoir gérer son identité et sa présence sur la plateforme | Édition du profil, upload d'avatar, indicateur online/offline, pages de profil publiques | |
| Advanced Permissions System | Major | 2 | Certaines actions sont réservées aux administrateurs pour protéger l'intégrité de la plateforme | Panel admin, activation/désactivation de comptes, CRUD utilisateurs, vues conditionnelles selon le rôle (`user` / `admin`) | |
| ORM | Minor | 1 | Prisma garantit la cohérence entre le schéma DB et le code, avec typage automatique et migrations versionnées | Modèles Prisma pour toutes les entités, migrations, seed de données, requêtes type-safe | |
| PWA | Minor | 1 | L'app doit être installable et utilisable hors connexion sur mobile et desktop | Service worker via Vite PWA plugin, manifest, cache des assets, mode offline | |
| Design System | Minor | 1 | Un design system cohérent accélère le développement et garantit une UI uniforme | Palette de couleurs personnalisée, typographie, 10+ composants réutilisables (Button, Modal, InputField, Avatar, Badge…) | |
| File Upload | Minor | 1 | Les utilisateurs doivent pouvoir personnaliser leurs profils avec des photos et documents | Upload d'avatar (JPEG/PNG/WebP, max 5MB), photos de chien (jusqu'à 5), PDF de santé ; validation MIME côté frontend et backend via `file-type` | |
| Internationalization | Minor | 1 | L'app cible des utilisateurs suisses — FR, DE et EN sont les langues nationales | i18next avec 3 fichiers de locale, switcher de langue dans la navbar, toutes les clés UI traduites | |
| Additional Browser Support | Minor | 1 | Garantir une expérience identique sur les navigateurs les plus utilisés | Testé et validé sur Chrome et Firefox, CSS compatible cross-browser | |
| OAuth 2.0 | Minor | 1 | Simplifier la connexion en permettant l'authentification via un compte Google existant | Flow OAuth Google, callback handler, création automatique du compte si premier login | |

**Total : 6 Major (12 pts) + 7 Minor (7 pts) = 19 pts**

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

### Proxy

We use **Caddy** as our reverse proxy to handle incoming HTTP and HTTPS traffic and route requests to the appropriate services. We chose Caddy because it offers automatic HTTPS support, simple configuration, and efficient reverse proxying. In our project, it uses a local TLS certificate to secure connections through HTTPS on `localhost`, forwards API requests (`/api/*`) and Socket.IO connections (`/socket.io/*`) to the backend, and routes all other requests to the frontend. We also configured connection and response timeouts for API requests to improve reliability.

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

### Prerequisites

- **Docker** 
- **Docker Compose**
- **Git**

### Installation & Running

1. Clone the repository:
```bash
git clone https://github.com/transcendance-42/P23_transcendance.git ft_transcendance
cd ft_transcendance
```

2. Copy the environment files and fill in your values:
```bash
cp .env.example .env
cp backend/.env.docker.example backend/.env.docker
```

3. Build and start all services:
```bash
make up
```

The app is available at **https://localhost:4443**

### Development

To work with hot reload:
```bash
make dev
```

> With `make up`, changes require a rebuild (`make re`). Use `make dev` while coding.

### Developer Tools

- **Swagger API documentation**: https://localhost:4443/api/documentation

### Makefile Commands

| Command | Description |
|---------|-------------|
| `make up` | Build and start all containers (production mode, PWA offline enabled) |
| `make dev` | Build and start all containers in development mode (hot reload) |
| `make down` | Stop all containers |
| `make re` | Rebuild and restart all containers |
| `make clean` | Stop containers and remove them |
| `make fclean` | Full reset — removes all Docker images, containers and volumes |
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
- React docs: https://react.dev/learn
- useState: https://react.dev/learn/state-a-components-memory
- useEffect: https://react.dev/reference/react/useEffect
- Learn JavaScript (interactive): https://learnjavascript.online
- MDN JavaScript docs: https://developer.mozilla.org/fr/
- Introduction to React: https://www.geeksforgeeks.org/reactjs/react/
- Tinder style swipe cards: https://www.youtube.com/watch?v=bzJHOoiu1Bs
- Tinder card swipe with framer-motion: https://www.geeksforgeeks.org/reactjs/how-to-create-tinder-card-swipe-gesture-using-react-and-framer-motion/
- Tailwind CSS docs: https://tailwindcss.com/docs/font-size
- Google Fonts: https://fonts.google.com
- leaflet react: https://react-leaflet.js.org/docs/example-popup-marker/
- Leafletjs: https://leafletjs.com/examples/quick-start/
- nominatim manual: https://nominatim.org/release-docs/latest/customize/Overview/
- nominatim geoloc: https://www.youtube.com/watch?v=vOPr5k_SGVA

### Backend

- Node.js docus: https://nodejs.org/docs/latest/api/
- File system docus: https://nodejs.org/docs/latest/api/fs.html
- Fastify official docs: https://fastify.dev/docs/latest/Guides/Getting-Started/
- Fastify in Docker: https://fastify.dev/docs/latest/Guides/Serverless/#docker
- Prisma ORM (beginner video): https://www.youtube.com/watch?v=gimSKEsWYb4
- Prisma official docs: https://www.prisma.io/docs/getting-started
- Prisma CRUD operations: https://www.prisma.io/docs/orm/prisma-client/queries/crud
- JWT authentication: https://www.youtube.com/watch?v=Y2H3DXDeS3Q
- Upload with fastify: https://betterstack.com/community/guides/scaling-nodejs/fastify-file-uploads/
- fasitfy validation: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
- cookies mdn: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
- Jwt explained: https://www.youtube.com/watch?v=Y2H3DXDeS3Q&t=97s

### Database

- SQL basics: https://sqlbolt.com/
- PostgreSQL official docs: https://www.postgresql.org/docs/
- PostgreSQL for beginners: https://www.youtube.com/watch?v=qw--VYLpxG4
- PostgreSQL cheat-sheet: https://neon.com/postgresql/cheat-sheet
- PostGIS with Prisma: https://github.com/prisma/orm/discussions/29537
- Postgis docs: https://postgis.net/development/docs/

### Proxy

- caddy docs: https://caddyserver.com/docs/quick-starts/reverse-proxy
- mkcert https: https://github.com/filosottile/mkcert
