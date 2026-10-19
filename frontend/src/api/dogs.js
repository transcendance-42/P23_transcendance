import { authFetch } from "./authFetch"

const fetchDogs = async () => {
    const response = await authFetch('/api/neardog')
    if (!response.ok)
        throw new Error('Failed to fetch dogs')
    return response.json()
}

const uploadDogPics = (formData, token, onProgress) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/dog-pics')
        if(token)
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        
        xhr.upload.addEventListener('progress', (ev) =>{
            if(ev.lengthComputable)
                onProgress(Math.round((ev.loaded / ev.total) * 100))      
        })
        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300)
                resolve()
            else
                reject(new Error(`HTTP ${xhr.status}`))
        })
        xhr.addEventListener('error', () => {reject(new Error('NETWORK'))})
        xhr.addEventListener('abort', () => {reject(new Error('ABORTED'))})

        xhr.send(formData)
    })
}

export { fetchDogs, uploadDogPics }