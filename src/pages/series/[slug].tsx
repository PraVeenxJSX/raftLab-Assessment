import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import SeoHead from '@/components/SeoHead';
import { fetchSeriesBySlug } from '@/lib/api';
import { TVSeries } from '@/types';

interface SeriesPageProps {
    series: TVSeries | null;
}

export default function SeriesPage({ series }: SeriesPageProps) {
    const router = useRouter();

    if (!series) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <h1 className="text-2xl font-bold mb-4">Series Not Found</h1>
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

    const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : 'http://localhost:3000';
    const fullImageUrl = `${siteUrl}${series.poster}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TVSeries',
        name: series.title,
        description: series.description,
        image: fullImageUrl,
        datePublished: series.releaseYear.toString(),
        creator: {
            '@type': 'Person',
            name: series.creator,
        },
        numberOfSeasons: series.seasons.toString(),
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: series.rating.toString(),
            bestRating: '10',
            ratingCount: '500', // Mock count
        },
        genre: series.genres,
    };

    return (
        <Layout>
            <SeoHead
                title={series.title}
                description={series.description.substring(0, 160)}
                image={series.poster}
                type="video.tv_show"
            />
            <Head>
                <title>{`${series.title} | RaftLabs Movies`}</title>
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
                                src={series.poster}
                                alt={series.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
                            />
                        </div>
                    </div>

                    <div className="flex-grow">
                        <h1 className="text-4xl font-bold mb-2">{series.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{series.releaseYear}</span>
                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{series.seasons} Seasons</span>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">★ {series.rating}</span>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Overview</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {series.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Genres</h3>
                                <p className="text-gray-600 dark:text-gray-400">{series.genres.join(', ')}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Creator</h3>
                                <p className="text-gray-600 dark:text-gray-400">{series.creator}</p>
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
    const series = await fetchSeriesBySlug(slug);

    if (!series) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            series,
        },
    };
};
