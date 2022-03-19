import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth, firebase } from "../services/firebase";

import noUserImg from '../assets/images/noUserImg.png'

type User = {
    id: string;
    name: string;
    avatar: string;
    userEmail: string;
}
  
type AuthContextType = {
    user: User | undefined;
    singIngWithGoogle: () => Promise<void>;
    singOutWithGoogle: () => Promise<void>
  
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps){

  const [user, setUser] = useState<User>(); //starts undeffined because there is no user logged when accessing

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      
        //console.log(user)

        if(user){
          const { displayName, photoURL, uid, email} = user;
          
          if( !displayName || !photoURL ){
            throw new Error('Seu usuário Google não possui nome ou foto.');
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL,
            userEmail: email ?? ''
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
          const { displayName, photoURL, uid, email } = loginResult.user;
          
          if( !displayName || !photoURL ){
            throw new Error('Seu usuário Google não possui nome ou foto.');
          }

          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL ?? {noUserImg},
            userEmail: email ?? ''
          })

        }
  }

  async function singOutWithGoogle() {
    if(!user){
      throw new Error('Não há usuário logado para realizar o SingOut')
    }
    
    await auth.signOut();
  }

    return(
      <AuthContext.Provider value={{user, singIngWithGoogle, singOutWithGoogle}}>
          {props.children}
      </AuthContext.Provider>

    );


}

  
