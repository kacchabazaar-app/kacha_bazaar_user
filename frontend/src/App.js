import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { App as CapApp } from "@capacitor/app";
import { PushNotifications } from "@capacitor/push-notifications";
import axios from "axios";
import socket from "./socket";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

// 🟢 Kacha Bazaar-এর পেজসমূহ
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Help from "./pages/Help";
import Account from "./pages/Account";
import Login from "./pages/Login";

// 🟢 ব্যাক বাটন হ্যান্ডলার (Capacitor Native App Exit / Back Movement)
function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let listener;

    const setupListener = async () => {
      listener = await CapApp.addListener("backButton", ({ canGoBack }) => {
        if (
          location.pathname === "/" ||
          location.pathname === "/home" ||
          location.pathname === "/login"
        ) {
          CapApp.exitApp();
        } else {
          navigate(-1);
        }
      });
    };

    setupListener();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [location, navigate]);

  return null;
}

// 🟢 ফিক্সড বটম নেভিগেশন বার (সব পেজে ফিক্সড থাকবে)
function GlobalBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // যেসব পেজে বটম নেভিগেশন বার দেখাবে না
  const hideNavPaths = ["/login", "/register"];
  const shouldShowNav = !hideNavPaths.includes(location.pathname);

  if (!shouldShowNav) return null;

  const isActive = (path) => {
    if (path === "/" && (location.pathname === "/" || location.pathname === "/home")) return true;
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex justify-around items-center z-50 px-2 shadow-lg">
      {/* Home */}
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center justify-center w-full py-1 ${
          isActive("/") ? "text-emerald-700 font-semibold" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/") ? 2.5 : 1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span className="text-[11px]">Home</span>
      </button>

      {/* Category */}
      <button
        onClick={() => navigate("/category")}
        className={`flex flex-col items-center justify-center w-full py-1 ${
          isActive("/category") ? "text-emerald-700 font-semibold" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/category") ? 2.5 : 1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="text-[11px]">Category</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => navigate("/cart")}
        className={`flex flex-col items-center justify-center w-full py-1 relative ${
          isActive("/cart") ? "text-emerald-700 font-semibold" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <div className="relative">
          <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/cart") ? 2.5 : 1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
            0
          </span>
        </div>
        <span className="text-[11px]">Cart</span>
      </button>

      {/* Order */}
      <button
        onClick={() => navigate("/orders")}
        className={`flex flex-col items-center justify-center w-full py-1 ${
          isActive("/orders") ? "text-emerald-700 font-semibold" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/orders") ? 2.5 : 1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="text-[11px]">Order</span>
      </button>

      {/* Help */}
      <button
        onClick={() => navigate("/help")}
        className={`flex flex-col items-center justify-center w-full py-1 ${
          isActive("/help") ? "text-emerald-700 font-semibold" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive("/help") ? 2.5 : 1.8} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-[11px]">Help</span>
      </button>
    </nav>
  );
}

function App() {
  const [popup, setPopup] = useState(null);

  // 🔔 পুশ নোটিফিকেশন ইন্টিগ্রেশন
  useEffect(() => {
    const initPushNotifications = async () => {
      try {
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive === 'granted') {
          await PushNotifications.register();
        }
      } catch (err) {
        console.error("Push notification initialization error:", err);
      }
    };

    initPushNotifications();

    const tokenListener = PushNotifications.addListener('registration', async (token) => {
      const email = localStorage.getItem("email");
      const userId = localStorage.getItem("userId");

      if (token.value && (email || userId)) {
        try {
          await axios.post("https://kacha-bazaar-backend.onrender.com/api/save-fcm-token", {
            userId: userId,
            email: email,
            fcmToken: token.value
          });
        } catch (error) {
          console.error("Failed to save FCM token to backend:", error);
        }
      }
    });

    return () => {
      tokenListener.then(l => l.remove());
    };
  }, []);

  // 🟢 সকেট নোটিফিকেশন লিসেনার
  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      socket.emit("join", email);
    }

    socket.on("new_notification", (data) => {
      setPopup(data);

      setTimeout(() => {
        setPopup(null);
      }, 5000);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  return (
    <BrowserRouter>
      <BackButtonHandler />

      <div className="w-full max-w-md mx-auto min-h-screen bg-gray-50 pb-20 relative">

        {/* সকেট নোটিফিকেশন পপআপ */}
        {popup && (
          <div className="fixed top-5 right-5 bg-emerald-600 text-white p-4 rounded-xl shadow-lg z-[9999]">
            <h4 className="font-bold text-sm">{popup.title}</h4>
            <p className="text-xs mt-1">{popup.message}</p>
          </div>
        )}

        {/* প্রজেক্ট রাউটিং */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/help" element={<Help />} />
          <Route path="/account" element={<Account />} />

          <Route path="/login" element={<Login />} />

          {/* অন্য কোনো ভুল ইউআরএল দিলে হোম পেজে নিয়ে যাবে */}
          <Route path="*" element={<Home />} />
        </Routes>

        <ToastContainer position="top-center" autoClose={2500} theme="light" />
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      {/* গ্লোবাল ফিক্সড নেভিগেশন বার */}
      <GlobalBottomNav />
    </BrowserRouter>
  );
}

export default App;
