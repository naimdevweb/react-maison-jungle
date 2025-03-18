import React from 'react'
import Banner from './components/Banner/Banner'
import Carte from './components/Carte/Carte'
import ShoppingList from './components/ShoppingList/ShoppingList'
import logo from './assets/logo.png'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import { useEffect } from 'react'

import './Layout.css'




function App() {
	const savedCart = localStorage.getItem('cart')
	const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : [])
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	return (
		<div>
			<Banner>
				<img src={logo} alt='logo-la-maison-jungle' className='lmj-logo' />
				<h1 className='lmj-title'>La maison jungle</h1>
			</Banner>
			<div className='lmj-layout-inner'>
				<Carte cart={cart} updateCart={updateCart} />
				<ShoppingList cart={cart} updateCart={updateCart} />
			</div>
			<Footer />
		</div>
	)
}

export default App