```react
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  User, 
  ShoppingBag, 
  Gift, 
  Heart, 
  Wallet, 
  ChevronRight, 
  Award, 
  MapPin, 
  CreditCard, 
  UserCheck, 
  MessageSquare, 
  Sparkles, 
  Info, 
  LogOut,
  Home as HomeIcon, 
  Grid, 
  ShoppingCart, 
  ClipboardList, 
  HelpCircle 
} from 'lucide-react';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('profile'); // 'home', 'category', 'cart', 'order', 'help', 'profile'
  const [cartCount] = useState(3);

  // Profile data states - Default Clean (No dummy non-zero balances)
  const [availableBalance] = useState(0);
  const [savedAddressesCount] = useState(0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative shadow-2xl select-none">
      
      {/* Scrollable Container covering screen */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-none">

        {/* Store Background Banner with Overlay Profile Avatar */}
        <div className="relative bg-slate-900 pt-6 pb-8 px-4 text-center overflow-hidden">
          {/* Supermarket Store Background Image with Blur */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 blur-xs"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=800')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-50/90" />

          {/* Top Header Back Button & Title */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-white/60 flex items-center justify-center text-slate-800 active:scale-95 transition-transform">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-slate-900 tracking-tight drop-shadow-xs">
              Account
            </h1>
            <div className="w-9 h-9" /> {/* Spacer */}
          </div>

          {/* Centered User Avatar */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md overflow-hidden flex items-center justify-center mb-2">
              {/* Default Avatar Illustration */}
              <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                <User className="w-14 h-14 text-slate-700 mt-2" />
              </div>
            </div>
            
            <button className="text-slate-900 font-extrabold text-sm underline decoration-2 underline-offset-4 hover:text-emerald-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-4 space-y-4 -mt-2 relative z-10">

          {/* 3 Top Feature Buttons Row */}
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 shadow-xs hover:border-emerald-500 transition-all active:scale-95">
              <ShoppingBag className="w-6 h-6 text-slate-800" />
              <span className="text-xs font-black text-slate-800 text-center leading-tight">
                Your<br />Orders
              </span>
            </button>

            <button className="bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 shadow-xs hover:border-emerald-500 transition-all active:scale-95">
              <Gift className="w-6 h-6 text-slate-800" />
              <span className="text-xs font-black text-slate-800 text-center leading-tight">
                Kacha<br />Cash
              </span>
            </button>

            <button className="bg-white border border-slate-200/80 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 shadow-xs hover:border-emerald-500 transition-all active:scale-95">
              <Heart className="w-6 h-6 text-slate-800" />
              <span className="text-xs font-black text-slate-800 text-center leading-tight">
                Your<br />Wishlist
              </span>
            </button>
          </div>

          {/* Kacha Cash & Gift Card Container */}
          <div className="bg-purple-50/90 border border-purple-200/70 rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-sm font-black text-slate-900">
                  Kacha Cash & Gift Card
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-xs font-semibold text-slate-600">Available Balance </span>
                <span className="text-sm font-black text-slate-900">₹{availableBalance}</span>
              </div>

              <button className="bg-white border border-slate-300 text-slate-800 font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-xs hover:bg-slate-50 active:scale-95 transition-all">
                Add Balance
              </button>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="space-y-2">
            <h2 className="text-sm font-black text-slate-900 tracking-wide px-1">
              Profile Information
            </h2>

            <div className="bg-white border border-slate-200/80 rounded-2xl divide-y divide-slate-100 shadow-xs overflow-hidden">
              
              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors active:bg-slate-100 text-left">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-slate-800" />
                  <span className="text-xs font-extrabold text-slate-800">Rewards & Earn</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors active:bg-slate-100 text-left">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-800" />
                  <div>
                    <div className="text-xs font-extrabold text-slate-800">Saved Addresses</div>
                    <div className="text-[10px] font-medium text-slate-400">{savedAddressesCount} Addresses</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors active:bg-slate-100 text-left">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-slate-800" />
                  <span className="text-xs font-extrabold text-slate-800">Payments</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors active:bg-slate-100 text-left">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-slate-800" />
                  <span className="text-xs font-extrabold text-slate-800">Profile Details</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

            </div>
          </div>

          {/* More Options Section */}
          <div className="space-y-2">
            <h2 className="text-sm font-black text-slate-900 tracking-wide px-1">
              More Options
            </h2>

            <div className="bg-white border border-slate-200/80 rounded-2xl divide-y divide-slate-100 shadow-xs overflow-hidden">
              
              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors active:bg-slate-100 text-left">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-slate-800" />
                  <span className="text-xs font-extrabold text-slate-800">Help & Support</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors active:bg-slate-100 text-left">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-slate-800" />
                  <span className="text-xs font-extrabold text-slate-800">Suggest Products</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors active:bg-slate-100 text-left">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-slate-800" />
                  <span className="text-xs font-extrabold text-slate-800">General Info</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

            </div>
          </div>

          {/* Log Out Button */}
          <button className="w-full py-3.5 bg-white border border-slate-300 text-slate-900 font-black text-xs rounded-2xl shadow-xs hover:bg-red-50 hover:text-red-600 hover:border-red-200 active:scale-95 transition-all flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />
            Log Out
          </button>

        </div>

      </div>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 z-40 px-3 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500'
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
              <span className="absolute -top-1 right-2 bg-emerald-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
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
