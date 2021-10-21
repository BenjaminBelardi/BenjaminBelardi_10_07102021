
import { createSlice } from "@reduxjs/toolkit";
import { selectAuthUser } from "../utils/selector";
import { createUser } from "../services/user.service";



const initialState = {
    status: 'void',
    login : null,
    data: null,
    error: null,
}


export function signUp(userAccount){
    const login = userAccount.email
    // return a thunk
    return async (dispatch, getState) => {
        const status = selectAuthUser(getState()).status
        if (status === 'pending' || status ==="updating" ) {
         return
    }
    dispatch(actions.fetching(login))

   try { 
      const signUpData = await createUser (userAccount)
      dispatch(actions.resolved(signUpData))

   } catch (error) {
      dispatch(actions.rejected(error))
      throw error
    }
  }
}

const {actions, reducer } = createSlice({
    name: 'createUser',
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
              },
        clearData : () => {
          return initialState
        } 
      }    
  })

export default reducer