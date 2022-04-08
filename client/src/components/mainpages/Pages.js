import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import Fav from './fav/Favourite'
import NotFound from './auth/utils/NotFound/NotFound'
import Favourite from './fav/Favourite'

function Pages() {
  return (
    <Routes>
        <Route exact path="/" element={<Products/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/fav" element={<Favourite/>}/>
        <Route exact path="/cart" element={<Cart/>}/>

        <Route exact path="*" element={<NotFound/>}/>
        
    </Routes>
    
  )
}

export default Pages