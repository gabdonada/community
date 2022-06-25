import { useEffect, useState } from "react"
import { database } from "../../services/firebase"

type UserDetails = {
    id: string,
    userID: string,
    userName: string,
    userEmail: string,
    userAvatar: string,
    userDescription: string,
    userSkills: string,
    userPhone: string,
    userTitle: string,
    userInterests: string
}

export function useGetUserProfile(userid: string){

    const [ userDef, setUserDef ] = useState<UserDetails>()


    useEffect(()=>{
        const userRef = database.ref(`users/${userid}`);

        userRef.on('value', userInfo =>{
            const databaseUser = userInfo.val();

            const userDetails: UserDetails = {
                id: databaseUser.key,
                userID: databaseUser.userID,
                userName: databaseUser.userName,
                userEmail: databaseUser.userEmail,
                userAvatar: databaseUser.userAvatar,
                userDescription: databaseUser.userDescription,
                userSkills: databaseUser.userSkills, 
                userPhone: databaseUser.userPhone,
                userTitle: databaseUser.userTitle,
                userInterests: databaseUser.userInterests
            }

            setUserDef(userDetails);
        })
    })
    return{userDef}
}