import {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Products() {
  const state = useContext(GlobalState)
  const [products, setProduct] = state.productsAPI.products
  const [isSeller] = state.userAPI.isSeller
  const [token] = state.token
  const[callback, setCallback] = state.productsAPI.callback
  

  return (
    <>
    <Filters/>
    <div className="products">
      {
        products.map(product =>{
          return <ProductItem  key={product._id} product={product} setProduct={setProduct}
          isSeller={isSeller} token={token} callback={callback} setCallback={setCallback}/>
        })
      }
        
    </div>

    <LoadMore />
    </>
  )
}

export default Products