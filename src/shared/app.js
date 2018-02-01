import React from 'react'
import { Router, Switch, Route, Link } from 'react-router-dom'

import Home from './containers/home'
import About from './containers/about'
import Topics from './containers/topics'
import Data from './containers/data'
import NotFound from './containers/not_found'
import Gantt from './containers/Gantt'


const App = (props) =>
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
            <li><Link to="/data">Data</Link></li>
            <li><Link to="/gantt">Gantt</Link></li>
        </ul>

        <hr/>

        <Switch>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
            <Route path="/data" component={Data}/>
            <Route path="/gantt" component={Gantt}/>
            <Route path="/" component={Home}/>
            <Route component={NotFound}/>
        </Switch>

    </div>;

export default App;
