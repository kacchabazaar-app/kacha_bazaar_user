
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  User, 
  ChevronRight, 
  ShoppingCart, 
  Grid, 
  Home as HomeIcon, 
  ClipboardList, 
  HelpCircle, 
  ArrowLeft 
} from 'lucide-react';
import Account from './Account';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [locationName, setLocationName] = useState('India');
  const [isLocating, setIsLocating] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [banners, setBanners] = useState([
    { id: 1, title: 'GET 50% OFF', desc: 'on your First Order!', badge: 'Offer', bg: 'from-emerald-100 to-green-50', border: 'border-emerald-200', badgeColor: 'text-emerald-800 bg-emerald-200/60', btnColor: 'bg-emerald-700', emoji: '🍅' },
    { id: 2, title: 'FLASH SALE:', desc: 'Fresh Vegetables!', badge: 'Flash Sale', bg: 'from-sky-100 to-blue-50', border: 'border-sky-200', badgeColor: 'text-sky-800 bg-sky-200/60', btnColor: 'bg-sky-700', emoji: '🥦' }
  ]);

  const [categories, setCategories] = useState([
    { id: 'veggies', name: 'Vegetables', icon: '🥦', bg: 'bg-emerald-100' },
    { id: 'fruits', name: 'Fruits', icon: '🍎', bg: 'bg-amber-100' },
    { id: 'dairy', name: 'Dairy', icon: '🥛', bg: 'bg-sky-100' },
    { id: 'meat', name: 'Meat', icon: '🍗', bg: 'bg-rose-100' },
    { id: 'snacks', name: 'Snacks', icon: '🍿', bg: 'bg-orange-100' },
    { id: 'beverages', name: 'Beverages', icon: '🥤', bg: 'bg-teal-100' },
    { id: 'staples', name: 'Staples', icon: '🌾', bg: 'bg-yellow-100' },
    { id: 'personal', name: 'Personal Care', icon: '🧴', bg: 'bg-cyan-100' },
  ]);

  const [sectionsData, setSectionsData] = useState({
    freshToday: [
      { id: 'f1', name: 'Fresh Organic Tomatoes (1kg)', price: '85', oldPrice: '95', image: '🍅' },
      { id: 'f2', name: 'Fresh Green Spinach (500g)', price: '30', oldPrice: '40', image: '🥬' }
    ],
    featuredProducts: [
      { id: 'ep1', name: 'Fresh Farm Milk (1L)', price: '60', oldPrice: '', image: '🥛' },
      { id: 'ep2', name: 'Organic Basmati Rice (5kg)', price: '360', oldPrice: '399', image: '🌾' }
    ],
    bestSellers: [
      { id: 'b1', name: 'Crispy Potato Chips', price: '80', oldPrice: '', image: '🍿' }
    ],
    seasonalSpecials: [
      { id: 's1', name: 'Juicy Mangoes (1kg)', price: '150', oldPrice: '180', image: '🥭' }
    ],
    allProducts: [
      { id: 1, name: 'Premium Red Tomatoes (1kg)', price: '85', oldPrice: '95', image: '🍅' },
      { id: 2, name: 'Fresh Farm Milk (1L)', price: '60', oldPrice: '', image: '🥛' },
      { id: 3, name: 'Organic Basmati Rice (5kg)', price: '360', oldPrice: '399', image: '🌾' },
      { id: 4, name: 'Crispy Potato Chips', price: '80', oldPrice: '', image: '🍿' },
      { id: 5, name: 'Fresh Apples (1kg)', price: '120', oldPrice: '150', image: '🍎' },
      { id: 6, name: 'Fresh Chicken Breast (500g)', price: '140', oldPrice: '160', image: '🍗' },
      { id: 7, name: 'Juicy Mangoes (1kg)', price: '150', oldPrice: '180', image: '🥭' },
      { id: 8, name: 'Green Spinach (500g)', price: '30', oldPrice: '40', image: '🥬' }
    ]
  });

  useEffect(() => {
    handleDetectLocation();
  }, []);

  const handleDetectLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsLocating(false);
          setLocationName('India');
        },
        () => {
          setIsLocating(false);
          setLocationName('India');
        }
      );
    } else {
      setIsLocating(false);
      setLocationName('India');
    }
  };

  if (activeTab === 'account') {
    return <Account />;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F4F5F7] text-slate-800 flex flex-col font-sans relative shadow-2xl pb-24 select-none">
      
      <header 
        className="sticky top-0 z-35 relative bg-cover bg-center border-b border-slate-200/80 shadow-sm pb-4 pt-1" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(244, 245, 247, 0.93), rgba(244, 245, 247, 0.96)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80')` 
        }}
      >
        <div className="px-4 pt-3 pb-2 space-y-3">
          
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setActiveTab('account')} 
                className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-200 flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0"
              >
                <User className="w-6 h-6 text-orange-600" />
              </button>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  <span className="text-xl font-black tracking-tight leading-none text-emerald-800">Kacha</span>
                  <span className="text-xl font-black tracking-tight leading-none text-amber-600">Bazaar</span>
                </div>
                
                <button className="flex items-center gap-1 text-xs text-slate-600 font-bold mt-1 text-left">
                  <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                  <span className="truncate max-w-[120px]">{locationName}</span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-800 hover:bg-slate-50 active:scale-95 transition-all shadow-xs"
            >
              Login/Register
            </button>
          </div>

          <div className="relative pt-1">
            <input 
              type="text" 
              placeholder="Search for fresh products, veggies, or groceries..." 
              className="w-full bg-white/95 text-slate-800 text-xs py-3 pl-4 pr-10 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs transition-all placeholder:text-slate-400 placeholder:italic"
            />
            <button className="absolute right-3 top-1/2 translate-y-0.5 text-slate-500 hover:text-emerald-600">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {banners.length > 0 && (
            <div className="pt-2">
              <div className={`w-full bg-gradient-to-r ${banners[currentSlide].bg} p-4 rounded-3xl border ${banners[currentSlide].border} relative overflow-hidden flex items-center justify-between shadow-xs transition-all duration-300`}>
                <div className="space-y-1.5">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${banners[currentSlide].badgeColor} px-2.5 py-0.5 rounded-full`}>
                    {banners[currentSlide].badge}
                  </span>
                  <h3 className="font-black text-slate-900 text-base leading-tight">{banners[currentSlide].title}</h3>
                  <p className="text-xs text-slate-600 font-semibold">{banners[currentSlide].desc}</p>
                  <button className={`mt-2 text-[11px] font-bold ${banners[currentSlide].btnColor} text-white px-3.5 py-1.5 rounded-xl shadow-xs active:scale-95`}>
                    SHOP NOW
                  </button>
                </div>
                <span className="text-5xl opacity-90 pr-2">{banners[currentSlide].emoji}</span>
              </div>

              <div className="flex justify-center items-center gap-1.5 pt-3">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-5 bg-emerald-600' : 'w-1.5 bg-slate-300'}`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </header>

      {selectedCategory ? (
        <main className="flex-1 bg-[#F4F5F7] p-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-full flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="p-2 rounded-full hover:bg-slate-200 transition-colors flex items-center gap-1 text-slate-700 text-sm font-semibold"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <h2 className="text-base font-bold text-slate-900 capitalize">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="w-8"></div>
          </div>
          <div className="my-auto py-12 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-300 text-3xl mb-4 shadow-xs">
              🛒
            </div>
            <h3 className="text-slate-800 font-bold text-base mb-1">No products uploaded yet</h3>
            <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
              Products added by admin in this category will appear here. Check back later!
            </p>
          </div>
        </main>
      ) : (
        <main className="flex-1 px-4 py-4 space-y-6">

          <section>
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

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Fresh Today</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {sectionsData.freshToday.map((product) => (
                <div key={product.id} className="shrink-0 w-36 border border-slate-200/80 rounded-2xl p-2.5 bg-white shadow-xs relative">
                  <div className="h-24 bg-slate-50 rounded-xl flex items-center justify-center text-3xl mb-2">
                    {product.image}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-800 line-clamp-2 h-8">{product.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-xs text-slate-900">₹{product.price}</span>
                    <button onClick={() => setCartCount(prev => prev + 1)} className="px-2 py-1 text-[10px] bg-emerald-600 text-white font-bold rounded-lg active:scale-95">
                      +ADD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Featured Products</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {sectionsData.featuredProducts.map((product) => (
                <div key={product.id} className="shrink-0 w-36 border border-slate-200/80 rounded-2xl p-2.5 bg-white shadow-xs relative">
                  <div className="h-24 bg-slate-50 rounded-xl flex items-center justify-center text-3xl mb-2">
                    {product.image}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-800 line-clamp-2 h-8">{product.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-xs text-slate-900">₹{product.price}</span>
                    <button onClick={() => setCartCount(prev => prev + 1)} className="px-2 py-1 text-[10px] bg-emerald-600 text-white font-bold rounded-lg active:scale-95">
                      +ADD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Best Sellers</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {sectionsData.bestSellers.map((product) => (
                <div key={product.id} className="shrink-0 w-36 border border-slate-200/80 rounded-2xl p-2.5 bg-white shadow-xs relative">
                  <div className="h-24 bg-slate-50 rounded-xl flex items-center justify-center text-3xl mb-2">
                    {product.image}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-800 line-clamp-2 h-8">{product.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-xs text-slate-900">₹{product.price}</span>
                    <button onClick={() => setCartCount(prev => prev + 1)} className="px-2 py-1 text-[10px] bg-emerald-600 text-white font-bold rounded-lg active:scale-95">
                      +ADD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Seasonal Specials</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {sectionsData.seasonalSpecials.map((product) => (
                <div key={product.id} className="shrink-0 w-36 border border-slate-200/80 rounded-2xl p-2.5 bg-white shadow-xs relative">
                  <div className="h-24 bg-slate-50 rounded-xl flex items-center justify-center text-3xl mb-2">
                    {product.image}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-800 line-clamp-2 h-8">{product.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-xs text-slate-900">₹{product.price}</span>
                    <button onClick={() => setCartCount(prev => prev + 1)} className="px-2 py-1 text-[10px] bg-emerald-600 text-white font-bold rounded-lg active:scale-95">
                      +ADD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">All Products</h2>
              <span className="text-[11px] text-slate-500 font-medium">Infinite Feed</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {sectionsData.allProducts.map((product) => (
                <div key={product.id} className="border border-slate-200/80 rounded-2xl p-3 bg-white shadow-xs relative flex flex-col justify-between">
                  <div>
                    <div className="h-28 bg-slate-50 rounded-xl flex items-center justify-center text-4xl mb-2">
                      {product.image}
                    </div>
                    <h4 className="font-semibold text-xs text-slate-800 line-clamp-2">{product.name}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="font-bold text-xs text-slate-900">₹{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-slate-400 line-through ml-1">₹{product.oldPrice}</span>
                      )}
                    </div>
                    <button 
                      onClick={() => setCartCount(prev => prev + 1)}
                      className="px-2.5 py-1 text-xs bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-xs"
                    >
                      +ADD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      )}

      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 z-40 px-3 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          
          <button 
            onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' && !selectedCategory ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
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
            {cartCount > 0 && (
              <span className="absolute -top-1 right-2 bg-emerald-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
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
