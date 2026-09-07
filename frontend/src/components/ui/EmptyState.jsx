const EmptyState = ({ title, subtitle }) => (
    <div className="w-100 h-150 bg-pink-200 rounded-2xl shadow-md flex flex-col items-center justify-center">
        <p style={{ fontFamily: 'Bevan, serif' }} className="text-3xl text-pink-400 text-center">{title}</p>
        <p className="text-gray-400 mt-2">{subtitle}</p>
    </div>
)
export default EmptyState