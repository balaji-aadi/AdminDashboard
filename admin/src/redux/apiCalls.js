import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productSlice";
import { loginFailure, loginStart, loginSuccess } from "./userSlice"
import axios from "axios";


export const login = async (dispatch,user) => {
    dispatch(loginStart());

    try{
        const res = await axios.post("http://localhost:5000/api/auth/login",user,{withCredentials:true})
        dispatch(loginSuccess(res.data));
    }
    catch(err){
        dispatch(loginFailure())
    }
}


export const getProducts = async (dispatch) => {
    dispatch(getProductStart());

    try{
        const res = await axios.get("http://localhost:5000/api/products",{withCredentials:true})
        dispatch(getProductSuccess(res.data));
    }
    catch(err){
        dispatch(getProductFailure())
    }
}

export const deleteProducts = async (id,dispatch) => {
    dispatch(deleteProductStart());

    try{
        const res = await axios.delete(`http://localhost:5000/api/products/${id}`,{withCredentials:true})
        dispatch(deleteProductSuccess(id));
    }
    catch(err){
        dispatch(deleteProductFailure())
    }
}

export const updateProducts = async (id,product,dispatch) => {
    dispatch(updateProductStart());

    try{
        const res = await axios.put(`http://localhost:5000/api/products/${id}`, product, {withCredentials:true})
        dispatch(updateProductSuccess(res.data));
    }
    catch(err){
        dispatch(updateProductFailure())
    }
}

export const addProducts = async (product,dispatch) => {
    dispatch(addProductStart());

    try{
        const res = await axios.post(`http://localhost:5000/api/products/`, product, {withCredentials:true})
        dispatch(addProductSuccess(res.data));
    }
    catch(err){
        dispatch(addProductFailure())
    }
}
