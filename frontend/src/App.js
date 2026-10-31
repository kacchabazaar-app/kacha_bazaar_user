import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { App as CapApp } from "@capacitor/app";
import { PushNotifications } from "@capacitor/push-notifications";
import axios from "axios";
import socket from "./socket";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

// 🟢 কাচ্চা বাজার (Kacha Bazaar) পেজ ইম্পোর্টসমূহ
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Help from "./pages/Help";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Notifications from "./pages/Notifications";

import ProtectedRoute from "./components/ProtectedRoute";

// 🟢 মোবাইল ব্যাক বাটন হ্যান্ডলার
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

function App() {
  const [popup, setPopup] = useState(null);

  const [updateModal, setUpdateModal] = useState({
    show: false,
    downloadUrl: ""
  });

  // 🔔 পুশ নোটিফিকেশন সেটআপ
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

  // 🚀 অ্যাপ আপডেট চেকার
  useEffect(() => {
    const checkAppUpdate = async () => {
      try {
        const res = await fetch(`https://kacha-bazaary-indol.vercel.app/update.json?t=${Date.now()}`);
        const data = await res.json();
        const currentVersionCode = 1;

        if (data && data.versionCode > currentVersionCode) {
          setUpdateModal({
            show: true,
            downloadUrl: data.downloadUrl
          });
        }
      } catch (err) {
        console.error("Update check failed:", err);
      }
    };

    checkAppUpdate();
  }, []);

  // 🔌 সকেট নোটিফিকেশন লিসেনার
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

      <div style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden", minHeight: "100vh", background: "#f8fafc", boxSizing: "border-box" }}>

        {/* 🚀 অ্যাপ আপডেট মোডাল */}
        {updateModal.show && (
          <div style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
            padding: "20px"
          }}>
            <div style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "24px",
              maxWidth: "360px",
              width: "100%",
              textAlign: "center",
              color: "#0f172a",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
            }}>
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>🥬</div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "20px", fontWeight: "bold" }}>Kacha Bazaar Update!</h3>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "20px", marginBottom: "20px" }}>
                A new version of Kacha Bazaar app is available with faster delivery and improvements.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={() => window.open(updateModal.downloadUrl, "_system")}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "14px",
                    border: "none",
                    background: "#166534",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "16px",
                    cursor: "pointer"
                  }}
                >
                  Update Now
                </button>

                <button
                  onClick={() => setUpdateModal((prev) => ({ ...prev, show: false }))}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "14px",
                    border: "1px solid #cbd5e1",
                    background: "transparent",
                    color: "#64748b",
                    fontWeight: "500",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}
                >
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🔔 নোটিফিকেশন পপআপ */}
        {popup && (
          <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#166534",
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}>
            <h4 style={{ margin: 0, fontSize: "15px" }}>{popup.title}</h4>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px" }}>{popup.message}</p>
          </div>
        )}

        {/* 🚦 অ্যাপের মূল রাউটস */}
        <Routes>
          {/* হোম পেজ */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* ক্যাটাগরি পেজ */}
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />

          {/* কার্ট পেজ */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* অর্ডার পেজ */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* হেল্প ও সাপোর্ট পেজ */}
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            }
          />

          {/* প্রোফাইল / অ্যাকাউন্ট পেজ */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* নোটিফিকেশন পেজ */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          {/* অথেনটিকেশন পেজ */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ডিফল্ট ফলব্যাক রাউট */}
          <Route path="*" element={<Login />} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={2500}
          theme="light"
        />

        <Toaster
          position="top-center"
          reverseOrder={false}
        />

      </div>
    </BrowserRouter>
  );
}

export default App;
