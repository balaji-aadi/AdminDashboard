import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './userList.css'
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios'

const UserList = () => {

  const[users,setUsers] = useState([])

  useEffect(() => {
    const getUsers = async() => {
      try{
        const res = await axios.get('http://localhost:5000/api/users',{withCredentials:true})
        console.log(res.data)
        setUsers(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getUsers();
  },[])


  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/api/users/${id}`,{withCredentials:true})
      users.splice(
      users.findIndex(item => item._id === id),
      1)
    }
    catch(err){
      console.log(err)
    }

  }


  const columns = [
    { field: '_id', headerName: 'ID', width: 120 },
    {
      field: 'user', headerName: 'User', width: 200, renderCell: (params) => {
        return (
          <div className='userListUser'>
            <img className='userListImg' src={`../upload/${params.row.img}` || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
            {params.row.username}
          </div>
        )
      }
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      width: 100,
    },
    {
      field: 'createdAt',
      headerName: 'Join Date',
      width: 160,
    },
    {
      field: "action",
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/user/'+params.row._id}>
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon className='userListDelete' onClick = {() => handleDelete(params.row._id)} />
          </>
        )
      }
    }
  ];


  return (
    <div className='userList'>
      <DataGrid
        rows={users} disableRowSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}

export default UserList
