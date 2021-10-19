import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Form, Field} from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { login } from '../features/signInForm'
import { selectUser, selectUsers } from '../utils/selector'
import { NavLink } from 'react-router-dom'  

//mock funtion to simulate the server response
//const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const onSubmit = async values => {
//      //simulate delay response
//     await sleep(300)
//         if (values.username !== 'benjamin') {
//             return { username: 'Unknown username' }
//           }
//           if (values.password !== 'belardi') {
//             return { [FORM_ERROR]: 'Login Failed' }
//           }
//           window.alert('LOGIN SUCCESS!')
//     }

const customField = ({label, input, meta: {touched, error} }) => (
    <div className="input-wrapper">
        <label htmlFor={label}>{label}</label>
        <input {...input} />
        {touched && error && 
        <span className="error">{error}</span>}
    </div>
)

const customCheckBox = ({type, label, input}) =>(
    <div className="input-remember">
        <input {...input}/>
        <label htmlFor={label}>{label}</label>
    </div>
)



function SignInForm(props) {
    const dispatch = useDispatch()
    // const onSubmit = (values) => {
    //     dispatch(login(values))
    //     .then(()=> {
    //         const location = { 
    //             pathname : "/profile",
    //             state : {user : values.email}
    //     }
    //         props.history.push(location)
    //     })
    //     .catch ((error) => {
    //             return { [FORM_ERROR] : error} 
    //     })
    // }

    const onSubmit = (values) => {
        return new Promise(resolve => 
            dispatch(login(values))
            .then(()=> {
                const location = { 
                    pathname : "/profile",
                    state : {user : values.email}
                }
                resolve(true)
                props.history.push(location)
            })
            .catch ((error) => {
                resolve({ [FORM_ERROR] : error}) 
            })
        )
    }


    return(
        <main className="main bg-dark">
            <section className="sign-in-content">
            <FontAwesomeIcon icon={faUserCircle} />
            <h1>Sign In</h1>
            <Form
                onSubmit={onSubmit}
                
                // validate function : valid the date before sending
                validate={values => {
                    const errors ={}
                    if (!values.email){
                        errors.email = 'Required'
                    }
                    if(!values.password) {
                        errors.password = 'Required'
                    }
                    return errors
                }}

                render={({handleSubmit,form, submitting, pristine, submitError}) => (
                    <form onSubmit={handleSubmit}>
                        {submitError && <span className="error">{submitError}</span>}
                        <Field name='email' label="Email" component={customField} type="email" />
                        <Field name='password' label="Password" component={customField} type="password" />
                        <Field name='remember' label="Remember" component={customCheckBox} type="checkbox" />
                        <button className="sign-in-button" type='submit' disabled={submitting || pristine} >Sign In</button>
                    </form>
                )}
            />
            <NavLink to="/signup">Sign Up</NavLink>
            </section>         
        </main>
    )
}
export default SignInForm
  
    

    



//     return (
//         <main className="main bg-dark">
//             <section className="sign-in-content">
//             <FontAwesomeIcon icon={faUserCircle} />
//             <h1>Sign In</h1>
//             <Form>
//                 <div className="input-wrapper">
//                     <label htmlFor="username">Username</label>
//                     <input type="text" id="username" />
//                 </div>
//                 <div className="input-wrapper">
//                     <label htmlFor="password">Password</label>
//                     <input type="password" id="password" />
//                 </div>
//                 <div className="input-remember">
//                     <input type="checkbox" id="remember-me" />
//                     <label htmlFor="remember-me">Remember me </label>
//                 </div>
//                 <button className="sign-in-button">Sign In</button>
//             </Form>
//             </section>
//         </main>
//     )
// }