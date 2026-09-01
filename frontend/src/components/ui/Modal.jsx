const Modal = ({ children, onClose, width = 'w-100' }) => (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className={`relative bg-neutral-900 rounded-2xl p-8 ${width} flex flex-col items-center gap-4 text-white`}>
            {onClose && (
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl transition">
                    ✕
                </button>
            )}
            {children}
        </div>
    </div>
)
export default Modal