export default function ChatHeader({link, dogName}){
    
    return (
        <div>
            <div className='relative flex items-center justify-between h-16 shrink-0 border-b border-surface-alt bg-surface-cream px-4'>
            <button onClick={link}
                className='md:hidden bg-primary hover:bg-primary-hover text-surface-white rounded-md px-3 py-2 text-sm font-semibold transition'
            >
                Back
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 text-text-primary font-heading font-bold text-xl">{dogName}</div>
        </div>
        </div>
    );
}