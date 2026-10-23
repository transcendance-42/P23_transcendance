import { uploadFile } from './upload'

const uploadDogDocu = (dogId, file, token, onProgress) =>
    uploadFile('PUT', `/api/dog-docu/${dogId}`, file, token, onProgress)

export { uploadDogDocu }