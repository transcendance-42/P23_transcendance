const Modal = ({ children, onClose, width = 'w-96', bg = '' }) => (
    <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center ${bg}`}>
        <div className={`relative bg-neutral-900 rounded-2xl p-8 ${width} flex flex-col items-center gap-4 text-white overflow-y-auto max-h-[90vh]`}>
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