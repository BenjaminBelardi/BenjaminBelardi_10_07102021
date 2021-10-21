import {Switch, Route} from "react-router-dom";
import { Redirect } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SignInForm from "../pages/SignIn";
import SignUpForm from "../pages/SignUp";
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
        },
        // {
        //     path: '*',
        //     component : :({errorNumber}) => {
        //         return <Error errorNumber={'404'} />
        //     }

        // },
    ]
    const privateRoutes = [
        {
            path: '/profile',
            component : Profile ,
            exact: true
        },
    ]

    function PrivateRoute({ component : Children, ...rest }) {
        let userConnected = useSelector(selectAuthUser).isConnected;
        let token = localStorage.getItem('userTokens') 
        return (
          <Route
            {...rest}
            render={({ location }) =>
              userConnected || token ? (
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
            </Switch>
    )
}