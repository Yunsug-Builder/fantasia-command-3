# Fantasia Command - Blueprint

## 1. Project Overview

**Fantasia Command** is a real-time AI prompt strategy battle web game. Users engage in strategic battles by crafting effective prompts for their AI companions.

## 2. Initial Architecture Plan

This document outlines the initial setup for the project, including folder structure, Firebase integration, and basic routing.

### 2.1. Folder Structure
- **/src/components/**: For reusable UI components.
- **/src/pages/**: For top-level page components.
- **/src/services/**: For external service integrations (e.g., Firebase).
- **/src/utils/**: For utility functions and business logic (e.g., combat logic).

### 2.2. Technology Stack & Key Libraries
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: `react-router-dom`
- **Backend as a Service (BaaS)**: Firebase (Authentication, Firestore)

### 2.3. Feature Implementation Plan (Initial)
- **Firebase Setup**: Initialize Firebase Auth and Firestore.
- **Routing**: Set up three main routes:
    - `/`: Lobby page for matchmaking.
    - `/battle`: The main battle screen.
    - `/grimoire`: A bestiary/compendium for game elements.
- **Component Placeholders**: Create basic placeholder components for each page.
