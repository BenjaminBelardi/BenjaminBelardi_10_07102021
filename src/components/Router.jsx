// import {Switch, Route} from "react-router-dom";

// export default function Router (){
//     const routes = [
//         {
//             path: '/',
//             component : Home,
//             exact: true
//         },
//         {
//             path: '/sign-in',
//             component : SignIn
//         },
//         {
//             path: '/user/:id',
//             component : User ,
//             exact : true
//         },
//         {
//             path: '*',
//             component : ({errorNumber}) => {
//                 return <Error errorNumber={'404'} />
//             }

//         },
//     ]

//     return(
//             <Switch>
//                 {routes.map((route, index)=> (
//                      <Route key={index} {...route} />
//                 ))}
//             </Switch>
//     )
// }