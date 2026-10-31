import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  User, 
  ChevronRight, 
  ShoppingBag, 
  Grid, 
  Home as HomeIcon, 
  ClipboardList, 
  HelpCircle, 
  ShoppingCart, 
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewAllSection, setViewAllSection] = useState(null);
  
  const [locationName, setLocationName] = useState('Detecting location...');
  const [isLocating, setIsLocating] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const categories = [
    { id: 'veggies', name: 'Vegetables', icon: '🥦', bg: 'bg-green-100' },
    { id: 'fruits', name: 'Fruits', icon: '🍎', bg: 'bg-orange-100' },
    { id: 'dairy', name: 'Dairy', icon: '🥛', bg: 'bg-blue-100' },
    { id: 'meat', name: 'Meat', icon: '🍗', bg: 'bg-red-100' },
    { id: 'snacks', name: 'Snacks', icon: '🍿', bg: 'bg-amber-100' },
    { id: 'beverages', name: 'Beverages', icon: '🥤', bg: 'bg-emerald-100' },
    { id: 'staples', name: 'Staples', icon: '🌾', bg: 'bg-yellow-100' },
    { id: 'personal', name: 'Personal Care', icon: '🧴', bg: 'bg-cyan-100' },
  ];

  const products = [];

  useEffect(() => {
    handleDetectLocation();
  }, []);

  const handleDetectLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          setLocationName('Current Location Detected');
        },
        (error) => {
          setIsLocating(false);
          setLocationName('Select Location');
        }
      );
    } else {
      setIsLocating(false);
      setLocationName('Select Location');
    }
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative shadow-2xl pb-20 select-none">
      
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-4 pt-3 pb-2 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setIsProfileOpen(true)} 
              className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-200 flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-sm"
              title="Open Profile"
            >
              <User className="w-6 h-6 text-orange-600" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-xl font-black tracking-tight leading-none text-emerald-700">Kacha</span>
                <span className="text-xl font-black tracking-tight leading-none text-amber-600">Bazaar</span>
              </div>
              
              <button 
                onClick={handleDetectLocation}
                className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-1 hover:text-emerald-700 transition-colors"
              >
                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                <span className="truncate max-w-[120px]">
                  {isLocating ? 'Locating...' : locationName}
                </span>
                {isLocating && <RefreshCw className="w-2.5 h-2.5 animate-spin text-slate-400" />}
              </button>
            </div>
          </div>

          <button 
            onClick={() => setIsLoginOpen(true)}
            className="px-4 py-1.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shadow-xs"
          >
            Login/Register
          </button>
        </div>

        <div className="mt-3 relative">
          <input 
            type="text" 
            placeholder='"Search for fresh products, veggies, or groceries..."' 
            className="w-full bg-slate-100 text-slate-700 text-xs py-2.5 pl-4 pr-10 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all placeholder:text-slate-400 placeholder:italic"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-600">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </header>

      {selectedCategory || viewAllSection ? (
        <main className="flex-1 bg-white p-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-full flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <button 
              onClick={() => { setSelectedCategory(null); setViewAllSection(null); }}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1 text-slate-600 text-sm font-semibold"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <h2 className="text-base font-bold text-slate-800 capitalize">
              {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : viewAllSection}
            </h2>
            <div className="w-8"></div>
          </div>

          {products.filter(p => selectedCategory ? p.category === selectedCategory : true).length > 0 ? (
            <div className="grid grid-cols-2 gap-3 w-full">
              {products.filter(p => selectedCategory ? p.category === selectedCategory : true).map(product => (
                <div key={product.id} className="border border-slate-200 rounded-2xl p-3 text-left relative bg-white shadow-xs">
                  <div className="h-24 bg-slate-50 rounded-xl flex items-center justify-center text-4xl mb-2">
                    {product.image}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-800 line-clamp-2">{product.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm text-slate-900">₹{product.price}</span>
                    <button 
                      onClick={addToCart}
                      className="px-2.5 py-1 text-xs bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                      +ADD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="my-auto py-12 flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 text-3xl mb-4">
                🛒
              </div>
              <h3 className="text-slate-700 font-bold text-base mb-1">No products uploaded yet</h3>
              <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
                Products added by admin in this category will appear here. Check back later!
              </p>
            </div>
          )}
        </main>
      ) : (
        <main className="flex-1 px-4 py-3 space-y-5">

          <section className="space-y-2">
            <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-1">
              <div className="shrink-0 w-64 bg-gradient-to-r from-emerald-100 to-green-50 p-3.5 rounded-2xl border border-emerald-200/60 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full">Offer</span>
                  <h3 className="font-black text-slate-800 text-sm mt-1 leading-tight">GET 50% OFF</h3>
                  <p className="text-[11px] text-slate-600 font-medium">on your First Order!</p>
                </div>
                <button className="mt-3 w-fit text-[10px] font-bold bg-emerald-700 text-white px-3 py-1 rounded-md shadow-xs active:scale-95">
                  SHOP NOW
                </button>
                <span className="absolute right-2 bottom-1 text-4xl opacity-80">🍅</span>
              </div>

              <div className="shrink-0 w-64 bg-gradient-to-r from-sky-100 to-blue-50 p-3.5 rounded-2xl border border-sky-200/60 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-200/60 px-2 py-0.5 rounded-full">Flash Sale</span>
                  <h3 className="font-black text-slate-800 text-sm mt-1 leading-tight">FLASH SALE:</h3>
                  <p className="text-[11px] text-slate-600 font-medium">Fresh Vegetables!</p>
                </div>
                <button className="mt-3 w-fit text-[10px] font-bold bg-sky-700 text-white px-3 py-1 rounded-md shadow-xs active:scale-95">
                  SHOP NOW
                </button>
                <span className="absolute right-2 bottom-1 text-4xl opacity-80">🥦</span>
              </div>

              <div className="shrink-0 w-64 bg-gradient-to-r from-lime-100 to-emerald-50 p-3.5 rounded-2xl border border-lime-200/60 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-lime-800 bg-lime-200/60 px-2 py-0.5 rounded-full">Weekend</span>
                  <h3 className="font-black text-slate-800 text-sm mt-1 leading-tight">WEEKEND DEALS:</h3>
                  <p className="text-[11px] text-slate-600 font-medium">Best Grocery Offers!</p>
                </div>
                <button className="mt-3 w-fit text-[10px] font-bold bg-emerald-800 text-white px-3 py-1 rounded-md shadow-xs active:scale-95">
                  SHOP NOW
                </button>
                <span className="absolute right-2 bottom-1 text-4xl opacity-80">🧺</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-1.5 pt-1">
              <div className="w-5 h-1.5 bg-emerald-600 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
            </div>
          </section>

          <section className="pt-2">
            <h2 className="text-base font-bold text-slate-900 mb-3">Shop by Categories</h2>
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex flex-col items-center text-center group focus:outline-none"
                >
                  <div className={`w-16 h-16 ${cat.bg} rounded-2xl flex items-center justify-center text-2xl shadow-xs group-active:scale-95 transition-all border border-black/5`}>
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 mt-1.5 leading-tight">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {[
            { id: 'fresh_today', title: 'Fresh Today' },
            { id: 'featured', title: 'Featured Products' },
            { id: 'bestseller', title: 'Best Sellers' },
            { id: 'seasonal', title: 'Seasonal Specials' }
          ].map((sec) => {
            const sectionProducts = products.filter(p => p.section === sec.id);
            return (
              <section key={sec.id} className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-slate-900">{sec.title}</h2>
                  <button 
                    onClick={() => setViewAllSection(sec.title)}
                    className="text-xs font-semibold text-slate-500 hover:text-emerald-700 flex items-center gap-0.5 active:scale-95"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {sectionProducts.length > 0 ? (
                  <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                    {sectionProducts.map((product) => (
                      <div key={product.id} className="shrink-0 w-36 border border-slate-200 rounded-2xl p-2.5 bg-white shadow-xs relative">
                        <div className="h-24 bg-slate-50 rounded-xl flex items-center justify-center text-3xl mb-2">
                          {product.image}
                        </div>
                        <h4 className="font-semibold text-xs text-slate-800 line-clamp-2 h-8">{product.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="font-bold text-xs text-slate-900">₹{product.price}</span>
                            {product.oldPrice && (
                              <span className="text-[10px] text-slate-400 line-through ml-1">₹{product.oldPrice}</span>
                            )}
                          </div>
                          <button 
                            onClick={addToCart}
                            className="px-2 py-1 text-[10px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-300 rounded-lg hover:bg-emerald-600 hover:text-white active:scale-95 transition-all"
                          >
                            +ADD
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center">
                    <p className="text-slate-400 text-xs italic">
                      No products available in {sec.title} yet. Admin uploaded products will show here.
                    </p>
                  </div>
                )}
              </section>
            );
          })}

          <section className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-900">All Products</h2>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {products.map((product) => (
                  <div key={product.id} className="border border-slate-200 rounded-2xl p-3 bg-white shadow-xs relative">
                    <div className="h-28 bg-slate-50 rounded-xl flex items-center justify-center text-4xl mb-2">
                      {product.image}
                    </div>
                    <h4 className="font-semibold text-xs text-slate-800 line-clamp-2">{product.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-xs text-slate-900">₹{product.price}</span>
                      <button 
                        onClick={addToCart}
                        className="px-2.5 py-1 text-xs bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 active:scale-95 transition-all"
                      >
                        +ADD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-sm text-slate-700">No Products Available</h3>
                <p className="text-slate-400 text-xs mt-1 max-w-xs">
                  Products added by admin will appear here in the infinite scroll feed.
                </p>
              </div>
            )}
          </section>

        </main>
      )}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 z-40 px-3 py-2">
        <div className="flex items-center justify-around">
          
          <button 
            onClick={() => { setActiveTab('home'); setSelectedCategory(null); setViewAllSection(null); }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home' && !selectedCategory && !viewAllSection ? 'text-emerald-700 font-bold' : 'text-slate-500'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('category')}
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

      {isProfileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-base">User Profile</h3>
              <button onClick={() => setIsProfileOpen(false)} className="text-slate-400 text-lg font-bold">✕</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">
                U
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Guest User</h4>
                <p className="text-xs text-slate-400">Welcome to Kacha Bazaar</p>
              </div>
            </div>
            <button 
              onClick={() => { setIsProfileOpen(false); setIsLoginOpen(true); }}
              className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition-all"
            >
              Login to Account
            </button>
          </div>
        </div>
      )}

      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-base">Login / Register</h3>
              <button onClick={() => setIsLoginOpen(false)} className="text-slate-400 text-lg font-bold">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Phone Number</label>
                <input type="text" placeholder="+91 Enter Phone Number" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
