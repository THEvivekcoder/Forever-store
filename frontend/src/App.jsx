import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Verify from './pages/Verify'

import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Shipping from './pages/Shipping'
import Refund from './pages/Refund'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {

  return (

    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

      <ToastContainer />

      <Navbar />

      <SearchBar />

      <Routes>

        {/* Main Pages */}

        <Route
          path='/'
          element={<Home />}
        />

        <Route
          path='/collection'
          element={<Collection />}
        />

        <Route
          path='/about'
          element={<About />}
        />

        <Route
          path='/contact'
          element={<Contact />}
        />


        {/* Product & Shopping */}

        <Route
          path='/product/:productId'
          element={<Product />}
        />

        <Route
          path='/cart'
          element={<Cart />}
        />

        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/place-order'
          element={<PlaceOrder />}
        />

        <Route
          path='/orders'
          element={<Orders />}
        />

        <Route
          path='/verify'
          element={<Verify />}
        />


        {/* Legal / Policy Pages */}

        <Route
          path='/terms'
          element={<Terms />}
        />

        <Route
          path='/privacy'
          element={<Privacy />}
        />

        <Route
          path='/shipping'
          element={<Shipping />}
        />

        <Route
          path='/refund'
          element={<Refund />}
        />

      </Routes>

      <Footer />

    </div>

  )
}

export default App