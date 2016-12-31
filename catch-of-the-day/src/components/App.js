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
    //'this' can b used by local methods once the constructor method is made
    this.addFish = this.addFish.bind(this);//takes a copy of App and bind it to 'this' of addFish 
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
     this.updateFish = this.updateFish.bind(this);

    // getinitialState

    this.state = {
      fishes: {},
      order: {}
    };
  }
//lifecycle hooks 
//"gives us # of entry point into a component....componentwillmount allows us to sync component state to firebase state"
//
  componentWillMount(){
    //this runs b4 the App component is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,{context:this,state:'fishes'}) //talks in ff mode....
    //don't sync the entire db
    // 
    //it takes string that points to piece of firebase that you want to sync with ?
    
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef){
      //if exist update order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }




    //we can check if there is any order in localstorage
    //chk componentwillupdate



      }

  
  componentWillUnmount(){//to limit the listeners when we go to another page 
    base.removeBinding(this.ref);
  }
//it runs whenever props or state changes. we are going to use it for orders
 //localstorage is key value pair that cannot b nested. you can store number,strings,booleans etc
 //localstorage.setitem
 //localStorage.getItem
  componentWillUpdate(nextProps,nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`,
    JSON.stringify(nextState.order))
    //you cannot store object inside localstorage only strings
    //chk componentwillmount
  }

  addFish(fish) {
    // update our state
    //Constants are block-scoped, much like variables defined using the let statement. 
    //The value of a constant cannot change through re-assignment, and it can't be redeclared. 
    const fishes = {...this.state.fishes};
    //spread: The properties of the object that you pass in are copied onto the component's props.
    //http://stackoverflow.com/questions/31048953/what-does-the-three-dots-in-react-do
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({ fishes });
  }

  updateFish(key,updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes}) 
  }

  removeFish(key){
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes})
  }



  //takes the sample fishes in ~ and loads onto the fishes state
  //when onclick 
  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }
  //method adds the order to the order state
  addToOrder(key){
    //takes copy of state
    const order = {...this.state.order};
    //spread 
    order[key] = order[key]+1 || 1;
    //tutorial in ff mode
    //uses key that is passed in thru button click as the key to order state  
    //conditional: if order[key exists add 1 if not put 1
    this.setState({order})//using the above condition update order state 
  }
  //render ul:object keys turns fishes state to an array which can then b mapped over 
  //key is the fish component which uses key index details and addtoorder as its state
  //keywebs
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        {/*passs state of fish and order not a good practice to pass the entire state*/}
        <Order fishes={this.state.fishes}
              order={this.state.order}
              params={this.props.params}
         />
         {/*params was available in the app not in orders. so, this is how we access params in the order level. See componentWillUpdate lifehook */}
        <Inventory 
        addFish={this.addFish} 
        loadSamples={this.loadSamples}
        removeFish={this.removeFish} 
        fishes={this.state.fishes}
        updateFish={this.updateFish}

        />
      </div>
    )
  }
}

export default App;