import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { Session, User } from "@supabase/supabase-js";
import Layout from "../../components/Layout";

const AuthImpl = {
  // TODO: implement Supabase auth functions
  isAuthenticated: false,
  // signIn(callback: VoidFunction) {
  //   fakeAuthProvider.isAuthenticated = true;
  //   setTimeout(callback, 100);
  // },
  async signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "djlynn03@gmail.com",
      password: "password",
    });
    if (error) {
      return;
    }
    AuthImpl.isAuthenticated = true;
    return data;
  },
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return;
    }
    AuthImpl.isAuthenticated = false;
  },
};

interface AuthContextType {
  user: any;
  signIn: (callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
      setAuth(session?.user ? true : false);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    return subscription.unsubscribe();
  }, []);

  let signIn = (callback: VoidFunction) => {
    return AuthImpl.signIn().then((data) => {
      if (data === undefined) {
        return;
      }
      setUser(data.user);
      callback();
    });
  };
  let signOut = (callback: VoidFunction) => {
    return AuthImpl.signOut().then(() => {
      setUser(undefined);
      callback();
    });
  };

  const passwordReset = () => {}; // TODO
  const updatePassword = () => {}; // TODO

  let res = {
    auth,
    user,
    signIn,
    signOut,
    passwordReset,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={res}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// export function useAuth() {
//   return React.useContext(AuthContext);
// }

export const useAuth = () => useContext(AuthContext);

export function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  return auth.user ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );

  // if (!auth.user) {
  //   // Redirect them to the /login page, but save the current location they were
  //   // trying to go to when they were redirected. This allows us to send them
  //   // along to that page after they login, which is a nicer user experience
  //   // than dropping them off on the home page.
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // return children;
}

// export function HomepageRedirect(){
//   const navigate = useNavigate();
//   return navigate("/");
// }
