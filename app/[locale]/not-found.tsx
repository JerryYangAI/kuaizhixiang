import Link from 'next/link';

export default function NotFound({
  params,
}: {
  params?: { locale?: string };
} = {}) {
  const locale = params?.locale || 'zh';
  
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link
        href={`/${locale}`}
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}

