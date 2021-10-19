import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Form, Field} from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { signUp } from '../features/signUpForm'
import { selectUser, selectUsers } from '../utils/selector'  
import { NavLink } from 'react-router-dom'


const customField = ({type, label, input, meta: {touched, error} }) => (
    <div className="input-wrapper">
        <label htmlFor={label}>{label}</label>
        <input {...input} />
        {touched && error && 
        <span className="error">{error}</span>}
    </div>
)



function SignUpForm(props) {
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        dispatch(signUp(values))
        .then(()=> {
            const location = { 
                pathname : "/login",
                state : {user : values.email}
        }
            props.history.push(location)
        })
        .catch ((error) => {
            return {[ FORM_ERROR ]: error}
        })
    }


    return(
        <main className="main bg-dark">
            <section className="sign-in-content">
            <FontAwesomeIcon icon={faUserCircle} />
            <h1>Sign Up</h1>
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
                    if(!values.firstName) {
                        errors.firstName = 'Required'
                    }
                    if(!values.lastName) {
                        errors.lastName = 'Required'
                    }

                    return errors
                }}

                render={({handleSubmit, submitting, pristine, submitError}) => (
                    <form onSubmit={handleSubmit}>
                        {submitError && <span>{submitError}</span>}
                        <Field name='email' label="Email" component={customField} type="email" />
                        <Field name='password' label="Password" component={customField} type="password" />
                        <Field name='firstName' label="First name" component={customField} type="text" />
                        <Field name='lastName' label="Last name" component={customField} type="text" />
                        <button className="sign-in-button" type='submit' disabled={submitting || pristine} >Sign Up</button>  
                    </form>
                )}
            />
            </section>         
        </main>
    )
}
export default SignUpForm
  
    

    



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