import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
const Home  = lazy(() => import('./pages/Home/Home'));



const Routes = ({ location }: RouteProps) => {

    return (
        <div>
            <Suspense fallback={<div>Cargando...</div>}>
                <Switch location={location}>
                    <Route path="/home" component={Home} />
                    <Redirect to={'/home'} />
                </Switch>
            </Suspense>
        </div>
    )
}

export default withRouter(Routes);