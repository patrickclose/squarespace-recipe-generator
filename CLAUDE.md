# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Squarespace Recipe Generator - a web application that helps users create professional, formatted recipe blocks for Squarespace websites. The app generates HTML/CSS code with advanced features like unit conversion (US/Metric), scaling, and multiple recipe templates.

## Development Commands

**Development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Architecture

This is a vanilla JavaScript frontend application built with Vite as the build tool. The architecture follows a simple pattern:

- **index.html**: Single HTML file containing the complete application UI with inline CSS
- **main.js**: Legacy JavaScript file (appears unused - main logic is in index.html script tag)
- **style.css**: Legacy CSS file (appears unused - styles are inline in index.html)
- **backup.html**: Backup of previous version

### Key Features Implementation

1. **Recipe Form Management**: Dynamic ingredient/instruction list management with add/remove functionality
2. **Code Generation**: Converts form data into formatted HTML/CSS blocks for Squarespace
3. **Unit Conversion**: Real-time conversion between US and Metric units using fraction parsing
4. **Recipe Scaling**: Multiplier system (1x, 1.5x, 2x, 3x, 4x) that scales ingredients and cooking times
5. **Template System**: Multiple visual templates for recipe display

### Core Functions (in index.html)

- `generateCode()`: Main function that builds the complete HTML/CSS output
- `parseAndScaleIngredient()`: Handles ingredient quantity scaling with fraction support
- `usToMetric()`: Converts US measurements to metric equivalents
- `parseFraction()`: Safely parses fractional quantities without eval()
- `addItem()` / `removeItem()`: Dynamic list management for ingredients/instructions

### Recipe Scaling Logic

The application uses realistic culinary scaling:
- **Ingredients**: Scale linearly with serving size (2x servings = 2x ingredients)
- **Prep Time**: Scales moderately with 30% increase per scale factor (more ingredients to prep)
- **Cook Time**: Remains constant (same oven temperature and cooking duration regardless of batch size)
- **Servings**: Scale linearly with multiplier

## Important Notes

- The application uses inline styles and scripts to create self-contained Squarespace code blocks
- Fraction parsing uses a safe whitelist approach (no eval() for security)
- Generated code includes CSS-only toggles for units and scaling (no JavaScript dependencies)
- Temperature conversion rounds to nearest 5°C for practical cooking temperatures
- All generated HTML is escaped to prevent XSS vulnerabilities

## File Structure

- All application logic is contained within `index.html` 
- `main.js` and `style.css` appear to be legacy files from an earlier version
- The app is designed to run as a single self-contained HTML file