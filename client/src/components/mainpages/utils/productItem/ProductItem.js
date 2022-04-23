import React from 'react'
import BtnRender from './BtnRender'
import axios from 'axios'

function ProductItem({product, isSeller, token, callback, setCallback}) {

  const deleteProduct = async() => {
    console.log(product)
    try{
      const destroyImg = await axios.post('/api/destroy',{public_id: product.images.public_id},{
        headers:{Authorization: token}
      })
      const deleteProduct = await axios.delete(`/api/product/${product._id}`,{
        headers:{Authorization: token}
      })

      await destroyImg
      await deleteProduct
      setCallback(!callback)

    }catch(err){
      alert(err.response.data.msg)
    }
  }
  return (
    <div className="product_card">
      <img src ={product.images.url} alt ="" />
        
        <div className ="product_box">
            <h2 title={product.title}>{product.title}</h2>
            <span>RM{product.price}</span>
            <p>{product.description}</p>
        </div>

        
        <BtnRender product={product} deleteProduct={deleteProduct}/>

    </div>
  )
}

export default ProductItem