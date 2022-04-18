import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token){
    const [isLogged, setIsLogged] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [callback, setCallback] = useState(false)
   

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/information', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsSeller(true) : setIsSeller(false)

                    setCart(res.data.cart)
                    
                    console.log(res)
                }catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])

    useEffect(() =>{
        if(token){
            const getHistory = async() =>{
                const res = await axios.get('/user/history', {
                    headers: {Authorization: token}
                })
                setHistory(res.data)
            }
            getHistory()
        }
    },[token, callback])

    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isSeller: [isSeller, setIsSeller],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        callback: [callback, setCallback]
        
    }
}

export default UserAPI