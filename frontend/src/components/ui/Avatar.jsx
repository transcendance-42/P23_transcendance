import defaultAvatar from '../../assets/pdpDefault.png'
import { useRef } from 'react'

const Avatar = ({ url, size = 'md', onUpload, progress = null }) => {
    const sizesPx = { sm: 32, md: 40, lg: 128, xl: 64}
    const fileInputRef = useRef(null)
    const uploading = progress !== null

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        e.target.value = ''
        onUpload?.(file)
    }

    return (
        <div className={`relative rounded-full overflow-hidden ${onUpload && !uploading ? 'cursor-pointer hover:opacity-80 transition' : ''}`}
             style={{ width: sizesPx[size], height: sizesPx[size] }}
             onClick={() => onUpload && !uploading && fileInputRef.current?.click()} >
            <img src={url || defaultAvatar} alt="avatar" className="w-full h-full object-cover" />
            {uploading && (
                <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}
                     className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-surface-white">{progress}%</span>
                    <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-200"
                         style={{ width: `${progress}%` }} />
                </div>
            )}
            {onUpload && <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />}
        </div>
    )
}

export default Avatar