// define router here
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import {
  DoseHistory,
  InsulinCalc,
  FoodSearch,
  LogDose,
  Report,
  LandingPage,
  LoginPage,
  SignupPage,
} from "../Pages";

import { BasicLayout } from "../Layouts";

import { auth } from "../main";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          console.log("User is signed in:", user);
          setIsLoggedIn(true);
        } else {
          console.log("No user is signed in.");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        // setIsLoggedIn(!!user);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/dose-history" element={<DoseHistory />} />
          <Route path="/insulin-calculation" element={<InsulinCalc />} />
          <Route path="/meals" element={<FoodSearch />} />
          <Route path="/log-dose" element={<LogDose />} />
          <Route path="/report" element={<Report />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          {/* auth routes */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </>
          )}
          {/* 404 route */}
          <Route
            path="*"
            element={
              <div>
                <h1>404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <button
                  onClick={async () => {
                    auth.signOut();
                  }}
                >
                  signout
                </button>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
