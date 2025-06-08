'use client';

import products from '@/data/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { addToCart } from '@/redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'; 

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) return notFound();

 const dispatch = useDispatch();
if (something) {
  dispatch(doSomething());
}

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success('Added to cart successfully!'); // ✅ show toast
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg p-6 rounded-lg">
        {/* Image Section */}
        <div className="w-full">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-auto object-contain rounded-lg border"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-blue-700 text-2xl font-semibold">${product.price}</p>

          <p className="text-gray-600">{product.description || 'No description available.'}</p>

          <div>
            <span className="text-sm text-gray-500">Category:</span>
            <span className="ml-2 font-medium text-gray-700">{product.category}</span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
