# Lotto Number Generator Project Blueprint

## Overview
A modern, visually appealing Lotto Number Generator built with vanilla HTML, CSS, and JavaScript. This application provides a clean and interactive utility for generating lottery numbers.

## Features
- **Dynamic Number Generation**: Generates 6 unique numbers between 1 and 45.
- **Visual Lotto Balls**: Uses custom elements to render lotto balls with colors corresponding to their number ranges (standard Korean Lotto scheme).
- **History Tracking**: Saves previous generation results in a list.
- **Theme Toggle**: Support for both Dark and Light modes with persistent user preference.
- **Responsive Design**: Adapts to various screen sizes using modern CSS techniques.
- **Premium UI**: Incorporates glassmorphism, subtle textures, and animated effects.

## Design Specifications
- **Typography**: Expressive fonts for a modern look (Pretendard).
- **Colors**: Vibrant `oklch` color palette for the balls and a premium dark/light theme options.
- **Interactivity**: Hover effects on balls, smooth animations during generation.

## Implementation Plan
1.  **Update index.html**: Replace current structure with a container for the lotto generator.
2.  **Update style.css**: Implement modern styling with CSS variables, layers, and container queries.
3.  **Update main.js**:
    - Implement `LottoBall` Web Component.
    - Add logic for unique number generation and sorting.
    - Add history management.
4.  **Add Theme Toggle**:
    - Implemented `[data-theme="light"]` variables in CSS.
    - Added toggle button and script logic with `localStorage` persistence.
5.  **Git Deployment**: Commit and push the changes to the remote repository. (Note: git command currently unavailable in environment).
