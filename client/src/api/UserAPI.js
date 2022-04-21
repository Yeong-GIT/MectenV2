import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token){
    const [isLogged, setIsLogged] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

   

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
            alert("Product has successfully added into cart")

        }else{
            alert("This product has been added to cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isSeller: [isSeller, setIsSeller],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
        
    }
}

export default UserAPI