import moviesData from '@/data/movies.json';
import seriesData from '@/data/series.json';
import { Movie, TVSeries, Content } from '@/types';

// Cast imported JSON to typed arrays
const movies: Movie[] = (moviesData as any[]).map(m => ({ ...m, type: 'movie' }));
const series: TVSeries[] = (seriesData as any[]).map(s => ({ ...s, type: 'series' }));
const allContent: Content[] = [...movies, ...series];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAllContent = async (): Promise<Content[]> => {
    await delay(100);
    return allContent;
};

export const fetchMovies = async (): Promise<Movie[]> => {
    await delay(100);
    return movies;
};

export const fetchSeries = async (): Promise<TVSeries[]> => {
    await delay(100);
    return series;
};

export const fetchContentBySlug = async (slug: string): Promise<Content | null> => {
    await delay(100);
    const item = allContent.find((c) => c.slug === slug);
    return item || null;
};

export const fetchMovieBySlug = async (slug: string): Promise<Movie | null> => {
    await delay(100);
    const item = movies.find((m) => m.slug === slug);
    return item || null;
};

export const fetchSeriesBySlug = async (slug: string): Promise<TVSeries | null> => {
    await delay(100);
    const item = series.find((s) => s.slug === slug);
    return item || null;
};
