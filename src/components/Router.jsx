import {Switch, Route} from "react-router-dom";
import { Redirect } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SignInForm from "../pages/SignIn";
import SignUpForm from "../pages/SignUp";
import { Error } from "../pages/Error";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../utils/selector";

export default function Router (){
    
    const publicRroutes = [
        {
            path: '/',
            component : Home,
            exact: true
        },
        {
            path: '/login',
            component : SignInForm,
            exact: true
        },
        {
            path: '/signup',
            component : SignUpForm ,
            exact : true
        }
    ]
    const privateRoutes = [
        {
            path: '/profile',
            component : Profile ,
            exact: true
        },
    ]

    function tokenValidity(){
      const tokenValidityDate = localStorage.getItem('userTokens') && JSON.parse(localStorage.getItem('userTokens')).validityDate
      const dateNow = Date.now()
      if (tokenValidityDate < dateNow ){
        localStorage.removeItem('userTokens')
        return false
        } else {
          return true
        }
      }

    function PrivateRoute({ component : Children, ...rest }) {

        let userConnected = useSelector(selectAuthUser).isConnected;
        let tokenValid = tokenValidity()
        
        return (
          <Route
            {...rest}
            render={({ location }) =>
              userConnected || tokenValid ? (
                < Children />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location }
                  }}
                />
              )
            }
          />
        );
      }

    return(
            <Switch>
                {publicRroutes.map((route, index)=> (
                     <Route key={index} {...route} />
                ))}
                {privateRoutes.map((route, index)=> (
                    <PrivateRoute key={index} {...route} />
                ))}
                <Route path="*">
                  <Error />
                </Route> 
            </Switch>
    )
}