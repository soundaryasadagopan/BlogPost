import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"

import Home from './pages/Home/Home'
import BlogList from './pages/BlogList/BlogList'
import Layout from './pages/Admin/Layout'
import Dashborad from './pages/Admin/Dashborad'
import ListBlog from './pages/Admin/ListBlog'
import AddBlog from './pages/Admin/AddBlog'
import Login from './components/admin/Login'
import Blog from './pages/Blog/Blog'
import {Toaster} from "react-hot-toast"
import { StoreContext } from './Context/StoreContextProvider'
function App() {
const{token} =useContext(StoreContext)
  return (
    <>
     <div >
      <Toaster/>
      <Routes>
        <Route path="/" element= {<Home/>}/>
  
        <Route path="/blog/:id" element= {<Blog/>}/>

        <Route path="/admin" element= {token ? <Layout/>: <Login/>}>
        <Route index element= {<Dashborad/>}/>
        <Route path="listblog" element= {<ListBlog/>}/>
        <Route path="addblog" element= {<AddBlog/>}/>

        </Route>



      </Routes>
      </div>
    </>
  )
}

export default App
