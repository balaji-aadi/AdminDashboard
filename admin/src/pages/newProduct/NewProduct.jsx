import { useState } from "react";
import "./newProduct.css";
import axios from 'axios'
import { addProducts } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const[title,setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [price,setPrice] = useState('')
  const [inStock, setInStock] = useState(true)
  const [file, setFile] = useState('')
  const [cat, setCat] = useState([])
  const [colors,setColor] = useState([])
  const [sizes, setSize] = useState([])
  const dispatch = useDispatch()




  const upload = async ()=> {
    try{
      const formData = new FormData();
      formData.append('file',file)
      const res = await axios.post('http://localhost:5000/api/upload',formData,{withCredentials:true})
      return res.data;
    }
    catch(err){
      console.log(err);
    }
  }

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  }

  const handleSize = (e) => {
    setSize(e.target.value.split(","))
  }

  const handleColor = (e) => {
    setColor(e.target.value.split(","))
  }




  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    const product = {title, desc, price, categories:cat , inStock: inStock, img : imgUrl, size:sizes , color:colors}
    addProducts(product,dispatch);
  }


 

  return (

    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <form action="/api/upload" method="post" encType="multipart/form-data" className="addProductItem">
          <label>Image</label>
          <input type="file" name="file" id="file" onChange={(e)=> setFile(e.target.files[0])}/>
        </form>

        <div className="addProductItem">
          <label>Title</label>
          <input type="text"  placeholder="title" value={title}  onChange={(e) => setTitle(e.target.value)}/>
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input type="text"  placeholder="description..." value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div className="addProductItem">
          <label>Price</label>
          <input type="number" placeholder="100" value={price} onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" value={cat}  onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="s,m,l,xl" value={sizes} onChange={handleSize}/>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="blue,green" value={colors} onChange={handleColor}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select onChange={(e) => setInStock(e.target.value)} value={inStock} >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
