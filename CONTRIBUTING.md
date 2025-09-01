# Contributing to GitSprint

GitSprint is a full-stack TypeScript monorepo that combines a **Remix-based frontend** with a **NestJS backend** following hexagonal architecture principles. We welcome contributions and encourage you to read this guide to understand our development patterns and workflows.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- GitHub account (for OAuth integration)

### Setup Instructions

1. **Fork and Clone**

   ```bash
   git clone https://github.com/your-username/gitsprint.git
   cd gitsprint
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**

   ```bash
   # Copy environment files
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   cp packages/db/.env.example packages/db/.env

   # Configure your database and OAuth credentials
   ```

4. **Database Setup**

   ```bash
   pnpm run prisma:migrate
   pnpm run prisma:seed
   ```

5. **Start Development**

   ```bash
   pnpm dev  # Starts all apps in development mode
   ```

6. **Access Applications**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## 🏗️ Project Architecture

GitSprint follows a **monorepo structure** with clear separation of concerns:

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
- **Backend**: NestJS with hexagonal architecture
- **Frontend**: Remix (full-stack React framework)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth with GitHub/Google OAuth
- **UI**: Radix UI + Tailwind CSS + shadcn/ui components
- **Language**: TypeScript throughout

### Backend Architecture (NestJS + Hexagonal)

The backend follows **hexagonal architecture** (ports and adapters pattern):

```
apps/api/src/modules/[feature]/
├── application/         # Application layer (use cases, DTOs)
├── domain/             # Domain layer (business logic, models)
├── infrastructure/     # Infrastructure layer (database, external APIs)
└── presentation/       # Presentation layer (controllers, REST endpoints)
```

**Key Principles:**

- Domain-driven design with clear boundaries
- Dependency inversion through ports and adapters
- Shared utilities in `packages/api-utils/`

### Frontend Architecture (Remix)

```
apps/web/app/
├── components/         # Reusable UI components
├── routes/            # File-based routing with co-located data loading
├── server/            # Server-side utilities and services
├── types/             # Global type definitions
└── utils/             # Client and shared utilities
```

**Remix Patterns:**

- Co-located data loading with `loader` and `action` functions
- Progressive enhancement and SSR
- File-based routing with nested layouts

## 🛠️ Development Workflow

### Monorepo Commands

```bash
# Root level commands
pnpm dev          # Start all apps in development
pnpm build        # Build all packages and apps
pnpm lint         # Lint entire codebase
pnpm check-types  # TypeScript type checking
pnpm test         # Run all tests

# Package-specific commands
pnpm --filter api dev      # Start only API
pnpm --filter web dev      # Start only web app
pnpm --filter db generate  # Generate Prisma client
```

### Database Operations

```bash
# Generate Prisma client
pnpm run prisma:generate

# Apply migrations
pnpm run prisma:migrate

# Reset database (development only)
pnpm run prisma:reset

# Seed database
pnpm run prisma:seed

# Open Prisma Studio
pnpm run prisma:studio
```

### Package Dependencies

- **Web app depends on**: `@gitsprint/db`
- **API app depends on**: `@gitsprint/api-utils`, `@gitsprint/db`
- **Shared**: Turbo orchestrates build dependencies

## 📝 Code Style & Conventions

### File Naming Conventions

#### Backend (NestJS)

- **Modules**: `feature.module.ts`
- **Controllers**: `feature.controller.ts`
- **Services**: `feature.service.ts`
- **DTOs**: `feature.dto.ts`
- **Entities**: `feature.entity.ts`

#### Frontend (Remix)

- **Routes**: Dot notation for nesting (`dashboard.projects.$id.tsx`)
- **Components**: PascalCase (`UserProfile.tsx`)
- **Utilities**: camelCase with purpose (`data-inject-error.ts`)
- **Server files**: `.server.ts` suffix

### TypeScript Guidelines

- Use **strict mode** throughout the project
- Prefer **interfaces** over types for object shapes
- Use **enums** for constants with semantic meaning
- Implement **proper error handling** with custom error classes
- Follow **clean architecture principles** in backend modules

### Code Quality

- **ESLint**: Follow configured rules for consistency
- **Prettier**: Automatic code formatting
- **TypeScript**: Strict type checking enabled
- **No console.log**: Use structured logging instead
- **Error boundaries**: Implement comprehensive error handling

## 🔐 Security Guidelines

### Authentication & Authorization

- **OAuth Only**: GitHub and Google OAuth integration via Better Auth
- **Role-based Access**: Implement proper RBAC patterns
- **Session Management**: HTTP-only cookies for security
- **API Keys**: Secure API key validation for backend endpoints

### Security Best Practices

- **Environment Variables**: Never commit secrets or API keys
- **Input Validation**: Validate all user inputs with DTOs and schemas
- **CORS Configuration**: Strict origin validation
- **Rate Limiting**: Implement rate limiting for API endpoints
- **SQL Injection**: Use Prisma ORM for safe database queries

### Backend Security (NestJS)

- **Multi-layer Guards**: API key → Rate limiting → Access token → Roles
- **Input Validation**: Class-validator with DTOs
- **Environment Variables**: Joi schema validation
- **CORS**: Strict origin validation

### Frontend Security (Remix)

- **Session Management**: HTTP-only cookies with Better Auth
- **CSRF Protection**: Built-in Remix protections
- **XSS Prevention**: Proper input sanitization and output encoding

## 🧪 Testing & Quality Assurance

### Testing Strategy

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter api test
pnpm --filter web test

# Run tests in watch mode
pnpm test:watch

# Generate coverage reports
pnpm test:coverage
```

