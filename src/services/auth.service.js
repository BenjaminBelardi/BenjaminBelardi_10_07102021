const URL_API_BASE = "http://localhost:3001/api/v1/"

export const  fetchLogin = async (userAccount, remember) => {
    const toSend = JSON.stringify(userAccount)
    const response = await fetch(
        URL_API_BASE + "user/login", {
        method: "POST",
         headers:{
             'Content-Type': 'application/json'
         },
        body: toSend
        }
    )
    const jsonData = await handleResponse(response)
    if (remember && jsonData.body.token){
          localStorage.setItem("userTokens" , JSON.stringify({token : jsonData.body.token}))
     }
    return jsonData
}

const logout = () => {
    sessionStorage.removeItem("user")
}


function handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 400) {
                logout()
            }
          const error = data && data.message
          throw error
        }
      return data
    })
  }
