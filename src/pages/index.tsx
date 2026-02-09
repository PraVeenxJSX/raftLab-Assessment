import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import MovieCard from '@/components/MovieCard';
import SeoHead from '@/components/SeoHead';
import { fetchAllContent } from '@/lib/api';
import { Content } from '@/types';

interface HomeProps {
  content: Content[];
}

import Head from 'next/head';

export default function Home({ content }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Home | RaftLabs Movies</title>
      </Head>
      <SeoHead
        title="Home"
        description="Discover the best Movies and TV Series. Browse our curated collection of top-rated entertainment."
      />

      <section>
        <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Trending Now</h1>

        {content.length === 0 ? (
          <p className="text-center text-gray-500">No content available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {content.map((item, index) => (
              <MovieCard key={item.id} item={item} priority={index < 8} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = await fetchAllContent();

  return {
    props: {
      content,
    },
  };
};
