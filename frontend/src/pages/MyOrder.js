```react
import React, { useState } from 'react';
import { 
  User, 
  Clock, 
  MapPin, 
  ChevronRight, 
  RotateCcw, 
  FileText, 
  Package, 
  Home as HomeIcon, 
  Grid, 
  ShoppingCart, 
  ClipboardList, 
  HelpCircle,
  Truck
} from 'lucide-react';

export default function App() {
  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('order'); // 'home', 'category', 'cart', 'order', 'help'
  const [cartCount] = useState(3);

  // Initialize with EMPTY array by default (Strictly no demo orders unless populated by backend/user)
  const [orders, setOrders] = useState([]);

  // Separate current active orders and past completed orders
  const currentOrders = orders.filter(o => o.status === 'In Progress' || o.status === 'Processing');
  const pastOrders = orders.filter(o => o.status.startsWith('Delivered') || o.status === 'Cancelled');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans relative shadow-2xl pb-24 select-none">
      
      {/* Top Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <button className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center overflow-hidden active:scale-95 transition-transform">
          <User className="w-5 h-5 text-amber-800" />
        </button>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">
          My Orders
        </h1>
        <div className="w-9 h-9" /> {/* Balancing placeholder */}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-4 space-y-5">
        
        {orders.length === 0 ? (
          /* Empty Orders State */
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs text-center flex flex-col items-center justify-center my-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-base mb-1">No Orders Yet!</h2>
            <p className="text-slate-400 text-xs max-w-xs mb-6 leading-relaxed">
              You haven't placed any grocery orders yet. Start exploring fresh items from Kacha Bazaar!
            </p>
            <button 
              onClick={() => setActiveTab('home')}
              className="px-6 py-3 bg-emerald-800 text-white font-black text-xs rounded-2xl shadow-md hover:bg-emerald-900 transition-all active:scale-95"
            >
              Start Shopping Now
            </button>
          </div>
        ) : (
          <>
            {/* Current Orders Section */}
            {currentOrders.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-black text-slate-900 tracking-wide">
                  Current Orders
                </h2>
                {currentOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-3xl p-4 shadow-sm space-y-3"
                  >
                    {/* Header line */}
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 text-sm">
                        Order #{order.id}
                      </span>
                      <span className="bg-amber-100 text-amber-800 text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        {order.status}
                      </span>
                    </div>

                    {/* Address & Estimated Time */}
                    <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <p className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="truncate">Delivery to: <strong>{order.address}</strong></span>
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Estimated Delivery: <strong className="text-slate-900">{order.estimatedTime}</strong></span>
                      </p>
                    </div>

                    {/* Item Thumbnails List */}
                    <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/60 p-1 shrink-0 flex items-center justify-center">
                          <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                        </div>
                      ))}
                    </div>

                    {/* Amount & Actions */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Amount</span>
                        <span className="text-base font-black text-slate-900">₹{order.totalAmount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          Track Order
                        </button>
                        <button className="px-3.5 py-2 bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors active:scale-95">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Past Orders Section */}
            {pastOrders.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-black text-slate-900 tracking-wide">
                  Past Orders
                </h2>
                {pastOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-3xl p-4 shadow-sm space-y-3"
                  >
                    {/* Header line */}
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 text-sm">
                        Order #{order.id}
                      </span>
                      <span className="text-slate-600 text-xs font-bold">
                        {order.status}
                      </span>
                    </div>

                    {/* Address & Date */}
                    <div className="space-y-0.5 text-xs text-slate-500">
                      <p className="truncate">Delivery to: {order.address}</p>
                      <p className="font-medium text-slate-700">{order.date}</p>
                    </div>

                    {/* Thumbnails & Reorder Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 overflow-x-auto max-w-[60%] scrollbar-none">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 p-1 shrink-0 flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-base font-black text-slate-900">₹{order.totalAmount}</span>
                        <button className="px-4 py-1.5 bg-emerald-50 border border-emerald-600 text-emerald-800 font-extrabold text-xs rounded-xl hover:bg-emerald-100 transition-colors active:scale-95 flex items-center gap-1">
                          <RotateCcw className="w-3 h-3" />
                          Reorder
                        </button>
                        <button className="text-[11px] text-slate-500 font-bold underline hover:text-emerald-700 flex items-center gap-0.5">
                          <FileText className="w-3 h-3" />
                          View Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        )}

      </main>

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
            <ClipboardList className="w-5 h-5 text-emerald-700" />
            <span className="text-[10px] font-bold text-emerald-700">Order</span>
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
