// sredixstore with redux toolkit


import { configureStore }  from "@reduxjs/toolkit"
import signInForm from "../features/signInForm"


const store = configureStore ({
    reducer: {
        user : signInForm
    }
})


export default store