'use client';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import products from '@/data/products';

export default function HomePage() {
  const searchParams = useSearchParams();

  // 🔍 Extract filters from URL
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const selectedCategories = searchParams.get('category')?.split(',') || [];
  const selectedBrands = searchParams.get('brand')?.split(',') || [];
  const maxPrice = Number(searchParams.get('price')) || 1000;

  // 🔍 Apply filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery);
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with filters */}
        <Sidebar />

        {/* Product grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg mt-10">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
