import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import Home from './pages/Home/Home'



const Routes = ({ location }: RouteProps) => {

    return (
        <div>
            <Switch location={location}>
                <Route path="/home" component={Home} />
                <Redirect to={'/home'} />
            </Switch>
        </div>
    )
}

export default withRouter(Routes);