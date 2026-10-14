import BackButton from './BackButton'

const Modal = ({ children, onClose, width = 'w-full mx-4 sm:w-[28rem]', bg = '' , showBack = false}) => (
    <div className={`fixed inset-0 z-50  flex items-center justify-center ${bg}`}>
        <div className={`relative bg-surface-raised rounded-[var(--radius-md)] p-8 ${width} flex flex-col items-center gap-4 text-white overflow-y-auto max-h-[90vh]`}>
            {showBack && (
                <div className="absolute top-3 left-3">
                    <BackButton />
                </div>
            )}
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