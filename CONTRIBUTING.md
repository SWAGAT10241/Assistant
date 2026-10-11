# Contributing to Virtual Assistant

Thank you for your interest in contributing! This document details how to set up your local development environment, adhere to coding standards, and submit pull requests.

---

## Code of Conduct

Please treat everyone with respect and empathy. We are committed to fostering a welcoming and collaborative open-source community.

---

## Development Setup

### 1. Fork & Clone
```bash
git clone https://github.com/SWAGAT10241/Assistant.git
cd Assistant
```

### 2. Backend Setup
```bash
cd backend
pnpm install # or npm install
cp .env.example .env
# Edit .env with your local MongoDB, JWT, and Cloudinary keys
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
pnpm install # or npm install
cp .env.example .env
npm run dev
```

---

## Commit Guidelines

This project enforces the **Conventional Commits** specification. Pull requests with non-compliant commit formats or titles will be blocked by our CI workflow (`pr-health.yml`).

### Commit Format
```
<type>(<scope>): <short description>
```

### Allowed Types
- `feat`: A new feature or capability
- `fix`: A bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect code logic (formatting, white-space)
- `docs`: Documentation only changes
- `test`: Adding or correcting tests
- `perf`: Code changes that improve performance
- `chore`: Maintenance tasks, dependency updates, configuration tweaks
- `ci`: CI/CD workflow updates

### Examples
- `feat(speech): add speech synthesis voice selection`
- `fix(auth): resolve cookie expiration bug on logout`
- `refactor(backend): decouple gemini logic into ai.service.js`
- `docs: update deployment guidelines in README`

---

## Code Quality Standards

Before submitting a Pull Request, verify that all checks pass locally:

### Frontend
```bash
cd frontend
pnpm run lint   # Must pass with 0 errors and 0 warnings
pnpm run build  # Must build production bundle cleanly
```

### Backend
```bash
cd backend
pnpm test       # Syntax & unit test verification
```

---

## Submitting a Pull Request

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Commit your changes adhering to conventional commits.
3. Push your branch to GitHub:
   ```bash
   git push origin feat/your-feature-name
   ```
4. Open a Pull Request targeting `main`. Fill out the provided PR template thoroughly.
5. Ensure all automated CI checks (ESLint, build, matrix tests, CodeQL, and secret scans) turn green.
