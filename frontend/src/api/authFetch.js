
let currentToken = null
let refreshPromise = null

export function setFetchToken(token){
    currentToken = token
}

function getToken() {
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

    console.log('LE TOKEENN DANS LAUTH')
    console.log(currentToken)  
    console.log('LE HEADERS ENVOYÉ')
    console.log(headers)
    let res = await fetch(url, {...options, headers})
    if (res.status == 401 && refreshFunction){
        try{
                console.log('REPONSE 40111 ')
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
            console.log('CA THROWWWW UNE ERRREURRR')
            refreshPromise = null;          
            await logoutFunction()
            throw e
        }
    }
    console.log('LA REPONSE ENVOYÉEEE')
    console.log(res)
    return res
}