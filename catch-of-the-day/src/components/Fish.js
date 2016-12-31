import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { details,index } = this.props;//es6 shortcut for const
    // const details = this.props.details;
    // const index = this.props.index;
    const isAvailable = details.status === "available";
    //isAvailable variable which ckecks for details status s 
    const buttonText = isAvailable ? 'Add to order': 'sold out';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
      </li>
    )
  }
}

export default Fish;