# GitSprint Codebase Architecture and Patterns

## Project Overview

GitSprint is a full-stack TypeScript monorepo that follows modern software architecture patterns and best practices. The project combines a **Remix-based frontend** with a **NestJS backend** following hexagonal architecture principles, unified by shared packages and a centralized database layer.

## 🏗️ Monorepo Structure

```
gitsprint/
├── apps/
│   ├── api/              # NestJS backend with hexagonal architecture
│   └── web/              # Remix frontend application
├── packages/
│   ├── api-utils/        # Shared NestJS utilities and patterns
│   └── db/               # Shared database layer (Prisma)
└── [config files]       # Turbo, TypeScript, linting, etc.
```

### Technology Stack

- **Build System**: Turbo monorepo with pnpm workspaces
- **Backend**: NestJS (Node.js framework inspired by Angular)
- **Frontend**: Remix (full-stack React framework)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth with Polar integration
- **UI**: Radix UI + Tailwind CSS + shadcn/ui components
- **Language**: TypeScript throughout
- **Deployment**: Vercel (frontend), Docker support (backend)

## 🎯 Backend Architecture (NestJS + Hexagonal)

### API Application (`apps/api/`)

The backend follows **hexagonal architecture** (ports and adapters pattern) for clean separation of concerns:

```
apps/api/src/
├── modules/
│   └── test/                    # Example domain module
│       ├── application/         # Application layer
│       │   ├── dtos/           # Data Transfer Objects
│       │   └── services/       # Application services
│       ├── domain/             # Domain layer (business logic)
│       │   ├── enums/          # Domain enums
│       │   ├── models/         # Domain models
│       │   └── ports/          # Interface definitions
│       ├── infrastructure/      # Infrastructure layer
│       │   ├── adaptors/       # External service adapters
│       │   ├── entities/       # Database entities
│       │   └── providers/      # DI providers
│       └── presentation/       # Presentation layer
│           └── controllers/    # HTTP controllers
├── app.module.ts               # Root application module
└── main.ts                     # Application entry point
```

#### Hexagonal Architecture Layers:

1. **Domain Layer**: Core business logic, models, and interfaces
2. **Application Layer**: Use cases, services, and DTOs
3. **Infrastructure Layer**: Database, external APIs, and technical concerns
4. **Presentation Layer**: Controllers, REST endpoints, and input validation

### API Utils Package (`packages/api-utils/`)

Shared utilities following NestJS patterns:

```
packages/api-utils/src/
├── auth/                       # Authentication & authorization
│   ├── decorators/            # Custom decorators
│   ├── guards/                # Route guards (ApiKey, AccessToken, Roles, etc.)
│   ├── services/              # Auth services
│   └── types/                 # Auth type definitions
├── cache/                      # Caching abstraction
├── config/                     # Configuration management
├── correlation/                # Request correlation
├── database/                   # Prisma service
├── health/                     # Health check endpoints
├── logging/                    # Structured logging
├── performance/                # Performance monitoring & Prometheus
├── queue/                      # Message queue abstraction
└── response/                   # Response formatting
```

#### Key Features:

- **Guards**: Multi-layer security (API keys, access tokens, rate limiting, roles)
- **Interceptors**: Logging, performance monitoring, response formatting
- **Monitoring**: Prometheus metrics integration
- **Configuration**: Environment-based with Joi validation

## 🎨 Frontend Architecture (Remix)

### Web Application (`apps/web/`)

Remix follows file-based routing with co-located data loading:

