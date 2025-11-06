import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";

type Profile = {
  full_name: string;
  role: string;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // onAuthStateChange fires an initial session event, so we can handle
    // both initial load and subsequent changes in one place.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          try {
            const { data: profileData, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", currentUser.id)
              .single();
            
            if (error) {
              console.error("Error fetching profile:", error.message);
              setProfile(null);
            } else {
              setProfile(profileData ?? null);
            }
          } catch (e: any) {
            console.error("Exception fetching profile:", e.message);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        
        // The first auth event has fired, so we are no longer loading.
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return <AuthContext.Provider value={{ session, user, profile, loading, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
