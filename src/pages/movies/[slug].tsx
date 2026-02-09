import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import SeoHead from '@/components/SeoHead';
import { fetchMovieBySlug } from '@/lib/api';
import { Movie } from '@/types';

interface MoviePageProps {
    movie: Movie | null;
}

export default function MoviePage({ movie }: MoviePageProps) {
    const router = useRouter();

    if (!movie) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Home
                    </button>
                </div>
            </Layout>
        );
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Movie',
        name: movie.title,
        description: movie.description,
        image: movie.poster,
        datePublished: movie.releaseYear.toString(),
        director: {
            '@type': 'Person',
            name: movie.director,
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: movie.rating.toString(),
            bestRating: '10',
            ratingCount: '1000', // Mock count
        },
        genre: movie.genres,
    };

    return (
        <Layout>
            <SeoHead
                title={movie.title}
                description={movie.description.substring(0, 160)}
                image={movie.poster}
                type="video.movie"
            />
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>

            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0 w-full md:w-1/3">
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={movie.poster}
                                alt={movie.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                            />
                        </div>
                    </div>

                    <div className="flex-grow">
                        <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{movie.releaseYear}</span>
                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{movie.duration}</span>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">★ {movie.rating}</span>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Overview</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {movie.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Genres</h3>
                                <p className="text-gray-600 dark:text-gray-400">{movie.genres.join(', ')}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Director</h3>
                                <p className="text-gray-600 dark:text-gray-400">{movie.director}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string;
    const movie = await fetchMovieBySlug(slug);

    if (!movie) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            movie,
        },
    };
};
