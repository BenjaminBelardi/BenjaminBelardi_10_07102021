export const selectUserToken = (state) => {
    return state.user.data.body.token
}


// const voidUser = { status: 'void' }

// export const selectUser = (userEmail) => (state) => {
//     return state.user[userEmail] ?? voidUser
//   }

export const selectAuthUser = (state) => state.user
export const selectAuthUserProfil = (state) => state.userProfile
