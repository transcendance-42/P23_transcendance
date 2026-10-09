import BackButton from '../ui/BackButton'

export default function ChatHeader({dogName}){ 
    return (
        <div>
            <div className='relative flex items-center justify-between h-16 shrink-0 border-b border-surface-alt bg-surface-cream px-4'>
                <BackButton/>
                <div className="absolute left-1/2 -translate-x-1/2 text-text-primary font-heading font-bold text-xl">{dogName}</div>
            </div>
        </div>
    );
}