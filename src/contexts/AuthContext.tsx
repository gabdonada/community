import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}
  
type AuthContextType = {
    user: User | undefined;
    singIngWithGoogle: () => Promise<void>;
  
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps){

  const [user, setUser] = useState<User>(); //starts undeffined because there is no user logged when accessing

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      
        if(user){
          const { displayName, photoURL, uid } = user;
          
          if( !displayName || !photoURL ){
            throw new Error('Seu usuário Google não possui nome ou foto.');
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })

        }
      
    })

    return () =>{
      unsubscribe();
    }
  }, [])

  async function singIngWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
        
    const loginResult = await auth.signInWithPopup(provider);
      
        if(loginResult.user){
          const { displayName, photoURL, uid } = loginResult.user;
          
          if( !displayName || !photoURL ){
            throw new Error('Seu usuário Google não possui nome ou foto.');
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })

        }
  }

    return(
      <AuthContext.Provider value={{user, singIngWithGoogle}}>
          {props.children}
      </AuthContext.Provider>

    );
}

  
