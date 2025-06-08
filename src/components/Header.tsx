'use client';

import { ShoppingCart, UserRound, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') || '';
  const [query, setQuery] = useState(initialQuery);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    router.replace(`/?${params.toString()}`);
  }, 400);

  return () => clearTimeout(delayDebounce);
}, [query, router, searchParams]); 


  return (
    <header className="bg-blue-800 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="w-full flex items-center justify-between flex-nowrap gap-2 overflow-x-auto">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-bold whitespace-nowrap">
          Whatbytes
        </Link>

        {/* Searchbar - visible only on home */}
        {pathname === '/' && (
          <div className="flex items-center bg-white text-black px-3 py-2 rounded-md flex-grow max-w-[400px] min-w-[150px] mx-2">
            <Search className="text-gray-400 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>
        )}

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
