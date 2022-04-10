import React, {useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import Fav from './icon/favourite.svg'
import Logo from './icon/mectenlogo.png'
import {Link} from 'react-router-dom'

function Header() {
  const state = useContext(GlobalState)
  return (
    <header>
      <div className="menu">
        <img src ={Menu} alt ="" width="30"/>
      </div>
      <div className="logo">
        <h1>
          <Link to="/"><img src ={Logo} alt ="" width="300"/></Link>
        </h1>
      </div>
      <ul>
        <Link to="/"></Link>
        <Link to="/">Products</Link>
        <img src ={Close} alt ="" width="30" className="menu"/>
      </ul>
      <ul>
        <Link to="/"></Link>
        <Link to="/login">Sign In / Register</Link>
        <img src ={Close} alt ="" width="30" className="menu"/>
      </ul>

      <div className="fav-icon">
        <span>0</span>
        <Link to="/fav">
      <ul>
        <img src ={Fav} alt ="" width="30"/>
      </ul>
      </Link>
      </div>

      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
      <ul>
        <img src ={Cart} alt ="" width="30"/>
      </ul>
      </Link>
      </div>
    </header>
  )
}

export default Header