### Testing Guidelines

#### Backend Testing (NestJS)

- **Unit Tests**: Test individual services and utilities
- **Integration Tests**: Test API endpoints and database interactions
- **E2E Tests**: Test complete user workflows
- **Test Structure**: Follow AAA pattern (Arrange, Act, Assert)

#### Frontend Testing (Remix)

- **Component Tests**: Test UI components in isolation
- **Integration Tests**: Test routes with loaders and actions
- **E2E Tests**: Test critical user flows
- **Accessibility Tests**: Ensure WCAG compliance

### Quality Standards

- **Test Coverage**: Maintain >80% test coverage
- **Performance**: Page load times <2s, API response times <500ms
- **Security**: Zero critical vulnerabilities
- **Accessibility**: WCAG 2.1 AA compliance

## 🚀 Contributing Guidelines

### Before You Start

1. **Check Issues**: Look for existing issues or create one for discussion
2. **Fork Repository**: Create your own fork for development
3. **Create Branch**: Use descriptive branch names (`feature/user-authentication`, `fix/api-error-handling`)

### Development Process

1. **Setup Environment**: Follow the quick start guide
2. **Write Code**: Follow architecture patterns and conventions
3. **Write Tests**: Include comprehensive test coverage
4. **Run Quality Checks**: Ensure linting, type checking, and tests pass
5. **Test Integration**: Verify your changes work with the entire system

### Pull Request Process

1. **Update Documentation**: Update relevant docs and comments
2. **Add Tests**: Include tests for new functionality
3. **Quality Checks**: Ensure all checks pass
   ```bash
   pnpm lint          # Check code style
   pnpm check-types   # TypeScript validation
   pnpm test          # Run test suite
   pnpm build         # Verify build success
   ```
4. **Create PR**: Write clear description of changes and motivation
5. **Code Review**: Address feedback and iterate

### Commit Message Guidelines

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:

- `feat(auth): add GitHub OAuth integration`
- `fix(api): resolve database connection timeout`
- `docs(readme): update setup instructions`

## 🌟 Key Architecture Benefits

1. **Separation of Concerns**: Hexagonal architecture in backend, clear layer boundaries
2. **Type Safety**: End-to-end TypeScript with shared types
3. **Code Reuse**: Shared packages reduce duplication
4. **Scalability**: Independent deployments, modular structure
5. **Developer Experience**: Hot reload, type checking, unified tooling
6. **Testing**: Isolated layers enable comprehensive testing strategies

## 📞 Getting Help

- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Documentation**: Check `agents.md` for detailed architecture information
- **Code Examples**: Review existing code for patterns and conventions

## 📄 Environment Variables

### Shared Configuration

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/gitsprint
DIRECT_URL=postgresql://user:password@localhost:5432/gitsprint

# Authentication (Better Auth)
BETTER_AUTH_SECRET=your-secret-key
```

### Backend Specific

```bash
# API Configuration
PORT=3000
APP_KEY=your-api-key

# GitHub Integration
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Frontend Specific

```bash
# App URLs
APP_BASE_URL=http://localhost:5173
API_BASE_URL=http://localhost:3000

# OAuth
BETTER_AUTH_GOOGLE_ID=your-google-client-id
BETTER_AUTH_GOOGLE_SECRET=your-google-client-secret

# Payment Integration
POLAR_ACCESS_TOKEN=your-polar-access-token
```

---

Thank you for contributing to GitSprint! Your contributions help build a better development experience for Agile teams worldwide. 🚀