```
apps/web/app/
├── components/                 # Reusable UI components
│   ├── auth/                  # Authentication components
│   ├── common/                # Shared components
│   ├── errors/                # Error boundary components
│   ├── landing/               # Landing page components
│   ├── self/                  # User profile components
│   └── ui/                    # shadcn/ui components
├── context/                    # React context providers
├── hooks/                      # Custom React hooks
├── lib/                        # Utility libraries
├── models/                     # TypeScript type definitions
├── routes/                     # File-based routing
│   ├── action+/               # Server actions
│   ├── api+/                  # API routes
│   ├── auth+/                 # Authentication routes
│   ├── feature+/              # Feature routes
│   └── loader+/               # Data loaders
├── server/                     # Server-side utilities
│   ├── middlewares/           # Server middleware
│   ├── services/              # Server services
│   └── utils/                 # Server utilities
├── types/                      # Global type definitions
├── utils/                      # Client utilities
├── root.tsx                    # Root layout component
└── tailwind.css               # Global styles
```

#### Remix Patterns:

- **Co-located Data Loading**: Each route can export `loader` and `action` functions
- **Progressive Enhancement**: Forms work without JavaScript
- **Nested Routing**: Hierarchical layouts with `<Outlet />`
- **Server-Side Rendering**: Full SSR with hydration
- **Client-Side Navigation**: SPA-like experience after hydration

### Key Frontend Features:

- **Authentication**: Better Auth integration with Google OAuth
- **Themes**: Dark/light mode with system preference detection
- **Internationalization**: i18next with server-side language detection
- **Payments**: Polar integration for subscriptions
- **Error Handling**: Comprehensive error boundaries
- **Form Handling**: Server-side validation with client-side enhancement

## 🗄️ Database Layer (`packages/db/`)

### Shared Database Package

```
packages/db/
├── prisma/
│   ├── migrations/            # Database migrations
│   └── schema.prisma          # Database schema definition
└── src/
    └── index.ts               # Prisma client export
```

#### Database Schema:

- **User Management**: Users, sessions, accounts, verification
- **Subscriptions**: Polar-based subscription management
- **Payments**: Payment tracking and history
- **Logging**: Centralized application logs
- **Test Data**: Development and testing support

#### Key Models:

```prisma
  model User {
    id               String    @id
    name             String
    email            String    @unique
    role             String?
    profileCompleted Boolean?
    githubId         String?   // GitHub user ID from Better Auth
    githubUsername   String?   // GitHub username
    googleId         String?   // Google user ID from Better Auth
    subscriptions    Subscription[]
    payments         Payment[]
    sessions         Session[]
    accounts         Account[]
  }

model Subscription {
  userId              String
  user                User     @relation(fields: [userId], references: [id])
  polarSubscriptionId String?
  status              String?
  // ... other fields
}
```

## 🔄 Frontend-Backend Communication Patterns

### 1. **Authentication Flow**

- **Frontend**: Better Auth client with React hooks
- **Backend**: Bearer token validation via guards
- **Shared**: Prisma database for session storage

### 2. **API Communication**

- **REST APIs**: NestJS controllers expose HTTP endpoints
- **Environment Configuration**: Shared base URLs (APP_BASE_URL, API_BASE_URL)
- **CORS**: Configured trusted origins between frontend and backend

### 3. **Data Flow Pattern**

```
User Request → Remix Loader/Action → External API/Database → Response
                     ↓
            Better Auth Session → NestJS Guards → Business Logic
```

### 4. **Shared Services**

- **Database**: Both apps use `@gitsprint/db` package
- **Types**: Shared TypeScript definitions
- **Validation**: Zod schemas for data validation

## 🛡️ Security Architecture

### Backend Security (NestJS)

- **Multi-layer Guards**: API key → Rate limiting → Access token → Roles
- **Input Validation**: Class-validator with DTOs
- **Environment Variables**: Joi schema validation
- **CORS**: Strict origin validation

### Frontend Security (Remix)

- **Session Management**: HTTP-only cookies with Better Auth
- **CSRF Protection**: Built-in Remix protections
- **Environment Variables**: Server-only access with client exposure via `window.ENV`

## 🚀 Development Patterns

### Monorepo Management

```bash
# Root level commands
pnpm dev          # Start all apps in development
pnpm build        # Build all packages and apps
pnpm lint         # Lint entire codebase
pnpm check-types  # TypeScript type checking
```

