
let currentToken = null
let refreshPromise = null

export function setFetchToken(token){
    currentToken = token
}

export function getToken() {
    return currentToken
}


let refreshFunction = null;
let logoutFunction = null;
export function registerLogFunction({apiRefresh, apiLogout}){
    refreshFunction = apiRefresh
    logoutFunction = apiLogout
}


export async function authFetch(url, options = {}) {
    const headers = {
    ...options.headers,
    ...(currentToken ? {'Authorization': 'Bearer ' + currentToken} : {})
    }

    let res = await fetch(url, {...options, headers})
    if (res.status == 401 && refreshFunction){
        try{
                refreshPromise = refreshPromise || refreshFunction()
                const { token } = await refreshPromise
                currentToken = token
                refreshPromise = null;
                res = await fetch(url, {...options,
                    headers: {...options.headers, Authorization: 'Bearer ' + currentToken}
            })
            refreshPromise = null;        
        }
        catch (e)
        {
            refreshPromise = null;          
            await logoutFunction()
            throw e
        }
    }
    return res
}