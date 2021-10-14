/* ici il faut créer les action pour la validation et l'envoi du formulaire
utilisation du slice de la librairie reduxjs/toolkit
*/
import { createSlice } from "@reduxjs/toolkit";
//importer le selecteur ici
import { selectAuthUser} from "../utils/selector";



// initial state of form feature fetch
const initialState = {
    login : null,
    status: 'void',
    data: null,
    error: null,
}
// userAccount = {login , password}
export function login(userAccount){
    const login = userAccount.email
    // return a thunk
    return async (dispatch, getState) => {
        const status = selectAuthUser(getState()).status
        if (status === 'pending' || status ==="updating" ) {
         return
    }
    dispatch(actions.fetching(login))
    try {
        const toSend = JSON.stringify(userAccount)
        const response = await fetch(
            "http://localhost:3001/api/v1/user/login", {
            method: "POST",
             headers:{
                 'Content-Type': 'application/json'
             },
            body: toSend
            }
        )
        // on récupère le token si le login et le mdp sont correct
        const data = await response.json()
        //const data = await handleResponse(response)
        dispatch(actions.resolved(data))
      //   .then(()=> {
      //     const location = { 
      //         pathname : "/profile",
      //         state : {user : values.email}
      // }
      //     props.history.push(location)
      // })
        } catch (error) {
        dispatch(actions.rejected(error))
        }
    }
}


// function handleResponse(response) {
//   return response.text().then(text => {
//     const data = text && JSON.parse(text)
//       if (!response.ok) {
//           if (response.status === 400) {
//               console.log("logOut")
//           }
//         const error = data && data.message
//         return Promise.reject(error)
//       }
//     return data
//   })
// }


const {actions, reducer } = createSlice({
    name: 'login',
    initialState,
    reducers:{
      fetching :{
        prepare: (login) => ({
          payload: { login },
        }),
        reducer: (draft, action) => {
                // update user name
                draft.login = action.payload.login
                if (draft.status === 'void') {
                  draft.status = 'pending'
                  return
                }
                if (draft.status === 'rejected') {
                  draft.error = null
                  draft.status = 'pending'
                  return
                }
                if (draft.status === 'resolved') {
                  draft.status = 'updating'
                  return
                }
          },
      },  
        resolved: (draft, action) => {
          // if request in progress
              if (draft.status === 'pending' ||draft.status === 'updating') {
                // set in resolved state and store the data
                draft.data = action.payload
                draft.status = 'resolved'
                return
              }
              return
            },
        rejected: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                  draft.error = action.payload
                  draft.data = null
                  draft.status = 'rejected'
                  return
                }
                return
              }
      }    
  })

export default reducer