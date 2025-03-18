import React, { useState } from 'react';
import { plantList } from '../../datas/plantList';
import './ShoppingList.css';
import CareScale from '../CareScale';
import PlantItem from '../PlantItem/PlantItem';
import Categories from '../Categories/Categories';




function ShoppingList({ cart, updateCart }) {
	const [activeCategory, setActiveCategory] = useState('')
	const categories = plantList.reduce(
		(acc, elem) =>
			acc.includes(elem.category) ? acc : acc.concat(elem.category),
		[]
	)

	function addToCart(name, price) {
		const currentPlantAdded = cart.find((plant) => plant.name === name)
		if (currentPlantAdded) {
			const cartFilteredCurrentPlant = cart.filter(
				(plant) => plant.name !== name
			)
			updateCart([
				...cartFilteredCurrentPlant,
				{ name, price, amount: currentPlantAdded.amount + 1 }
			])
		} else {
			updateCart([...cart, { name, price, amount: 1 }])
		}
	}


	function deleteToCart(name) {
		const currentPlant = cart.find((plant) => plant.name === name)
		if (currentPlant) {
			if (currentPlant.amount > 1) {
				const updatedCart = cart.map((plant) =>
					plant.name === name ? { ...plant, amount: plant.amount - 1 } : plant
				)
				updateCart(updatedCart)
			} else {
				const updatedCart = cart.filter((plant) => plant.name !== name)
				updateCart(updatedCart)
			}
		}
	}

	return (
		<div className='lmj-shopping-list'>
			<Categories
				categories={categories}
				setActiveCategory={setActiveCategory}
				activeCategory={activeCategory}
			/>

			<ul className='lmj-plant-list'>
				{plantList.map(({ id, cover, name, water, light, price, category }) =>
					!activeCategory || activeCategory === category ? (
						<div key={id}>
							<PlantItem
								cover={cover}
								name={name}
								water={water}
								light={light}
								price={price}
							/>
							<button className='ajouter' onClick={() => addToCart(name, price)}>Ajouter au panier</button>
							<button className='supprimer' onClick={() => deleteToCart(name, price)}>Supprimer du panier</button>
						</div>
					) : null
				)}
			</ul>
		</div>
	)
}
	
	export default ShoppingList