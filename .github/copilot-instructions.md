# Copilot Instructions for React + Vite App

This is a modern frontend application built with React 19, TypeScript, and Vite.

## Project Overview

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with Rolldown support
- **Styling**: CSS Modules ready
- **Linting**: ESLint with React plugin
- **Development**: Hot Module Replacement (HMR) enabled

## Getting Started

### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:5173`

### Building
```bash
npm run build
```
Compiles TypeScript and bundles the application for production

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality

### Preview
```bash
npm run preview
```
Preview the production build locally

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── main.tsx         # Entry point
└── vite-env.d.ts    # Vite type definitions
public/              # Static assets
index.html           # HTML template
vite.config.ts       # Vite configuration
tsconfig.json        # TypeScript configuration
```

## Development Tips

- Use React Hooks and functional components
- Type everything with TypeScript
- Hot Module Replacement works automatically
- ESLint will catch common mistakes
- Check browser console for HMR updates

## Customization

To customize the ESLint configuration, edit `eslint.config.js` for strict type checking or to add more React-specific rules.

For Vite configuration changes, modify `vite.config.ts`.
