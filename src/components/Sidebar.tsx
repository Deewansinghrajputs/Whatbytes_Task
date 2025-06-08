'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = ['Electronics', 'Clothing', 'Home'];
const brands = ['Apple', 'Nike', 'Sony'];
const maxPrice = 1000;

const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategoriesFromURL = searchParams.get('category')?.split(',') || [];
  const selectedBrandsFromURL = searchParams.get('brand')?.split(',') || [];
  const selectedPriceFromURL = Number(searchParams.get('price')) || maxPrice;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(selectedCategoriesFromURL);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(selectedBrandsFromURL);
  const [price, setPrice] = useState(selectedPriceFromURL);

  // 🔄 Update URL when filters change
useEffect(() => {
  const params = new URLSearchParams();

  if (selectedCategories.length > 0) {
    params.set('category', selectedCategories.join(','));
  }

  if (selectedBrands.length > 0) {
    params.set('brand', selectedBrands.join(','));
  }

  if (price !== maxPrice) {
    params.set('price', price.toString());
  }

  router.replace(`/?${params.toString()}`);
}, [selectedCategories, selectedBrands, price, router]); 


  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <aside className="w-full md:w-64 bg-blue-800 text-white p-4 rounded-md shadow-md h-screen md:sticky md:top-17 ">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Category</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="block capitalize">
              <input
                type="checkbox"
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="mr-2 accent-blue-600"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Price Slider with background */}
      <div className="mb-6 bg-blue-700 p-3 rounded-md">
        <h3 className="font-medium mb-2">Price</h3>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm mt-1 text-white font-medium">Up to: ₹{price}</p>
      </div>

      {/* Brand Filter WITHOUT background and bigger heading */}
      <div className="mb-6 p-0 bg-transparent">
        <h3 className="font-bold text-2xl mb-2 text-white">Brand</h3>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="block capitalize">
              <input
                type="checkbox"
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="mr-2 accent-blue-600"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

