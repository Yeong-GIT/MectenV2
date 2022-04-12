import React from 'react'
import {Link} from 'react-router-dom'
import Fav from "../productItem/favicon/favourite.svg"

function ProductItem({product}) {
  return (
    <div className="product_card">
      <img src ={product.images.url} alt ="" />
        
        <div className ="product_box">
            <h2 title={product.title}>{product.title}</h2>
            <span>
              ${product.price}
              <img src ={Fav} alt ="" width="1"/>
            </span>
            <p>${product.description}</p>
            
        </div>

        <div className="row_btn">
          <Link id = "btn_buy" to="#!">
                Buy
          </Link>
          
          <Link id = "btn_view" to={`/detail/${product._id}`}>
                View
          </Link>

        </div>

    </div>
  )
}

export default ProductItem