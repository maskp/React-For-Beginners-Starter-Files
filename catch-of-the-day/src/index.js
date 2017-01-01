// let's go!
import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Match,Miss} from 'react-router'//importing methods from the react-router
import StorePicker from './components/StorePicker'
import App from './components/App'
import Notfound from './components/Notfound'
import './css/style.css'

const repo = `/${window.location.pathname.split('/')[1]}`;
const Root = () =>{
	return(
		<BrowserRouter basename={repo}>
				<div>
					<Match exactly pattern="/" component={StorePicker} />
					<Match pattern="/store/:storeid" component={App}/>
					<Miss component={Notfound} />
				</div>
		</BrowserRouter>
		
		)
}

render(<Root/>,document.querySelector('#main'))

