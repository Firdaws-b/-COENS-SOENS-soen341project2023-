import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState("");
  const [companyName, setCompanyName] = useState("");

  const UIDQuery = useCallback(async () => {
    if (user) {
      const docRef = doc(firestore, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserRole(String(docSnap.data().role));
        setCompanyName(String(docSnap.data().companyName));
      }
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    UIDQuery();
  }, [UIDQuery]);

  const contextValue = useMemo(() => {
    return { user, logIn, signUp, logOut, userRole, companyName };
  }, [user, userRole, companyName]);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  return (
    <userAuthContext.Provider value={contextValue}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
