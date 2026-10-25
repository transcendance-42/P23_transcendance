const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024

export function validateImage(file, t) {
    if (!ALLOWED_MIME.includes(file.type))
        return t('ErrInvalidFileType')
    if (file.size > MAX_SIZE)
        return t('ErrPhotoTooLarge', { name: file.name })
    return null
}