export const selectUserToken = (userEmail) => (state) => {
    return state.user[userEmail].data.body.token
}

// const voidUser = { status: 'void' }

// export const selectUser = (userEmail) => (state) => {
//     return state.user[userEmail] ?? voidUser
//   }

export const selectAuthUser = (state) => state.user