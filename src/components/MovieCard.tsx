import Image from 'next/image';
import Link from 'next/link';
import { Content } from '@/types';

interface MovieCardProps {
    item: Content;
    priority?: boolean;
}

export default function MovieCard({ item, priority = false }: MovieCardProps) {
    const href = item.type === 'movie' ? `/movies/${item.slug}` : `/series/${item.slug}`;

    return (
        <Link href={href} className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative aspect-[2/3] w-full overflow-hidden">
                <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    priority={priority}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                    {item.rating.toFixed(1)}
                </div>
            </div>
            <div className="p-4">
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">
                    {item.type} &bull; {item.releaseYear}
                </div>
                <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {item.description}
                </p>
            </div>
        </Link>
    );
}
