import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Form, Field} from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { submit } from '../features/signInForm'  

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

// const onSubmit = values => {
//     //simulate delay response
//     fectchUserData(values)
//     }

const customField = ({type, label, input, meta: {touched, error} }) => (
    <div className="input-wrapper">
        <label htmlFor={label}>{label}</label>
        <input {...input} type={type} id={label}/>
        {touched && error && 
        <span className="error">{error}</span>}
    </div>
)

function SignInForm() {
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        dispatch(submit(values))
    }

    return(
        <main className="main bg-dark">
            <section className="sign-in-content">
            <FontAwesomeIcon icon={faUserCircle} />
            <h1>Sign In</h1>
            <Form
                // onSubmite function promise resolve server side if login && mdp are valid
                //onSubmit={onSubmit}
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

                render={({handleSubmit, submitting}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name='email' label="Email" component={customField} type="email" />
                        <Field name='password' label="Password" component={customField} type="password" />
                        <button className="sign-in-button" type='submit' disabled={submitting} >Sign In</button>
                    </form>
                )}
            />
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