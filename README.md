# Ft_Transendance

## Description

Tindog is our ft_transcendence project, the final mandatory project at 42 School.

Inspired by Tinder, Tindog is a swipe-based matching app, but for dog owners. Users create a profile for their dog and browse other dogs nearby. A simple swipe right means interest, swipe left means pass. When two dogs mutually like each other, it's a match and their owners can start chatting.

The goal is to make it easier for dog owners to connect, whether to arrange playdates, share advice, or simply bond over their love of dogs.

### Frontend

We use React for building the user interface. React seems like the appropriate choice since: 
- mainly used amoung companies 
- easy to build reusable UI elements 
- manage dynamic state across the app

We use Vite as our build tool and dev server. Compared to the older Create React App, Vite is significantly faster to start and rebuild, which improves the development experience. It is now the recommended standard for React projects.

We chose JavaScript over TypeScript to keep the learning curve manageable for the team and focus on delivering features faster. 

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

(Redis: an ultra-fast, open-source, in-memory NoSQL key-value data store. It is widely used to achieve sub-millisecond response times for dynamic applications. It operates primarily in RAM but supports persistence options, and functions as a database, cache, message broker, and streaming engine.)

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

### Database 

SQL basic
https://sqlbolt.com/

PostgreSQL Official documentation 
https://www.postgresql.org/docs/

PostgreSQL for beginners (youtube)
https://www.youtube.com/watch?v=qw--VYLpxG4&t=593s
