# Project Blueprint: Life Orchestrator AI

## 1. Overview

This project is a web application that acts as a personal AI assistant called "Orchestra." It helps users manage different aspects of their lives, which are categorized into "roles" (e.g., The Mother, The CEO, Self Care). The application provides a central dashboard to view a daily briefing, track autonomous actions taken by the AI, and dive into detailed views for each role.

The application is built as a single-page application (SPA) using modern, framework-less web technologies:

*   **Structure:** A central `life-orchestrator` Web Component manages the entire application's state and rendering.
*   **Styling:** Tailwind CSS is used for a utility-first styling approach, consistent with the provided design.
*   **Icons:** The Lucide icon library is used for all iconography.
*   **Interactivity:** Vanilla JavaScript (ES Modules) handles all state management, event handling, and DOM updates.

## 2. Implemented Features & Design

### Core Architecture
*   **Web Component:** A single `<life-orchestrator>` custom element encapsulates the entire application.
*   **State Management:** A state object within the Web Component manages the current view (`step`), user selections, and modal visibility.
*   **Routing:** A `render()` method checks the `step` in the state and calls the appropriate rendering function for the current view (e.g., `renderLanding()`, `renderDashboard()`).
*   **Event Handling:** Event listeners are attached to interactive elements, which call methods to update the state and re-render the component.

### Visual Design & Layout
*   **Font:** A modern sans-serif font is used, with a serif font for display headings (`font-serif`).
*   **Color Palette:** The primary color is Indigo (`indigo-600`), with a supporting palette of Slate gray for text and backgrounds. Emerald and Rose are used for success and alert states.
*   **Spacing & Rounded Corners:** Generous padding (`p-6`, `p-8`) and heavily rounded corners (`rounded-2xl`, `rounded-[2.5rem]`) create a soft, modern aesthetic.
*   **Shadows:** Drop shadows (`shadow-lg`, `shadow-xl`) are used to create depth and lift interactive elements.
*   **Background:** The main background is a very light off-white (`#FDFCFE`) with a subtle noise texture.
*   **Icons:** Lucide icons are used throughout to enhance understanding and visual appeal.

### Implemented Views
*   **Landing Page:** A hero section introducing the app.
*   **Login Page:** Mock login flow with social and email options.
*   **Gender/Persona Selection:** A simple selection screen.
*   **Role Definition:** A multi-select grid for defining life roles, including a modal for adding custom roles.
*   **Dashboard:** The main hub, showing a smart summary, autonomous actions, and an agent cross-talk log.
*   **Sub-Pages:** Detailed views for:
    *   Ava's Schedule
    *   VN Staff Logs
    *   Parents' Health
    *   Individual Health & Fitness
*   **Pricing Page:** A three-tiered subscription plan layout.
*   **Modals:** Modals for adding a custom role and syncing with Apple Health.

## 3. Plan for Current Request

The user wants to convert a React-based design into a framework-less web application.

**Action Plan:**
1.  **[COMPLETED]** **Create `blueprint.md`:** Document the project architecture, features, and the plan.
2.  **Update `index.html`:**
    *   Set up the main HTML document structure.
    *   Include a `<script>` tag for the Lucide icon library.
    *   Add the `<life-orchestrator></life-orchestrator>` custom element to the body.
    *   Link the `main.js` file as a module.
    *   Link the compiled Tailwind CSS file (`output.css`).
3.  **Update `main.js`:**
    *   Create the `LifeOrchestrator` class extending `HTMLElement`.
    *   Define the initial `state` object, mirroring the one from the React example.
    *   Create the main `render()` method that selects which view to display based on `this.state.step`.
    *   Implement separate render methods for each view (`renderLanding`, `renderLogin`, `renderRoles`, `renderDashboard`, etc.).
    *   Translate the JSX from the React component into HTML template strings.
    *   Set up event listeners (`addEventListeners`) to handle clicks on buttons and interactive elements.
    *   Create handler methods (`handleSetStep`, `handleToggleRole`, etc.) to update the state and trigger re-renders.
    *   Use `lucide.createIcons()` after each render to draw the icons.
4.  **Update CSS & Build Process:**
    *   Ensure `tailwind.config.js` is configured to scan `.js` and `.html` files for classes.
    *   Run the Tailwind CSS build command to process `input.css` and generate `output.css`.
