# Game CV - Interactive Portfolio

An interactive portfolio built with React, TypeScript, Vite, Three.js, and Tailwind CSS.

## Features

- Interactive 3D map with job locations
- Visual novel-style storytelling
- Job matching functionality
- Responsive design with Tailwind CSS
- React Three Fiber for 3D graphics

## CI/CD Setup

This project uses GitHub Actions for Continuous Integration (CI) and Vercel for Continuous Deployment (CD).

### Continuous Integration (CI)

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push to `main`, `master`, and `develop` branches, and on pull requests. It performs:

1. **Code checkout**
2. **Node.js setup** (version 20)
3. **Dependency installation** using `npm ci`
4. **Linting** with ESLint
5. **Type checking** with TypeScript
6. **Build** with Vite

### Continuous Deployment (CD)

Vercel is configured for automatic deployments:

1. **Automatic deployment** from the `main` branch
2. **Preview deployments** for pull requests
3. **Configuration** in `vercel.json`

### Deployment Workflow

The deployment workflow (`.github/workflows/deploy-vercel.yml`) triggers after successful CI runs and deploys to Vercel.

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:4000
```

For Vercel deployment, set these environment variables in the Vercel project settings.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/           # API functions
├── components/    # React components
├── data/         # Static data
├── navigation/    # Navigation logic
├── pages/        # Page components
└── routes/       # Routing configuration
```

## Technologies

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Three.js** + **React Three Fiber** for 3D
- **React Router** for navigation
- **Framer Motion** for animations
- **GitHub Actions** for CI
- **Vercel** for deployment

## License

MIT
