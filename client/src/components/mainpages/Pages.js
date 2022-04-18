import React, {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'

import {GlobalState} from '../../GlobalState'

function Pages() {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged


  
  return (
    <Routes>
        <Route exact path="/" element={<Products/>}/>
        <Route exact path="/detail/:id" element={<DetailProduct/>}/>
        <Route exact path="/login" element={isLogged ? <NotFound/> : <Login/>}/>
        <Route exact path="/register" element={isLogged ? <NotFound/> : <Register/>}/>
        <Route exact path="/history" element={isLogged ?  <OrderHistory/> : <NotFound/>}/>
        <Route exact path="/history/:id" element={isLogged ?  <OrderDetails/> : <NotFound/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="*" element={<NotFound/>}/>
    </Routes>
    
  )
}

export default Pages