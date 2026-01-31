# Contributing to Documentation Portal

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

Please be respectful and considerate of others. We aim to maintain a welcoming environment.

## How to Contribute

### Reporting Bugs

- Check if the bug has already been reported
- Include clear reproduction steps
- Provide environment details (Node version, browser, OS)
- Include screenshots if applicable

### Suggesting Features

- Explain the use case and benefits
- Consider backward compatibility
- Provide examples if possible

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Submit a pull request

## Development Setup

```bash
npm install
npm run dev
```

## Code Style

- Use JSX for React components
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Add data-testid attributes for testable elements

## Testing

Before submitting:

- Test all language variants (en, es, fr, de)
- Verify dark mode works correctly
- Check responsive design on mobile
- Ensure ISR revalidation works

## Commit Message Guidelines

Use conventional commits format:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process or auxiliary tool changes

## Documentation

- Update README.md for major changes
- Add JSDoc comments for complex functions
- Include examples in documentation

Thank you for contributing!
