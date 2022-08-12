import { useEffect, useState } from "react"
import { database } from "../../services/firebase"
import { useAuth } from "../useAuth";

type UserDetails = {
    id: string,
    userID: string,
    userName: string,
    userEmail: string,
    userAvatar: string,
    userDescription: string,
    userPhone: string,
    userTitle: string,
    userInterests: {
        acRelacaoFins: boolean,
        acRelacaoValores: boolean,
        acAfetiva: boolean,
        acTradi: boolean
    },
    userCity: string
}

export function useGetUserProfile(userid: string | undefined){
    const { user} = useAuth();

    const [ userDef, setUserDef ] = useState<UserDetails>()
    const [ loadingUser, setLoadingUser ] = useState<boolean>(true)


    useEffect(()=>{
            const userRef = database.ref(`users/${userid}`);
            
            userRef.once('value', userInfo =>{
                const databaseUser = userInfo.val();
                setUserDef({
                    id: databaseUser.key,
                    userID: databaseUser.userID,
                    userName: databaseUser.userName,
                    userEmail: databaseUser.userEmail,
                    userAvatar: databaseUser.userAvatar,
                    userDescription: databaseUser.userDescription,
                    userPhone: databaseUser.userPhone,
                    userTitle: databaseUser.userTitle,
                    userInterests: databaseUser.userInterests,
                    userCity: databaseUser.userCities
                });
            })
        setLoadingUser(false);
    },[userid])
    return{userDef, loadingUser}
}