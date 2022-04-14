import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import Logo from './icon/mectenlogo.png'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isSeller] = state.userAPI.isSeller
  const [menu, setMenu] = useState(false)

  const logoutUser = async () =>{
    await axios.get('/user/logout')
    
    localStorage.removeItem('firstLogin')
    
    window.location.href = "/";
}

  const sellerRouter = () =>{
    return(
      <>
          <li><Link to="/create_product">Create Product</Link></li>
          <li><Link to="/category">Categories</Link></li>

      </>
  )

  }

  const loggedRouter = () =>{
    return(
      <>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
      </>
  )

  }

  const styleMenu = {
    left: menu ? 0 : "-100%"
}

  return (
    <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">{isSeller ? 'Seller' : <img src ={Logo} alt ="" width="250"/>}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                            <li><Link to="/">{isSeller ? 'Products' : 'Shop'}</Link></li>

                {isSeller && sellerRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

                </ul>

            {
                isSeller ? '' 
                :<div className="cart-icon">
                    <span>0</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
  )
}

export default Header