### Package Dependencies

- **Web app depends on**: `@gitsprint/db`
- **API app depends on**: `@gitsprint/api-utils`, `@gitsprint/db`
- **Shared**: Turbo orchestrates build dependencies

### Code Generation

- **Prisma**: Database client generation
- **Better Auth**: Type-safe authentication hooks
- **Remix**: Route-based code splitting

## 📁 File Naming Conventions

### Backend (NestJS)

- **Modules**: `feature.module.ts`
- **Controllers**: `feature.controller.ts`
- **Services**: `feature.service.ts`
- **DTOs**: `feature.dto.ts`
- **Entities**: `feature.entity.ts`

### Frontend (Remix)

- **Routes**: Dot notation for nesting (`dashboard.projects.$id.tsx`)
- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase with purpose (`data-inject-error.ts`)
- **Server files**: `.server.ts` suffix

## 🔧 Configuration & Environment

### Environment Variables Pattern

```
# Shared
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Backend specific (API)
PORT=3000
APP_KEY=apikey
ACCESS_TOKEN_VALIDATION_URL=...

# Frontend specific (Web)
APP_BASE_URL=http://localhost:5173
API_BASE_URL=http://localhost:3000
BETTER_AUTH_GOOGLE_ID=...
POLAR_ACCESS_TOKEN=...
```

## 🎯 Key Architectural Benefits

1. **Separation of Concerns**: Hexagonal architecture in backend, clear layer boundaries
2. **Type Safety**: End-to-end TypeScript with shared types
3. **Code Reuse**: Shared packages reduce duplication
4. **Scalability**: Independent deployments, modular structure
5. **Developer Experience**: Hot reload, type checking, unified tooling
6. **Testing**: Isolated layers enable comprehensive testing strategies

## 🔄 Data Flow Summary

```
Browser → Remix Route (SSR) → Loader/Action → Database/External APIs
    ↓
Remix Client (SPA) → API Routes → NestJS Controllers → Services → Database
    ↓
Better Auth Session → Guards → Business Logic → Response → Client State
```

This architecture enables GitSprint to maintain clean separation between frontend and backend while sharing common concerns like authentication, database access, and type definitions across the entire application stack.

---

# 🚀 GitSprint SaaS Transformation Roadmap

## must do

use context7 to get the recent docs, I'm using betterauth with prisma, remix, nestjs

Before stating each task, check if the issue is already created, if not, create a issue in the repository @leocodeio/gitsprint with name as <task-name> and mention what the issue was there (just the info what the issue was no need to add a todo and update there, once completed, add a comment by opencode that it is completed) add <task_number> as label there.

After completing each task update what you have did in development/docs/<date>/<task-name>.md file.

## Product Vision

Transform GitSprint into a comprehensive Agile SaaS platform that bridges GitHub repository management with structured sprint planning and team collaboration.

## Core Modules

1. **Dashboard & Onboarding**: User journey and team setup
2. **Teams**: Role-based collaboration and management
3. **Sprints**: Agile sprint planning with GitHub integration
4. **GitHub Integration**: Dual-mode operation (GitHub-linked vs repo-less)

## Business Model

- **Subscription Tiers**: Starter ($9/user), Pro ($19/user), Enterprise (custom)
- **Usage-based Add-ons**: Extra integrations, advanced analytics, custom workflows
- **Free Tier**: Up to 3 users, 1 project, basic features

# 📋 TODO Flow - Development Roadmap

## v0 - GitSprint MVP Foundation (Light Launch)

### 🎯 Core Objectives

Transform GitSprint into a functional SaaS MVP focused on GitHub-first sprint management with OAuth-only authentication.

### 📋 v0 Roadmap

#### **Phase 1: Authentication & Database Foundation (Week 1)**

**1.1 Better Auth Enhancement**

