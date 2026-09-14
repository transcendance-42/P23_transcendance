export default function ProfileField({ label, type = 'text', value, onChange }) {
    return (
        <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-text-caption">
                {label}
            </span>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full rounded-md border border-text-caption/40 bg-surface-white px-3 py-2 text-text-primary outline-none transition focus:border-primary"
            />
        </label>
    )
}