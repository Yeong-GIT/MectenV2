import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import axios from 'axios'

function Products() {
  const state = useContext(GlobalState)
  const [products, setProducts] = state.productsAPI.products
  const [isSeller] = state.userAPI.isSeller
  
  const getProducts = async () => {
    const res = await axios.get('/api/products')
    setProducts(res.data.products)
    }

    useEffect(()=>{
        getProducts()
    },[])

  return (
    <>
    <div className="products">
      {
        products.map(product =>{
          return <ProductItem  key={product._id} product={product}
          isSeller={isSeller}/>
        })
      }
        
    </div>
    </>
  )
}

export default Products