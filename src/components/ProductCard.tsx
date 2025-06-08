'use client';

import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import toast from 'react-hot-toast';

interface ProductProps {
  id: string;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

const ProductCard = ({ id, title, price, image}: ProductProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, image,quantity: 1 }));
        toast.success('Added to cart successfully!');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all flex flex-col">
      <Link href={`/product/${id}`}>
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="object-contain w-full h-48 mx-auto"
        />
        <h3 className="mt-4 font-semibold text-lg text-gray-800">{title}</h3>
        <p className="text-blue-700 font-bold mt-2 text-md">${price}</p>
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-auto flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all"
      >
        <ShoppingCart className="mr-2" size={18} />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;