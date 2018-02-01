/**
 * Created by Anton on 25.01.2018.
 */
import React from 'react'
import { Router, Switch, Route, Link } from 'react-router-dom'

const Topics = ({ match }) => (
    <div>
        <h1>Topics</h1>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h2>Please select a topic.</h2>
        )}/>
    </div>
);

const Topic = ({ match }) => (
    <div>
        <h2>{match.params.topicId}</h2>
    </div>
);

export default Topics;