- [ ] **1.1.1** Remove email/password authentication (OAuth-only)
- [ ] **1.1.2** Configure GitHub OAuth provider with proper scopes (`user:email`, `read:user`, `repo`)
- [ ] **1.1.3** Enhance Google OAuth configuration with profile scopes
- [ ] **1.1.4** Add GitHub user fields (githubId, githubUsername) to Better Auth user model
- [ ] **1.1.5** Test OAuth flows and session management

**1.2 Database Schema for SaaS**

- [ ] **1.2.1** Design core SaaS models:

  ```prisma
  model Organization {
    id       String @id @default(cuid())
    name     String
    slug     String @unique
    ownerId  String
    owner    User   @relation(fields: [ownerId], references: [id])
    members  OrganizationMember[]
    teams    Team[]
    projects Project[]
    @@map("organizations")
  }

  model Team {
    id           String  @id @default(cuid())
    name         String
    description  String?
    orgId        String
    organization Organization @relation(fields: [orgId], references: [id])
    members      TeamMember[]
    projects     Project[]
    sprints      Sprint[]
    @@map("teams")
  }

  model Project {
    id            String   @id @default(cuid())
    name          String
    description   String?
    githubRepoUrl String?
    teamId        String
    team          Team     @relation(fields: [teamId], references: [id])
    sprints       Sprint[]
    stories       Story[]
    @@map("projects")
  }

  model Sprint {
    id        String      @id @default(cuid())
    name      String
    goal      String?
    startDate DateTime
    endDate   DateTime
    status    SprintStatus @default(PLANNING)
    projectId String
    project   Project     @relation(fields: [projectId], references: [id])
    stories   Story[]
    @@map("sprints")
  }

  model Story {
    id          String      @id @default(cuid())
    title       String
    description String?
    points      Int?
    priority    Priority    @default(MEDIUM)
    status      StoryStatus @default(TODO)
    assigneeId  String?
    assignee    User?       @relation(fields: [assigneeId], references: [id])
    projectId   String
    project     Project     @relation(fields: [projectId], references: [id])
    sprintId    String?
    sprint      Sprint?     @relation(fields: [sprintId], references: [id])
    @@map("stories")
  }

  enum SprintStatus {
    PLANNING
    ACTIVE
    COMPLETED
    CANCELLED
  }

  enum StoryStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  enum Priority {
    LOW
    MEDIUM
    HIGH
  }
  ```

- [ ] **1.2.2** Create and run database migrations
- [ ] **1.2.3** Update Prisma client and types
- [ ] **1.2.4** Create seed data for development

**1.3 GitHub Integration Schema**

- [ ] **1.3.1** Add models for GitHub repository and issue synchronization:

  ```prisma
  // Link between a GitSprint Project and a GitHub Repository
  model GithubRepository {
    id            String   @id @default(cuid())
    githubRepoId  BigInt   @unique // The unique ID of the repository from GitHub
    name          String
    fullName      String   @unique
    private       Boolean
    htmlUrl       String
    description   String?
    projectId     String   @unique
    project       Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
    // We can sync issues, projects, etc. for this repo
    issues        GithubIssue[]
    @@map("github_repositories")
  }

  // Synced GitHub Issue
  model GithubIssue {
    id            BigInt   @id // The unique ID of the issue from GitHub
    number        Int
    title         String
    body          String?
    state         String
    htmlUrl       String
    repoId        String
    repository    GithubRepository @relation(fields: [repoId], references: [id], onDelete: Cascade)
    storyId       String?  @unique
    story         Story?   @relation(fields: [storyId], references: [id])
    @@unique([repoId, number])
    @@map("github_issues")
  }

  // Extend Project and Story for linking
  model Project {
    // ... existing fields
    githubRepository GithubRepository?
  }

  model Story {
    // ... existing fields
    githubIssue   GithubIssue?
  }
  ```

- [ ] **1.3.2** Create and run database migrations for the new tables.
- [ ] **1.3.3** Update Prisma client to reflect the schema changes.

#### **Phase 2: API Modules (Hexagonal Architecture) (Week 2)**

