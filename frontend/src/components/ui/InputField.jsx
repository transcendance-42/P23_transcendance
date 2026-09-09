const InputField = ({ type = 'text', value, onChange, placeholder }) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent border border-text-tertiary rounded-lg px-4 py-3 text-white placeholder-text-caption focus:outline-none focus:border-primary transition"
    />
)

export default InputField