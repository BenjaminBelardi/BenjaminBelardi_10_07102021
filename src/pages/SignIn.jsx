import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {useEffect} from 'react'
import { useDispatch} from 'react-redux'
import {Form, Field} from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { login } from '../features/signInForm'
import { NavLink } from 'react-router-dom' 
import { useHistory } from 'react-router'



//get the token if user already connected
const token = localStorage.getItem('userTokens') 

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




function SignInForm() {
    let history = useHistory()
    const dispatch = useDispatch()
    const onSubmit = (value) => {
        return new Promise(resolve => 
            dispatch(login({email: value.email, password: value.password},value.remember))
            .then(()=> {
                const location = { 
                    pathname : "/profile",
                    state : {user : value.email}
                }
                resolve(true)
                history.replace(location)
            })
            .catch ((error) => {
                resolve({ [FORM_ERROR] : error}) 
            })
        )
    }

    // automatic redirection if user already connected
    useEffect(() => {
        if (token){
        const location = { 
            pathname : "/profile"
        }
        history.replace(location)
    }
    },[history])
        


    return(
        <main className="main bg-dark">
            <section className="sign-in-content">
            <FontAwesomeIcon icon={faUserCircle} />
            <h1>Sign In</h1>
            <Form
                onSubmit={onSubmit}
                // validate function : valid the fields before sending
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