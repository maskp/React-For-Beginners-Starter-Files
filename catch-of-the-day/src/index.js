// let's go!
import React from 'react'

import {render} from 'react-dom'
import {BrowserRouter, Match,Miss} from 'react-router'//importing methods from the render

import StorePicker from './components/StorePicker'
import App from './components/App'
import Notfound from './components/Notfound'
import './css/style.css'
const Root = () =>{
	return(
		<BrowserRouter>
				<div>
				<Match exactly pattern="/" component={StorePicker} />
				<Match pattern="/store/:storeid" component={App}/>
				<Miss component={Notfound} />
				</div>
			</BrowserRouter>
		
		)
}

render(<Root/>,document.querySelector('#main'))

