```react
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Home as HomeIcon, 
  Grid, 
  ShoppingCart, 
  ClipboardList, 
  HelpCircle,
  X,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('category'); // 'home', 'category', 'cart', 'order', 'help'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  // Category List Matching Design
  const categories = [
    { 
      id: 'veg_fruits', 
      name: 'Vegetables & Fruits', 
      icon: '🥦🍎', 
      bg: 'bg-rose-100', 
      border: 'border-rose-200' 
    },
    { 
      id: 'meat_seafood', 
      name: 'Fresh Meat & Seafood', 
      icon: '🍗🐟', 
      bg: 'bg-pink-100', 
      border: 'border-pink-200' 
    },
    { 
      id: 'dairy_eggs', 
      name: 'Dairy & Eggs', 
      icon: '🥛🧀', 
      bg: 'bg-sky-100', 
      border: 'border-sky-200' 
    },
    { 
      id: 'bakery_biscuits', 
      name: 'Bakery & Biscuits', 
      icon: '🥐🍪', 
      bg: 'bg-amber-100', 
      border: 'border-amber-200' 
    },
    { 
      id: 'snacks_munchies', 
      name: 'Snacks & Munchies', 
      icon: '🍿🥨', 
      bg: 'bg-orange-100', 
      border: 'border-orange-200' 
    },
    { 
      id: 'cold_drinks', 
      name: 'Cold Drinks & Juices', 
      icon: '🥤🧃', 
      bg: 'bg-emerald-100', 
      border: 'border-emerald-200' 
    },
    { 
      id: 'atta_rice_dals', 
      name: 'Atta, Rice & Dals', 
      icon: '🌾🍚', 
      bg: 'bg-stone-100', 
      border: 'border-stone-200' 
    },
    { 
      id: 'masalas_oils', 
      name: 'Masalas & Oils', 
      icon: '🌶️🛢️', 
      bg: 'bg-yellow-100', 
      border: 'border-yellow-200' 
    },
    { 
      id: 'personal_care', 
      name: 'Personal Care', 
      icon: '🧴🧼', 
      bg: 'bg-cyan-100', 
      border: 'border-cyan-200' 
    },
    { 
      id: 'household', 
      name: 'Household Essentials', 
      icon: '🧹🧻', 
      bg: 'bg-teal-100', 
      border: 'border-teal-200' 
    },
  ];

  // Strictly empty product list
  const products = [];

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative shadow-2xl pb-20 select-none">
      
      {/* Top Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (selectedCategory) {
                setSelectedCategory(null);
              } else {
                setActiveTab('home');
              }
            }}
            className="p-1 rounded-full hover:bg-slate-100 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-emerald-800 tracking-tight">
            {selectedCategory ? selectedCategory.name : 'All Categories'}
          </h1>
        </div>

        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)} 
          className="p-1 rounded-full hover:bg-slate-100 transition-colors active:scale-95"
        >
          {isSearchOpen ? <X className="w-6 h-6 text-slate-600" /> : <Search className="w-6 h-6 text-slate-800" />}
        </button>
      </header>

      {/* Expandable Search Input */}
      {isSearchOpen && (
        <div className="bg-white px-4 py-2 border-b border-slate-100 transition-all">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-xs py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {selectedCategory ? (
        /* Selected Category View (Empty State) */
        <main className="flex-1 bg-white p-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 text-3xl mb-4">
            <ShoppingBag className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-slate-800 font-bold text-base mb-1">No products available yet</h3>
          <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
            There are currently no products under <span className="font-semibold text-slate-600">{selectedCategory.name}</span>. Products added by admin will appear here automatically.
          </p>
          <button 
            onClick={() => setSelectedCategory(null)} 
            className="mt-6 px-5 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-800 transition-all active:scale-95"
          >
            Back to All Categories
          </button>
        </main>
      ) : (
        /* Main Category Grid View */
        <main className="flex-1 px-4 py-3 space-y-4">
          
          {/* Top Promotional Banner */}
          <div className="w-full bg-gradient-to-r from-emerald-100 via-green-100 to-lime-100 border border-emerald-200/70 rounded-2xl p-3.5 flex items-center justify-between shadow-xs relative overflow-hidden">
            <div className="z-10">
              <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider bg-white/70 px-2 py-0.5 rounded-full">
                Explore All
              </span>
              <h2 className="text-sm font-black text-slate-800 mt-1 tracking-wide">
                DISCOVER OUR FULL RANGE
              </h2>
            </div>
            <div className="text-3xl z-10">🥗🧺</div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-200/40 rounded-full blur-sm"></div>
          </div>

          {/* 2-Column Categories Grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`${cat.bg} border ${cat.border} rounded-2xl p-4 flex flex-col items-center justify-between text-center min-h-[140px] shadow-xs hover:shadow-md active:scale-95 transition-all group relative overflow-hidden`}
              >
                {/* Visual Icon Header */}
                <div className="text-4xl my-auto transform group-hover:scale-110 transition-transform duration-200">
                  {cat.icon}
                </div>

                {/* Title */}
                <span className="font-extrabold text-xs text-slate-800 leading-tight w-full mt-2">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-xs font-semibold">No categories found matching "{searchQuery}"</p>
            </div>
          )}

        </main>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 z-40 px-3 py-2">
        <div className="flex items-center justify-around">
          
          <button 
            onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button 
            onClick={() => { setActiveTab('category'); setSelectedCategory(null); }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'category' ? 'text-emerald-700 font-bold' : 'text-slate-500'
            }`}
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px]">Category</span>
          </button>

          <button 
            onClick={() => setActiveTab('cart')}
            className={`flex flex-col items-center gap-1 relative transition-colors ${
              activeTab === 'cart' ? 'text-emerald-700 font-bold' : 'text-slate-500'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 right-2 bg-emerald-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
            <span className="text-[10px]">Cart</span>
          </button>

          <button 
            onClick={() => setActiveTab('order')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'order' ? 'text-emerald-700 font-bold' : 'text-slate-500'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span className="text-[10px]">Order</span>
          </button>

          <button 
            onClick={() => setActiveTab('help')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'help' ? 'text-emerald-700 font-bold' : 'text-slate-500'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-[10px]">Help</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
```
