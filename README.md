# RaftLabs Movies App

A Next.js application for browsing movies and TV series, featuring a modern UI with Tailwind CSS v4 and comprehensive SEO implementation.

## 🚀 How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app will be available at [http://localhost:3000](http://localhost:3000).

3.  **Build for Production**:
    ```bash
    npm run build
    npm run start
    ```

## 🛠️ Tech Stack & Features

-   **Framework**: Next.js 16 (Pages Router)
-   **Styling**: Tailwind CSS v4
-   **Language**: TypeScript
-   **Deployment**: Render.com

## 📊 Data Sources

The application uses local JSON data to simulate a backend:

-   `src/data/movies.json`: Contains movie data (Inception, Interstellar, The Dark Knight, etc.).
-   `src/data/series.json`: Contains TV series data (Breaking Bad, Game of Thrones, etc.).
-   **Images**: All media assets are served locally from `public/images/`.

## 🔍 SEO Implementation

The project implements SEO best practices using a reusable `SeoHead` component:

-   **Meta Tags**: Unique title and description for every page.
-   **Open Graph (OG)**: Optimized for social sharing (Facebook, LinkedIn, etc.) with dynamic images and descriptions.
-   **Twitter Cards**: Large summary cards for Twitter sharing.
-   **Structured Data (JSON-LD)**:
    -   `Movie` schema for movie detail pages.
    -   `TVSeries` schema for series detail pages.
-   **Semantic HTML**: Proper use of `<header>`, `<main>`, `<section>`, and `<h1>` tags.
