import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronRight, 
  Home as HomeIcon, 
  Grid, 
  ClipboardList, 
  HelpCircle, 
  ShoppingBag,
  Info
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('cart');
  const [userLocation] = useState('B-14, Greenview Apts, Bangalore');
  const [cartItems, setCartItems] = useState([]);

  const itemTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const taxes = cartItems.length > 0 ? Math.round(itemTotal * 0.05) : 0;
  const finalTotal = itemTotal + deliveryFee + taxes;

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans relative shadow-2xl pb-36 select-none">
      
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center overflow-hidden active:scale-95 transition-transform">
            <User className="w-5 h-5 text-amber-800" />
          </button>
          <div className="leading-tight">
            <h1 className="text-xl font-black text-emerald-800 tracking-tight leading-none">
              Kacha
            </h1>
            <h1 className="text-xl font-black text-amber-600 tracking-tight leading-none">
              Bazaar
            </h1>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('cart')}
          className="relative p-2 rounded-full hover:bg-slate-50 transition-colors active:scale-95"
        >
          <ShoppingCart className="w-6 h-6 text-emerald-800" />
          {cartItems.length > 0 && (
            <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          )}
        </button>
      </header>

      <div className="bg-emerald-50/80 px-4 py-2 border-b border-emerald-100/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 truncate mr-2">
          <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="truncate">Delivering to: <strong className="text-slate-900">{userLocation}</strong></span>
        </div>
        <button className="text-emerald-700 font-bold hover:underline shrink-0 text-[11px]">
          (Change)
        </button>
      </div>

      <main className="flex-1 px-3 py-3 space-y-3">
        
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-extrabold text-slate-900">Your Cart</h2>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
          </span>
        </div>

        {cartItems.length > 0 ? (
          <div className="space-y-2.5">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex items-center gap-3">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded-xl bg-slate-50 border border-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-xs text-slate-900 truncate">{item.name}</h3>
                  <span className="inline-block bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-md mt-0.5">
                    {item.tag || 'Fresh & Organic'}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-sm font-black text-slate-900">₹{item.price}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{item.unit}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-emerald-50 border border-emerald-200/60 rounded-xl px-1.5 py-1 gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold active:scale-90 transition-transform"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-black text-slate-900 min-w-[12px] text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold active:scale-90 transition-transform"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors active:scale-90"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs text-center flex flex-col items-center justify-center my-2">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
              <ShoppingBag className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">Your cart is empty</h3>
            <p className="text-slate-400 text-xs max-w-xs mb-5 leading-relaxed">
              Looks like you haven't added anything to your cart yet. Browse categories to start shopping!
            </p>
            <button 
              onClick={() => setActiveTab('home')}
              className="px-5 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-800 transition-all active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        )}

        <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-3.5 relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100/80 text-emerald-800 rounded-xl mt-0.5">
                <HomeIcon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-700" /> Delivery Address
                </span>
                <p className="text-xs font-extrabold text-slate-900 mt-0.5">{userLocation}</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-white border border-emerald-600 text-emerald-700 text-xs font-extrabold rounded-lg hover:bg-emerald-50 transition-colors shadow-2xs">
              Change
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4 text-emerald-700" /> Bill Details
            </h3>
            <span className="text-[10px] text-emerald-700 font-bold hover:underline cursor-pointer">View Details ▾</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Item Total</span>
              <span className="font-bold text-slate-800">₹{itemTotal}</span>
            </div>
            <div className="flex justify-between text-slate-600 items-center">
              <span className="flex items-center gap-1">
                Delivery Fee <Info className="w-3 h-3 text-slate-400" />
              </span>
              <span className="font-bold text-slate-800">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Taxes & Charges (GST)</span>
              <span className="font-bold text-slate-800">₹{taxes}</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 flex justify-between items-center bg-emerald-50/50 -mx-4 -mb-4 px-4 py-3 rounded-b-2xl">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Final Total Amount</span>
              <span className="text-base font-black text-emerald-800">₹{finalTotal}</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
              Inclusive of all taxes
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-extrabold text-slate-900">Add More Products</h3>
            <button 
              onClick={() => setActiveTab('home')}
              className="text-[11px] font-bold text-emerald-700 flex items-center hover:underline"
            >
              View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 text-center border-dashed">
            <p className="text-slate-400 text-xs font-medium">No additional products available at the moment.</p>
          </div>
        </div>

      </main>

      <div className="fixed bottom-[56px] left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-30 shadow-lg">
        <button 
          disabled={cartItems.length === 0}
          className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 ${
            cartItems.length > 0 
              ? 'bg-emerald-800 text-white hover:bg-emerald-900 cursor-pointer' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Proceed to Checkout</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 z-40 px-3 py-2">
        <div className="flex items-center justify-around">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('category')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'category' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px]">Category</span>
          </button>

          <button 
            onClick={() => setActiveTab('cart')}
            className={`flex flex-col items-center gap-1 relative transition-colors ${activeTab === 'cart' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 right-2 bg-emerald-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
            <span className="text-[10px]">Cart</span>
          </button>

          <button 
            onClick={() => setActiveTab('order')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'order' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-[10px]">Order</span>
          </button>

          <button 
            onClick={() => setActiveTab('help')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'help' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-[10px]">Help</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
