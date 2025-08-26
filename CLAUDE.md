# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Wordle Unlimited website - a static site optimized for AdSense revenue and SEO performance. The site allows unlimited gameplay of the popular word puzzle game without daily restrictions.

## Architecture

- **Static Site**: Pure HTML/CSS/JavaScript with no build process required
- **Deployment**: Configured for Netlify deployment with headers, redirects, and caching rules
- **Monetization**: Google AdSense integration with strategic ad placements
- **Analytics**: Fathom Analytics integration for privacy-focused tracking
- **Game Logic**: JavaScript-based Wordle implementation in the browser
- **Word Lists**: Two text files containing valid words and answer words

## Key Files

- `index.html`: Main game page with SEO optimization and game container
- `styles.css`: Mobile-first responsive CSS styling
- `adsense-config.js`: AdSense configuration and management (needs publisher ID and slot IDs)
- `netlify.toml`: Deployment configuration with security headers and caching rules
- `wordle-answers-alphabetical.txt`: List of possible answer words
- `wordle-word-list.txt`: Complete valid word list for validation

## Common Development Tasks

### Testing Locally
```bash
# Open index.html directly in a browser or use a simple HTTP server
python -m http.server 8000
# or
npx http-server
```

### Deploying to Netlify
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Update site"
git push origin main
# Netlify will auto-deploy from GitHub
```

## AdSense Configuration

The site uses AdSense with publisher ID `ca-pub-6011234789952502`. To configure:
1. Update slot IDs in `adsense-config.js` after creating ad units in AdSense dashboard
2. Ad placements: Top banner, sidebar, and bottom banner

## Important Notes

- No build step required - this is a static site
- Service worker (`sw.js`) handles offline functionality
- Site configured for school/work network accessibility ("unblocked" version)
- Includes multiple HTML pages: blog, daily tips, privacy, terms, and ad test pages