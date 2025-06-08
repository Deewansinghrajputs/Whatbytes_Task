'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromCart, updateQuantity } from '@/redux/features/cartSlice';
import Image from 'next/image';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleQtyChange = (id: string, qty: number) => {
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <Image src={item.image} alt={item.title} width={80} height={80} />
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-blue-700">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value))}
                  className="w-16 border px-2 py-1 rounded text-center"
                  min={1}
                />
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
