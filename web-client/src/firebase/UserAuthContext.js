import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from './firebase';
//import { UIDQuery } from "../fetchData";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState("");
  const [companyName, setCompanyName] = useState("");

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  const UIDQuery = async() => {
    if(user !== null && user !== undefined){
    const docRef = doc(firestore, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {   
      console.log("Document data:", docSnap.data());
      setUserRole(String(docSnap.data().role));
      //console.log("UID",docSnap.data().uid);
      //console.log("email",docSnap.data().email);
      //console.log("Role",docSnap.data().role);
      console.log("UserRole",userRole);

        //return data;
     } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  }
}
UIDQuery();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      //const q = setTimeout(UIDQuery(currentuser.uid), 1000);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, userRole, companyName }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
