import { PRODUCTS } from '@/data/products';
import { locales } from '@/i18n';

// 为静态导出生成所有产品 slug 和 locale 的组合
export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  
  for (const locale of locales) {
    for (const product of PRODUCTS) {
      params.push({
        locale,
        slug: product.slug,
      });
    }
  }
  
  return params;
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

