const Modal = ({ children, onClose, width = 'w-full mx-4 sm:w-[28rem]', bg = '' }) => (
    <div className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center ${bg}`}>
        <div className={`relative bg-surface-raised rounded-[var(--radius-md)] p-8 ${width} flex flex-col items-center gap-4 text-white overflow-y-auto max-h-[90vh]`}>
            {onClose && (
                <button onClick={onClose} className="absolute top-3 right-3 text-text-caption hover:text-surface-white text-xl transition">
                    ✕
                </button>
            )}
            {children}
        </div>
    </div>
)
export default Modal