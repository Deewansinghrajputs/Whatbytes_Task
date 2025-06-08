'use client';

import { ShoppingCart, UserRound } from 'lucide-react';
import Link from 'next/link';
import {  useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SearchBar from './SearchBar';

const Header = () => {

  const router = useRouter(); // ✅ add this
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Properly handle search
  const onSearch = (query: string) => {
    const encodedQuery = encodeURIComponent(query.trim());
    router.push(`/?search=${encodedQuery}`);
  };

  return (
    <header className="bg-blue-800 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="w-full flex items-center justify-between flex-nowrap gap-2 overflow-x-auto">

        {/* Logo */}
        <Link href="/" className="text-lg font-bold whitespace-nowrap">
          Whatbytes
        </Link>

        {/* Searchbar */}
        <SearchBar onSearch={onSearch} /> {/* ✅ use implemented function */}

        {/* Cart + Profile */}
        <div className="flex items-center space-x-4 whitespace-nowrap">
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
          <button>
            <UserRound size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
