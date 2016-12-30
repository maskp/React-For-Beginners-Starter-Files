import React from 'react'
import Header from './Header';
import Order from './Order';
import sampleFishes from '../sample-fishes'
import AddFishForm from './AddFishForm'
import Inventory from './Inventory'
class App extends React.Component{
	constructor(){
		super();
		this.addFish = this.addFish.bind(this)
		this.loadSamples = this.loadSamples.bind(this)
		//initial state
		this.state = {
			fishes:{},
			order:{}
		}
	}
	addFish(fish){
		const fishes = {...this.state.fishes};
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		this.setstate({fishes});
	}

	loadSamples(){
		this.setState({
			fishes:sampleFishes
		})
	}

	render(){

		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="fresh sea food market"/>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
			)
	}
	
}
export default App;