**2.1 Core Domain Modules**

- [ ] **2.1.1** Organizations Module:

  ```
  apps/api/src/modules/organizations/
  ├── domain/
  │   ├── models/organization.model.ts
  │   └── ports/organization.repository.port.ts
  ├── application/
  │   ├── dtos/create-organization.dto.ts
  │   └── services/organization.service.ts
  ├── infrastructure/
  │   ├── entities/organization.entity.ts
  │   └── repositories/organization.repository.ts
  └── presentation/
      └── controllers/organization.controller.ts
  ```

- [ ] **2.1.2** Teams Module (similar structure)
- [ ] **2.1.3** Projects Module (similar structure)
- [ ] **2.1.4** Sprints Module (similar structure)
- [ ] **2.1.5** Stories Module (similar structure)
- [ ] **2.1.6** GitIntegrations Module (similar structure, responsible for handling GitHub API interactions via Octanet.js)

**2.2 API Endpoints Design**

- [ ] **2.2.1** Organizations Module Endpoints:
  - `POST /api/organizations` - Create organization
  - `GET /api/organizations` - List user's organizations
  - `GET /api/organizations/:id` - Get organization details
  - `PATCH /api/organizations/:id` - Update organization
  - `DELETE /api/organizations/:id` - Delete organization
  - `POST /api/organizations/:id/members` - Add member
  - `DELETE /api/organizations/:id/members/:userId` - Remove member
  - `PATCH /api/organizations/:id/members/:userId` - Update member role

- [ ] **2.2.2** Teams Module Endpoints:
  - `POST /api/teams` - Create team
  - `GET /api/organizations/:orgId/teams` - List organization teams
  - `GET /api/teams/:id` - Get team details
  - `PATCH /api/teams/:id` - Update team
  - `DELETE /api/teams/:id` - Delete team
  - `POST /api/teams/:id/members` - Add team member
  - `DELETE /api/teams/:id/members/:userId` - Remove team member
  - `PATCH /api/teams/:id/members/:userId` - Update member role

- [ ] **2.2.3** Projects Module Endpoints:
  - `POST /api/projects` - Create project
  - `GET /api/teams/:teamId/projects` - List team projects
  - `GET /api/projects/:id` - Get project details
  - `PATCH /api/projects/:id` - Update project
  - `DELETE /api/projects/:id` - Delete project

- [ ] **2.2.4** Sprints Module Endpoints:
  - `POST /api/sprints` - Create sprint
  - `GET /api/projects/:projectId/sprints` - List project sprints
  - `GET /api/sprints/:id` - Get sprint details
  - `PATCH /api/sprints/:id` - Update sprint
  - `DELETE /api/sprints/:id` - Delete sprint
  - `POST /api/sprints/:id/start` - Start sprint
  - `POST /api/sprints/:id/complete` - Complete sprint
  - `GET /api/sprints/:id/burndown` - Get burndown chart data

- [ ] **2.2.5** Stories Module Endpoints:
  - `POST /api/stories` - Create story
  - `GET /api/projects/:projectId/stories` - List project stories
  - `GET /api/sprints/:sprintId/stories` - List sprint stories
  - `GET /api/stories/:id` - Get story details
  - `PATCH /api/stories/:id` - Update story
  - `DELETE /api/stories/:id` - Delete story
  - `PATCH /api/stories/:id/assign` - Assign story to sprint
  - `PATCH /api/stories/:id/unassign` - Remove story from sprint
  - `PATCH /api/stories/:id/status` - Update story status
- [ ] **2.2.6** Git Integration Endpoints (Octanet):
  - `GET /api/git/repositories` - List user's available GitHub repositories.
  - `POST /api/projects/:id/git/sync` - Link a project to a GitHub repository and perform initial issue sync.
  - `DELETE /api/projects/:id/git/sync` - Unlink GitHub repository from a project.
  - `GET /api/projects/:id/git/issues` - Get synced issues for a project.
  - `POST /api/projects/:id/git/issues/sync` - Trigger a manual re-sync of issues from GitHub.

