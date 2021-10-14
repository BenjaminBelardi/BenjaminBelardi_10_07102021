// sredixstore with redux toolkit


import { configureStore }  from "@reduxjs/toolkit"
import login from "../features/signInForm"


const store = configureStore ({
    reducer: {
        user : login
    }
})


export default store