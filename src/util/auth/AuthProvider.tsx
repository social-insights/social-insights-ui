import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import { supabase } from "../../supabase/supabase";
import { Session, User } from "@supabase/supabase-js";
import Layout from "../../components/Layout";
import {
  getUserOrgs,
  userInOrg,
} from "../../supabase/api/accounts/accountCalls";
import SelectOrg from "../../pages/organization/SelectOrg";

const AuthImpl = {
  // TODO: implement Supabase auth functions
  isAuthenticated: false,
  // signIn(callback: VoidFunction) {
  //   fakeAuthProvider.isAuthenticated = true;
  //   setTimeout(callback, 100);
  // },
  
  async signIn(userEmail: string, userPassword: string ) {
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    }); console.log("hello");
    if (error) {
      console.log(error);
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
  async signUp(userEmail: string, userPassword: string ) {
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
    }); console.log("hello");
    if (error) {
      console.log(error);
      return;
    }
    AuthImpl.isAuthenticated = true;
    return data;
  }
};

interface Org {
  org_id: number;
  created_at: string;
  post_ids: string[];
  name: string;
  user_ids: string[];
}

interface AuthContextType {
  auth: any;
  user: any;
  org: Org | undefined;
  signIn: (userEmail: string, userPassword: string, callback: VoidFunction) => void;
  signUp: (userEmail: string, userPassword: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
  setOrg: any;
}

let AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [org, setOrg] = useState<Org>();

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
      setAuth(session?.user ? true : false);
      const localOrg = JSON.parse(localStorage.getItem("org")!);
      if (localOrg !== null) {
        userInOrg(localOrg.org_id, session?.user.id!).then((res) => {
          if (res === true) {
            setOrg(localOrg);
          } else {
            setOrg(undefined);
          }
        });
      } else {
        setOrg(undefined);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    return subscription.unsubscribe();
  }, []);

  let signIn = (userEmail: string, userPassword: string, callback: VoidFunction) => {
    return AuthImpl.signIn(userEmail, userPassword).then((data) => {
      if (data === undefined) {
        return;
      }
      setUser(data.user);
      console.log(data.user);
      callback();
    });
  };
  let signUp = (userEmail: string, userPassword: string, callback: VoidFunction) => {
    return AuthImpl.signUp(userEmail, userPassword).then((data) => {
      if (data === undefined) {
        return;
      }
      // setUser(data.user);
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

  useEffect(() => {
    if (org?.name !== undefined) {
      localStorage.setItem("org", JSON.stringify(org));
    }
  }, [org, user]);

  let res = {
    auth,
    user,
    org,
    signIn,
    signOut,
    signUp, //
    passwordReset,
    updatePassword,
    setOrg,
  };

  return (
    <AuthContext.Provider value={res}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  return auth.user ? (
    (auth.org !== null && auth.org?.org_id !== undefined) ||
    location.pathname.startsWith("/organization/join") ? (
      <Layout>
        <Outlet />
      </Layout>
    ) : (
      <Layout>
        <SelectOrg />
      </Layout>
    )
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
}
