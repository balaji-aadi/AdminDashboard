import { Link, useLocation } from "react-router-dom";
import "./product.css";
// import { productData } from "../../dummyData"
import PublishIcon from "@mui/icons-material/Publish";
import { useDispatch, useSelector } from "react-redux"
import {  useState } from "react";
import axios from 'axios'
import { updateProducts } from "../../redux/apiCalls";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2]
    const product = useSelector(state => state.product.products.find(product => product._id === productId))
    const [title,setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [inStock, setInStock] = useState(true)
    const [file,setFile] = useState(product.img)
    const [cat,setCat] = useState([])
    const [size,setSize] = useState([])
    const [color,setColor] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const upload = async () => {
        try{
            const formData = new FormData();
            formData.append('file',file)
            const res = await axios.post('http://localhost:5000/api/upload',formData,{withCredentials:true})
            return res.data
        }
        catch(err){
            console.log(err)
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        const inputProducts = {title,desc,price,inStock ,img:imgUrl ? imgUrl : file,color,size,categories:cat}
        updateProducts(productId,inputProducts,dispatch);
        navigate('/products')
    }
    
    

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={`../upload/${product.img}`} alt="" className="productInfoImg" />
                        <span className="productName">{product.title} </span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Reference: &nbsp;</span>
                            <span className="productInfoValue">&nbsp;{product._id} </span>
                        </div>
                        
                        <div className="productInfoItem">
                            <span className="productInfoKey">DESCRIPTION:-</span>
                            <span className="productInfoValue">&nbsp;{product.desc} </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={product.title} value={title} onChange={(e) => setTitle(e.target.value)}/>

                        <label>Product Description</label>
                        <input type="text" placeholder={product.desc} value={desc} onChange={(e) => setDesc(e.target.value)}/>

                        <label>Price</label>
                        <input type="text" placeholder={product.price} value={price} onChange={(e) => setPrice(e.target.value)}/>

                        <label>Color</label>
                        <input type="text" placeholder={product.color} value={color} onChange={(e) => setColor(e.target.value.split(","))}/>

                        <label>Size</label>
                        <input type="text" placeholder={product.size} value={size} onChange={(e) => setSize(e.target.value.split(","))}/>

                        <label>Category</label>
                        <input type="text" placeholder={product.categories} value={cat} onChange={(e) => setCat(e.target.value.split(","))}/>

                        <label>In Stock</label>
                        <select name="inStock" id="idStock" value={inStock} onChange={(e) => setInStock(e.target.value)}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>

                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={`../upload/${product.img}`} alt="" className="productUploadImg"/>
                            <label for="file">
                                <PublishIcon />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                        <button className="productButton" onClick={handleSubmit}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
