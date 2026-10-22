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

## Development Practices

The project follows the general requirements defined in the subject:

- **Version Control**: Git is used throughout the project with clear and meaningful commit messages. All team members contributed commits reflecting proper work distribution.
- **Containerization**: The entire stack (frontend, backend, database, reverse proxy) runs via Docker
- **Browser compatibility**: The application is compatible with the latest stable versions of Google Chrome and Mozilla Firefox.

## Description

Tindog is our ft_transcendence project, the final mandatory project at 42 School.

Inspired by Tinder, Tindog is a swipe-based matching app, but for dog owners. Users create a profile for their dog and browse other dogs nearby. A simple swipe right means interest, swipe left means pass. When two dogs mutually like each other, it's a match and their owners can start chatting.

Tindog is designed as a social network for dog owners and supports multiple simultaneous users:

- Multiple users can be logged in and active at the same time.
- Concurrent swipes and matches are handled safely on the backend with no data conflicts.
- Chat rooms reflect real-time activity — online status is updated every 30 seconds across all connected users.
- Each user's data is fully isolated — matches, messages and profile information are private and consistent.

The goal is to make it easier for dog owners to connect, whether to arrange playdates, share advice, or simply bond over their love of dogs.

### Frontend

We use React for building the user interface. React seems like the appropriate choice since: 
- mainly used amoung companies 
- easy to build reusable UI elements 
- manage dynamic state across the app

We use Vite as our build tool and dev server. Compared to the older Create React App, Vite is significantly faster to start and rebuild, which improves the development experience. It is now the recommended standard for React projects.

We chose JavaScript over TypeScript to keep the learning curve manageable for the team and focus on delivering features faster. 

We use Tailwind CSS for styling. It's an utility-first CSS framework that allows us to style components directly in JSX without writing separate CSS files. It keeps the code consistent and speeds up UI development.


### Backend

We use Node.js as our runtime environment, which allows us to run JavaScript server-side. 

On top of it, we use Fastify as our web framework to handle HTTP requests and expose our REST API. We chose Fastify over alternatives like Express because it is significantly faster, has native TypeScript support, and includes built-in request validation and logging.

We chose JavaScript for the same reasons as the frontend:
- consistency across the codebase
- a lower barrier to entry for the team.

We use PRISMA as our ORM. Instead of writing raw SQL in the backend code, Prisma lets us query the database using JavaScript, with auto-generated types and built-in protection against SQL injection.

### Database 

We use PostgreSQL as our primary database. We made this choice becuase PostgreSQL is:
- robust
- opensource
- well-suited for structured data with complex relationships 
- support foreign key
- compatible with PRISMA

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

## Lancer des fake data en local pour dev
```bash
cd backend
node prisma/seed.js
```

# Resources

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
