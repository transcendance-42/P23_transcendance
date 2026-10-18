const uploadDogDocu = (dogId, file, token, onProgress) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file)

        const xhr = new XMLHttpRequest()
        xhr.open('PUT', `/api/dog-docu/${dogId}`)
        if (token)
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        xhr.upload.addEventListener('progress', (ev) => {
            if (ev.lengthComputable)
                onProgress(Math.round((ev.loaded / ev.total) * 100))
        })
        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300)
                resolve()
            else {
                const error = new Error(`HTTP ${xhr.status}`)
                error.status = xhr.status
                reject(error)
            }
        })
        xhr.addEventListener('error', () => reject(new Error('NETWORK')))
        xhr.addEventListener('abort', () => reject(new Error('ABORTED')))

        xhr.send(formData)
    })
}

export { uploadDogDocu }
