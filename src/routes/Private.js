import { useState, useEffect } from 'react'  
import { auth } from '../firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth' //vai ficar verificando se há usuário logado
import { Navigate } from 'react-router-dom'

export default function Private({children}){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {
                //se tem user logado
                if(user){
                    const userDate = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userDate))

                    setLoading(false);
                    setSigned(true);

                } else{
                    //não possui user logado
                    setLoading(false);
                    setSigned(false);
                }
            })
        }
           checkLogin();    
    }, [])

    if(loading){
       return(
        <div></div>
       )
    }

    if(!signed) {
        return <Navigate to="/"/>
    }

    return children;

}