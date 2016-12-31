import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
class App extends React.Component {
  constructor() {
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }
//lifecycle hooks 
//"gives us # of entry point into a component....componentwillmount allows us to sync component state to firebase state"
  //
  componentwillMount(){
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{context:this,state:'fishes'}) //talks in ff mode....
    //don't sync the entire db
    // 
    //it takes string that points to piece of firebase that you want to sync with ?
  }
  componentwillUnmount(){//to limit the listeners when we go to another page 
    base.removeBinding(this.ref);
  }

  addFish(fish) {
    // update our state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }
  addToOrder(key){
    //takes copy of state
    const order = {...this.state.order};
    //spread eagle ?? idk what this means
    order[key] = order[key]+1 || 1;
    //tutorial in ff mode
     
    //update state next
    this.setState({order})//string intrpolation
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        {/*passs state of fish and order not a good practice to pass the entire state*/}
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;