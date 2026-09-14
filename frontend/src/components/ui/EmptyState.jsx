const EmptyState = ({ title, subtitle }) => (
    <div className="w-[90vw] h-[70vh] sm:w-100 sm:h-150 bg-surface-cream rounded-2xl shadow-md flex flex-col items-center justify-center">
        <p className="text-3xl text-primary text-center font-heading ">{title}</p>
        <p className="text-text-caption mt-2">{subtitle}</p>
    </div>
)
export default EmptyState