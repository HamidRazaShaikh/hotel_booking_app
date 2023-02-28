import React, { useEffect, useState } from "react";
import "./App.css";
import { AuthProvider } from "./utils/auth";
import MainScreen from "./screens/mainScreen";
import PageNotFound from "./screens/404";
import { Routes, Route } from "react-router-dom";
import DetailScreen from "./screens/DetailScreen";
import BookingScreen from "./screens/BookingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import { ProtectedRoute } from "./protected/protected";
import Navbar from "./components/navbar";

function App() {

  return (
    <AuthProvider>
      <div className="App">
       
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/signin" element={<SignInScreen />}></Route>
          <Route path="/Signup" element={<SignUpScreen />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <DetailScreen />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/bookings/:id"
            element={
              <ProtectedRoute>
                <BookingScreen />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
