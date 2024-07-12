import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import { Main } from "./components/Main";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";

interface AuthContextType {
  loading: boolean;
  isSignedIn: boolean;
  currentUser: User | null;
  setLoading: (loading: boolean) => void;
  setIsSignedIn: (isSignedIn: boolean) => void;
  setCurrentUser: (user: User | null) => void;
}

interface User {
  // ユーザー情報に関する具体的なプロパティを定義
  id: number;
  name: string;
}

const defaultAuthValue: AuthContextType = {
  loading: true,
  isSignedIn: false,
  currentUser: null,
  setLoading: () => { },
  setIsSignedIn: () => { },
  setCurrentUser: () => { }
};

export const AuthContext = createContext<AuthContextType>(defaultAuthValue);

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res?.data.isLogin) {
          setIsSignedIn(true);
          setCurrentUser(res.data.data);
        } else {
          console.log("no current user");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    if (!isSignedIn) return <Navigate to="/signin" replace />;
    return <>{children}</>;
  };

  return (
    <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
