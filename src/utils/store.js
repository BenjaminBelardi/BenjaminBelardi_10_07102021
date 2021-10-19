// sredixstore with redux toolkit


import { configureStore }  from "@reduxjs/toolkit"
import login from "../features/signInForm"
import profile from "../features/profile"
import createUser from "../features/signUpForm"


const store = configureStore ({
    reducer: {
        user : login,
        userProfile : profile,
        newUser : createUser
    }
})


export default store