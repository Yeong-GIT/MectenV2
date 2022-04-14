import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token){
    const [isLogged, setIsLogged] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
   

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/information', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsSeller(true) : setIsSeller(false)
                    
                    console.log(res)
                }catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])

    return {
        isLogged: [isLogged, setIsLogged],
        isSeller: [isSeller, setIsSeller],
        
    }
}

export default UserAPI