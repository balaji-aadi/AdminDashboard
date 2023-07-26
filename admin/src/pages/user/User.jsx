import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import  MailOutlineIcon  from "@mui/icons-material/MailOutline";
import  PermIdentityIcon  from "@mui/icons-material/PermIdentity";
import  PhoneAndroidIcon  from "@mui/icons-material/PhoneAndroid";
import  PublishIcon  from "@mui/icons-material/Publish";
import { Link } from "react-router-dom";
import "./user.css";
import { useState } from 'react';
import { useEffect } from 'react';
import {useLocation} from "react-router-dom"
import axios from 'axios'


export default function User() {
    const location = useLocation()
    const userId = location.pathname.split('/')[2]

    const [users,setUsers]  = useState([])
    const [username,setUsername] = useState('')
    const [fullName,setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [file, setFile] = useState('')

    useEffect(() => {
        const getUsers = async () => {
            const res = await axios(`http://localhost:5000/api/users/find/${userId}`,{withCredentials:true})
            setUsers(res.data)
        }
        getUsers()
    },[userId])


    const upload = async () => {
        const formData = new FormData()
        formData.append('file',file)
        const res = await axios.post('http://localhost:5000/api/upload',formData,{withCredentials:true})
        return res.data
    }

    const handlSubmit = async (e) => {
        e.preventDefault()
        const imgUrl = await upload()

       try{
        await axios.put(`http://localhost:5000/api/users/${userId}`, 
        {
            username,
            fullName,
            email,
            phone,
            img:imgUrl
        },{withCredentials:true})
       }
       catch(err){
        console.log(err)
       }
    }


    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={ `../upload/${users.img}`}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{users.username} </span>
                            <span className="userShowUserTitle">Software Engineer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentityIcon className="userShowIcon" />
                            <span className="userShowInfoTitle">{users.username} </span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarTodayIcon className="userShowIcon" />
                            <span className="userShowInfoTitle">10.12.1999</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroidIcon className="userShowIcon" />
                            <span className="userShowInfoTitle">{users.phone} </span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutlineIcon className="userShowIcon" />
                            <span className="userShowInfoTitle">{users.email} </span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder= {users.username}
                                    className="userUpdateInput"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="full name"
                                    className="userUpdateInput"
                                    value={fullName}
                                    onChange={e => setFullname(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder={users.email}
                                    className="userUpdateInput"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="phoneNumber"
                                    className="userUpdateInput"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={`../upload/${users.img}` || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <PublishIcon className="userUpdateIcon" />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                            </div>
                            <button className="userUpdateButton" onClick={handlSubmit}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
