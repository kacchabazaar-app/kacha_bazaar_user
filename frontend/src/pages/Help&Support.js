```react
import React, { useState } from 'react';
import { 
  User, 
  HelpCircle, 
  RotateCcw, 
  Truck, 
  Tag, 
  UserCheck, 
  MessageSquare, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronRight, 
  Package,
  Home as HomeIcon, 
  Grid, 
  ShoppingCart, 
  ClipboardList
} from 'lucide-react';

export default function App() {
  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('help'); // 'home', 'category', 'cart', 'order', 'help'
  const [cartCount] = useState(3);

  // Strictly NO DEMO DATA by default. Defaulting to null (Empty State).
  // When backend or user places an order, this will contain recent order details.
  const [recentOrder, setRecentOrder] = useState(null);

  // Selected topic state for interactive feedback
  const [selectedTopic, setSelectedTopic] = useState(null);

  // List of Help Topics with matching icons
  const helpTopics = [
    { id: 'faq', title: 'Frequently Asked Questions (FAQs)', icon: HelpCircle },
    { id: 'returns', title: 'Returns & Refunds', icon: RotateCcw },
    { id: 'delivery', title: 'Delivery Status & Fees', icon: Truck },
    { id: 'offers', title: 'Offers & Payments', icon: Tag },
    { id: 'account', title: 'Account & Login', icon: UserCheck },
    { id: 'feedback', title: 'Feedback & Suggestions', icon: MessageSquare }
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans relative shadow-2xl pb-24 select-none">
      
      {/* Top Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <button className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center overflow-hidden active:scale-95 transition-transform">
          <User className="w-5 h-5 text-amber-800" />
        </button>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">
          Help & Support
        </h1>
        <div className="w-9 h-9" /> {/* Balancing Header Spacer */}
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 px-4 py-4 space-y-6">

        {/* Recent Order Help Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-black text-slate-900 tracking-wide">
            Recent Order Help
          </h2>

          {recentOrder ? (
            /* Card view when a recent order exists */
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-3xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900 text-sm">
                  Order #{recentOrder.id}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full">
                  {recentOrder.status}
                </span>
              </div>

              {/* Order Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                {recentOrder.items.map((item, idx) => (
                  <div key={idx} className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/60 p-1 shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                ))}
              </div>

              {/* Get Help Button */}
              <button className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs rounded-2xl shadow-sm transition-all active:scale-95">
                Get Help with this Order
              </button>
            </div>
          ) : (
            /* Clean Empty Recent Order State (No Demo Data) */
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-3xl p-5 text-center flex flex-col items-center justify-center space-y-2 shadow-xs">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                <Package className="w-6 h-6" />
              </div>
              <p className="text-slate-800 font-extrabold text-xs">No Recent Orders Found</p>
              <p className="text-slate-400 text-[11px]">
                Once you place an order, issue resolution for your items will appear here.
              </p>
            </div>
          )}
        </section>

        {/* Help Topics Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-black text-slate-900 tracking-wide">
            Help Topics
          </h2>

          <div className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-3xl divide-y divide-slate-100 shadow-xs overflow-hidden">
            {helpTopics.map((topic) => {
              const IconComponent = topic.icon;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.title)}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors active:bg-slate-100 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-700">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">
                      {topic.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-black text-slate-900 tracking-wide">
            Contact Us
          </h2>

          <div className="bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-3xl p-4 space-y-4 shadow-xs">
            
            {/* Live Chat */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                  <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">Live Chat</h3>
                  <p className="text-[10px] text-slate-400">Instant customer assistance</p>
                </div>
              </div>
              <span className="bg-emerald-800 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-xs">
                Online
              </span>
            </div>

            {/* Email Support */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">Email Support</h3>
                  <p className="text-[11px] font-bold text-slate-600">
                    emailsupport@kachabazaar.com
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>

            {/* Call Support */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">Call Support</h3>
                  <p className="text-[10px] text-slate-400">Toll-free 1800-KACHA-BZ</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>

          </div>
        </section>

      </main>

      {/* Selected Topic Interactive Modal / Alert */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs text-center space-y-3 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-700">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 text-sm">{selectedTopic}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Detailed help guides will load here dynamically once connected to the admin knowledgebase.
            </p>
            <button
              onClick={() => setSelectedTopic(null)}
              className="w-full py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
            <ClipboardList className="w-5 h-5" />
            <span className="text-[10px]">Order</span>
          </button>

          <button 
            onClick={() => setActiveTab('help')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'help' ? 'text-emerald-700 font-bold' : 'text-slate-500'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold text-emerald-700">Help</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
```
