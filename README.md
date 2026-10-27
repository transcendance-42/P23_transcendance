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

## Individual Challenges

| Login | Challenges |
|-------|-----------|
| masase | Add a radius filter (5 km, 10 km, 25 km) |
| dchellen | One of the main challenges was adapting to a new technology stack, particularly JavaScript and its specific features, such as file uploads and asynchronous operations. I also had to adapt to a large codebase and understand its architecture, while integrating my work with functions and components developed by other team member.|
| pchatagn | Learning JavaScript as a new language, connecting the frontend and backend, handling file uploads with proper error management, choosing the right stack for our features, and reviewing code I wasn’t familiar with. |
| jubedla | Coming late into the project i had to catch the rhythm fast |
| csarfati | the upload progress bar could not be done with `fetch`, so we used `XMLHttpRequest` for avatar and PDF uploads. The PWA offline mode needs a production build and a trusted HTTPS certificate, so `make up` runs the production build and the README explains how to trust `certs/local.pem`.

### Team challenge

- Each member reviews and tests **one feature built by another member** and reports 1 bug or 1 improvement idea.
- Prepare a **5-minute final demo** where everyone presents their part.

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
| Frontend & Backend Frameworks | Major | 2 | React enables a reactive UI with reusable components; Fastify outperforms Express with built-in JSON Schema validation | Reusable UI components (NavBar, Modal, Button…), REST API routes, automatic input validation | pchatagn / dchellen |
| Real-time Features | Major | 2 | Online status must propagate instantly to all connected clients without polling | Socket.io updates `lastSeenAt` in real time, displayed in RoomList and profiles | masase |
| User Interaction | Major | 2 | The app is entirely built around user interaction through their dogs, a match is our friendship relation. Both owners accept each other by swiping, appear in each other’s roomlist, see online status and can chat. | Swipe system (like/pass), real-time chat, visitable profile pages, match system | pchatagn/masase/ dchellen/csarfati/ jubelda |
| Public REST API | Major | 2 | The API must be secured, documented and usable by third parties | JWT on all routes, rate limiting, Swagger documentation, full CRUD on users/dogs/matches | masase |
| Standard User Management | Major | 2 | Each user must be able to manage their identity and presence on the platform | Profile editing, avatar upload, online/offline indicator, public profile pages | pchatagn/masase/ dchellen/csarfati/ jubelda |
| Advanced Permissions System | Major | 2 | Certain actions are reserved for administrators to protect platform integrity | Admin panel, account activation/deactivation, user CRUD, role-based views (`user` / `admin`) | pchatagn/dchellen |
| ORM | Minor | 1 | Prisma ensures consistency between DB schema and code, with automatic typing and versioned migrations | Prisma models for all entities, migrations, seed data, type-safe queries | pchatagn/dchellen |
| PWA | Minor | 1 | The app must be installable and usable offline on mobile and desktop | Service worker via Vite PWA plugin, manifest, asset caching, offline mode | csarfati |
| Design System | Minor | 1 | A consistent design system speeds up development and ensures a uniform UI | Custom color palette, typography, 10+ reusable components (Button, Modal, InputField, Avatar, Badge…) | jubelda/csarfati/pchatagn |
| File Upload | Minor | 1 | Users must be able to personalize their profiles with photos and documents | Avatar upload (JPEG/PNG/WebP, max 5MB), dog photos (up to 5), health PDF; MIME validation on both frontend and backend via `file-type` | csarfati/dchellen |
| Internationalization | Minor | 1 | The app targets Swiss users — FR, DE and EN are the national languages | i18next with 3 locale files, language switcher in navbar, all UI keys translated | pchatagn |
| Additional Browser Support | Minor | 1 | Ensure an identical experience across the most widely used browsers | Tested and validated on Chrome and Firefox, cross-browser compatible CSS | jubelda |
| OAuth 2.0 | Minor | 1 | Simplify login by allowing authentication via an existing Google account | Google OAuth flow, callback handler, automatic account creation on first login | masase |

**Total: 6 Major (12 pts) + 7 Minor (7 pts) = 19 pts**

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

- **Make** 
- **Docker** 
- **Docker Compose**
- **Git**
- **openssl** (used by `make certs` to create the self-signed HTTPS certificate)
- A recent **Google Chrome**
- These ports must be free on your machine:

| Port | Used by |
|------|---------|
| 4443 | the site in HTTPS (`https://localhost:4443`) |
| 8080 | HTTP (redirects to HTTPS) |
| 5432 | PostgreSQL |

### Environment variables

Two files must be created from the examples (see step 2 of the installation):

**`.env`** (database container)

| Variable | Meaning |
|----------|---------|
| `POSTGRES_DB` | database name |
| `POSTGRES_USER` | database user |
| `POSTGRES_PASSWORD` | database password |

**`backend/.env.docker`** (backend container)

| Variable | Meaning |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string; user, password and database name must match the `.env` values, and the host is the database service name |
| `JWT_SECRET` | secret used to sign access tokens (any long random string) |
| `COOKIE_SECRET` | secret used to sign cookies (any long random string) |
| `PORT` | port of the backend inside Docker |
| `SECURED_API_KEY` | key for the public API, sent in the `X-API-Key` header |
| `CLIENT_ID`, `CLIENT_SECRET` | Google OAuth credentials |
| `REDIRECT_URL` | URL Google redirects to after login (must match the one declared in the Google console) |

Without the Google values (`CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URL`), the
"Sign in with Google" button does not work; email and password login works normally.

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

### HTTPS certificate and PWA (offline mode)

`make up` creates a self-signed HTTPS certificate in `certs/`. The site works with it:
the browser shows a warning, accept it to continue.

Chrome only registers the service worker (installable app and offline mode) if it
trusts the certificate. Without it, the app works normally but without offline mode.
To enable it, after `make up`:

1. Open `chrome://certificate-manager` (or `chrome://settings/certificates`).
2. Import `certs/local.pem` as a trusted certificate
   (Custom certificates > Installed by you > Import, or Authorities > Import).
3. Quit Chrome completely and open `https://localhost:4443`.

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
