import defaultAvatar from '../../assets/pdpDefault.png'
import { useRef, useState } from 'react'
import { validateImage } from '../../utils/validateImage'
import { useTranslation } from 'react-i18next'

const Avatar = ({ url, size = 'md', onUpload, progress = null }) => {
    const { t } = useTranslation()
    const [localError, setLocalError] = useState('')
    const sizesPx = { sm: 32, md: 40, lg: 128, xl: 64}
    const fileInputRef = useRef(null)
    const badgePx = sizesPx[size] / 4
    const uploading = progress !== null

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        e.target.value = ''
        const err = validateImage(file, t)
        if (err) { setLocalError(err); return }
        setLocalError('')
        onUpload?.(file)
    }

    return (
        <div className="flex flex-col items-center gap-1">
            <div className={`relative ${onUpload && !uploading ? 'cursor-pointer hover:opacity-80 transition' : ''}`}
                 style={{ width: sizesPx[size], height: sizesPx[size] }}
                 onClick={() => onUpload && !uploading && fileInputRef.current?.click()}>
            <div className="relative w-full h-full rounded-full overflow-hidden">
                <img src={url || defaultAvatar} alt="avatar" className="w-full h-full object-cover" />
                {uploading && (
                    <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}
                         className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-xs font-bold text-surface-white">{progress}%</span>
                        <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-200"
                             style={{ width: `${progress}%` }} />
                    </div>
                )}
            </div>
            {onUpload && !uploading && (
                <span className="absolute bottom-0 right-0 rounded-full bg-primary text-surface-white font-bold flex items-center justify-center border-2 border-surface-white"
                    style={{ width: badgePx, height: badgePx, fontSize: badgePx * 0.7 }}>
                    +
                </span>
            )}
            </div>
            {localError && <p className="text-action-pass text-xs text-center">{localError}</p>}
            {onUpload && <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleChange} />}
        </div>
    )
}

export default Avatar