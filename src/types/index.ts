export interface ContentItem {
    id: number;
    slug: string;
    title: string;
    description: string;
    releaseYear: number;
    rating: number; // 0-10
    genres: string[];
    poster: string; // Changed from posterUrl
    type: 'movie' | 'series';
}

export interface Movie extends ContentItem {
    type: 'movie';
    director: string;
    duration: string; // Changed from durationMinutes (number)
}

export interface TVSeries extends ContentItem {
    type: 'series';
    seasons: number;
    creator: string;
    // episodes removed as it's not in the JSON
}

export type Content = Movie | TVSeries;
