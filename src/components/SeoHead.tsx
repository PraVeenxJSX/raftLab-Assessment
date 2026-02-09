import Head from 'next/head';
import { useRouter } from 'next/router';

interface SeoHeadProps {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article' | 'video.movie' | 'video.tv_show';
}

export default function SeoHead({ title, description, image, type = 'website' }: SeoHeadProps) {
    const router = useRouter();
    const siteUrl = 'https://raftlabs-movies-demo.vercel.app'; // Replace with actual domain
    const fullUrl = `${siteUrl}${router.asPath}`;
    const fullImage = image || `${siteUrl}/default-og.jpg`; // Ensure this fallback exists or use a remote one

    return (
        <Head>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="RaftLabs Movies" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:type" content={type} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
        </Head>
    );
}
