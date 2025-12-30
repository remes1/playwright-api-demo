# Playwright API Demo

A comprehensive API testing framework built with Playwright for testing REST APIs. This project demonstrates best practices for API testing using Playwright's request context, fixtures, and test structure.

## Features

- **Full API Coverage**: Tests for articles, comments, user authentication, and tags
- **Schema Validation**: JSON schema validation for all API responses
- **Environment Management**: Support for multiple environments (QA, PP)
- **Fixture-Based Setup**: Reusable test fixtures for API controllers and authentication
- **Comprehensive Reporting**: HTML reports and detailed test output
- **TypeScript Support**: Full TypeScript implementation for better development experience

## Technologies Used

- [Playwright](https://playwright.dev/) - API testing framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [AJV](https://ajv.js.org/) - JSON schema validation
- [Faker.js](https://fakerjs.dev/) - Test data generation
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-api-demo
```

2. Install dependencies:
```bash
npm install
```

## Configuration

### Environment Variables

Create environment files for different testing environments:

- `.env.QA` - QA environment configuration
- `.env.PP` - Production-like environment configuration

Example `.env.QA`:
```env
BASE_URL=https://conduit-api.bondaracademy.com/api
USERNAME=remes6
EMAIL=remes6@gmail.com
PASSWORD=Qwerty123!
```

### Playwright Configuration

The `playwright.config.ts` file contains the test configuration:
- Test directory: `./tests`
- Single worker for API tests
- HTML and list reporters
- Trace collection on failure

## Project Structure

```
playwright-api-demo/
├── controllers/           # API controller classes
│   ├── articles-controller.ts
│   ├── comments-controller.ts
│   ├── tags-controller.ts
│   └── user-controller.ts
├── fixtures/              # Test fixtures and setup
│   └── fixtures.ts
├── request-objects/       # Sample request payloads
│   └── POST-article.json
├── response-schemas/      # JSON schemas for validation
│   ├── articles/
│   ├── comments/
│   ├── tags/
│   └── user/
├── tests/                 # Test specifications
│   ├── articles.spec.ts
│   ├── profile.spec.ts
│   ├── registration.spec.ts
│   └── tags.spec.ts
├── utils/                 # Utility functions
│   ├── request-handler.ts
│   └── schema-validator.ts
├── playwright.config.ts   # Playwright configuration
├── package.json           # Project dependencies
└── README.md             # This file
```

## Running Tests

### Run All Tests on QA envinronment
```bash
npx playwright test
```

### Run Tests in Specific Environment
```bash
ENV=QA npx playwright test
ENV=PP npx playwright test
```

### Generate and View HTML Report
```bash
npx playwright show-report
```

## Test Structure

### Fixtures
The project uses Playwright fixtures to provide:
- `api`: Base request handler
- `user`: User authentication controller
- `authToken`: JWT token for authenticated requests
- `articles`: Articles API controller
- `comments`: Comments API controller
- `tags`: Tags API controller

### Controllers
Each controller encapsulates API endpoints:
- **ArticlesController**: CRUD operations for articles
- **CommentsController**: Comment management
- **UserController**: User registration and authentication
- **TagsController**: Tag retrieval

### Schema Validation
All API responses are validated against JSON schemas stored in `response-schemas/` directory using AJV.

## API Under Test

This project tests the https://conduit-api.bondaracademy.com, a real-world API specification for a blogging platform with the following endpoints:

- **Articles**: Create, read, update, delete articles
- **Comments**: Add and manage comments on articles
- **Users**: Registration, login, profile management
- **Tags**: Retrieve available tags
