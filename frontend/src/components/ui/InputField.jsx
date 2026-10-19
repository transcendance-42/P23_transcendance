const InputField = ({ type = 'text', value, onChange, placeholder, label, id }) => (
    <div className="w-full flex flex-col gap-1">
        {label && (
            <label htmlFor={id} className="text-sm text-text-caption">
                {label}
            </label>
        )}
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-transparent border border-text-tertiary rounded-lg px-4 py-3 text-white placeholder-text-caption focus:outline-none focus:border-primary transition"
        />
    </div>
)

export default InputField