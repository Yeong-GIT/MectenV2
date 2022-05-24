import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'


function BtnRender({product, deleteProduct}) {
  const state = useContext(GlobalState)
  const [isSeller] = state.userAPI.isSeller
  const addCart = state.userAPI.addCart
    
    return (
        <div className="row_btn">
          {
            isSeller ? 
            <>
              <Link id = "btn_buy" to="#!" onClick={deleteProduct}>
                    Delete
              </Link>
        
              <Link id = "btn_view" to={`/edit_product/${product._id}`}>
                    Edit
              </Link>
            </>
            :<>
              <Link id = "btn_buy" to="#!" onClick={() => addCart(product)}>
                    Add to Cart
              </Link>
        
              <Link id = "btn_view" to={`/detail/${product._id}`}>
                    View
              </Link>
            </>
          }
        </div>
                
    )
}

export default BtnRender