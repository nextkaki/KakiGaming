import Link from 'next/link';
import Image from 'next/image';

interface GameCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

export default function GameCard({ title, description, imageSrc, href }: GameCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
        <div className="relative h-48">
          <Image 
            src={imageSrc} 
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