#### **Phase 3: Web Services & UI Integration (Week 3)**

**3.1 Remix Server Services**

- [ ] **3.1.1** Create API client services:
  ```typescript
  // apps/web/app/server/services/api/
  ├── organizations.server.ts
  ├── teams.server.ts
  ├── projects.server.ts
  ├── sprints.server.ts
  └── stories.server.ts
  ```
- [ ] **3.1.2** Implement type-safe API calling patterns
- [ ] **3.1.3** Add error handling and loading states
- [ ] **3.1.4** Create Remix loaders and actions

**3.2 Frontend State Management**

- [ ] **3.2.1** Create React context for organization/team state
- [ ] **3.2.2** Implement optimistic updates for better UX
- [ ] **3.2.3** Add real-time synchronization patterns

#### **Phase 4: Core UI Development (Week 4)**

**4.1 Layout & Navigation**

- [ ] **4.1.1** SaaS dashboard layout with sidebar
- [ ] **4.1.2** Organization/team switcher component
- [ ] **4.1.3** Breadcrumb navigation system
- [ ] **4.1.4** User menu with GitHub profile integration

**4.2 Core Pages**

- [ ] **4.2.1** Organization onboarding flow
- [ ] **4.2.2** Team management dashboard
- [ ] **4.2.3** Project creation and overview
- [ ] **4.2.4** Sprint planning interface (basic Kanban)
- [ ] **4.2.5** Story management (CRUD operations)

**4.3 GitHub Integration UI**

- [ ] **4.3.1** Repository selection interface
- [ ] **4.3.2** GitHub OAuth connection status
- [ ] **4.3.3** Repository permissions verification

#### **Phase 5: Testing & Documentation (Week 5)**

**5.1 Testing Suite**

- [ ] **5.1.1** Unit tests for API services and domain logic
- [ ] **5.1.2** Integration tests for API endpoints
- [ ] **5.1.3** E2E tests for critical user flows
- [ ] **5.1.4** Load testing for authentication flows

**5.2 Documentation**

- [ ] **5.2.1** API documentation with OpenAPI/Swagger
- [ ] **5.2.2** User guide for basic flows
- [ ] **5.2.3** Developer setup and deployment guide
- [ ] **5.2.4** GitHub OAuth setup instructions

#### **Phase 6: Production Launch Preparation (Week 6)**

**6.1 Production Readiness**

- [ ] **6.1.1** Environment configuration for production
- [ ] **6.1.2** Database migrations and backup strategies
- [ ] **6.1.3** Monitoring and error tracking setup
- [ ] **6.1.4** Performance optimization and caching

**6.2 Launch**

- [ ] **6.2.1** Deploy to production environment
- [ ] **6.2.2** Setup CI/CD pipeline
- [ ] **6.2.3** Configure domain and SSL
- [ ] **6.2.4** Beta user testing and feedback collection

### 🎯 v0 Success Criteria

**Technical Milestones:**

- OAuth-only authentication (GitHub + Google)
- Core CRUD operations for all entities
- Basic sprint planning interface
- GitHub repository integration
- Responsive design for mobile/desktop

**Business Milestones:**

- 10+ beta users successfully onboarded
- Core workflow (create org → create team → create project → manage sprints) functional
- GitHub OAuth permissions working correctly
- Production deployment successful

**User Experience Goals:**

- < 3 minutes to complete initial setup
- Intuitive navigation between organizations/teams
- Clear GitHub integration status
- Mobile-responsive interface

### 🚀 Post-v0 Evolution Path

v0 establishes the foundation for:

- GitHub Issues bidirectional sync (v1.1)
- Advanced team collaboration features (v1.2)
- Real-time updates and notifications (v1.3)
- Analytics and reporting (v1.4)
- Enterprise features and scaling (v2.0)

---
