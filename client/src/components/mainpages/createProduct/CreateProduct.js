import {useState, useContext} from 'react'
import axios from 'axios'
import {GlobalState}from '../../../GlobalState'
import Loading from '../utils/loading/Loading'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    constent: 'of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    category: ''
}




function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isSeller] = state.userAPI.isSeller
    const [token] = state.token

    const handleDestroy = async () =>{
        try{
            if(!isSeller) return alert ("Please register as a seller")
            setLoading(true)
            await axios.post('/api/destroy',{public_id: images.public_id},{
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
            }catch(err){
                alert(err.res.data.msg)
        }
    }
    const handleUpload = async e =>{
        e.preventDefault()
        try{
            if(!isSeller) return alert ("Please register as a seller")
            const file = e.target.files[0]

            if(!file) return alert ("File not exist")

            if(file.size > 1025 * 1024) // 1mb
            return alert ("Size too large.")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
            return alert ("SFile format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData,{
                headers: {'cotent-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        }catch(err){
            alert(err.response.data.msg)
        }
    }
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

  return (
    <div className="create_product">
        <div className="upload">
            <input type="file" name="file" id="file_up" onChange={handleUpload}/>
            {
                loading ? <div id="file_img"><Loading/></div>
                :<div id="file_img" style={styleUpload}>
                <img src={images ? images.url: ''} alt="" />
                <span onClick={handleDestroy}>X</span>
            </div>
            }
            
        </div>

        <form>
            <div className="row">
                <label htmlFor="product_id">Product ID</label>
                <input type="text" name="product_id" id="product_id" required
                value={product.product_id} onChange={handleChangeInput}/>
            </div>

            <div className="row">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" required
                value={product.title} onChange={handleChangeInput}/>
            </div>

            <div className="row">
                <label htmlFor="price">Price</label>
                <input type="number" name="price" id="price" required
                value={product.price} onChange={handleChangeInput}/>
            </div>

            <div className="row">
                <label htmlFor="description">Description</label>
                <textarea type="text" name="description" id="description" required
                value={product.description} rows="5" onChange={handleChangeInput}/>
            </div>

            <div className="row">
                <label htmlFor="content">Content</label>
                <textarea type="text" name="content" id="content" required
                value={product.content} rows="7" onChange={handleChangeInput}/>
            </div>

            <div className="row">
                <label htmlFor="categories">Category</label>
                <select name="category" value={product.category} onChange={handleChangeInput}>
                    <option value="">Please select a category</option>
                    {
                        categories.map(category =>(
                            <option value={category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <button type="submit">Create</button>
        </form>
    </div>
  )
}

export default CreateProduct