import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import BlogList from '../BlogList/BlogList'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <NavBar/>
      <Header/>
      <BlogList/>
      <Footer/>
    </>
  )
}

export default Home
