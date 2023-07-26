import React from 'react'
import './app.css'
import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import { createBrowserRouter,   Outlet, RouterProvider} from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import UserList from './pages/userList/UserList'
import User from './pages/user/User'
import NewUser from './pages/newUser/NewUser'
import ProductList from './pages/productList/ProductList'
import Product from './pages/product/Product'
import NewProduct from './pages/newProduct/NewProduct'
import Login from './pages/login/Login'
// import { useSelector } from 'react-redux'

const Layout = () => {
  return (
    <>
    <Topbar/>
    <div className='container'>
    <Sidebar/>
    <Outlet/>
    </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    children : [
      {
        path:'/',
        element : <HomePage/>
      },
      {
        path : '/users',
        element : <UserList/>
      },
      {
        path : '/newUser',
        element : <NewUser/>

      },
      {
        path : '/user/:id',
        element : <User/>
      },
      {
        path : 'products',
        element : <ProductList/>
      },
      {
        path : '/newProduct',
        element : <NewProduct/>
      },
      {
        path : '/product/:id',
        element : <Product/>
      },
    ]
  },
  {
    path : '/login',
    element : <Login/>
  }

])



const App = () => {
  // const user = useSelector(state => state.user.currentUser)

  return (  
    <>
    
      <RouterProvider router={router}/>

    </>
    
  )
}



export default App
