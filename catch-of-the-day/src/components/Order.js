import React from 'react'
import {formatPrice} from '../helpers'

class Order extends React.Component{
	//need this to use this on our local methods
	constructor(){
		super();
		this.renderOrder = this.renderOrder.bind(this)
	}

	//seperate method for easy management
	renderOrder(key){
		const fish = this.props.fishes[key];//fish fishes fisher fishing fish fish fish fish fish fish fish fish fish fish fish fishes everywhere
		//add count  
		const count = this.props.order[key];//tells us how many they've ordered
		if(!fish || fish.status ==='unavailable'){
			return <li key={key}>sorry,{fish ? fish.name:'fish'} is no longer available</li>
		}
		return (
			<li key={key}>
				{/*keyweb*/}
				<span>{count}lbs {fish.name}</span>
				<span className="price">{formatPrice(count * fish.price)}></span>

				</li>


			)
	}








	render() {
		//passing keys in the order to the orderids
		//object.keys returns an array so you can use array map,reduce on'em
		//to show all orders
		const orderIds = Object.keys(this.props.order)
		//to shw total by using reduce
		const total = orderIds.reduce((prevTotal,key) => {
			//fish 1 fish 2 fish 3
			const fish = this.props.fishes[key];//fish vs fishes 
			//count the fish if there is fish1 in order it will tell you how many 
			const count = this.props.order[key];
			//is there a fish??
			const isAvailable = fish && fish.status ==='available';
			//conditional
			if(isAvailable){
				return prevTotal + (count * fish.price || 0)//fish could get deleted 
				}
			return prevTotal;//if delete return last amount
		},0);
		return (
				<div className="order-wrap">
					<h2>your order</h2>
					<ul className="order">
						{orderIds.map(this.renderOrder)}
					<li className="total">

						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
					</ul>
					
			</div>
			)
	}
}

export default Order