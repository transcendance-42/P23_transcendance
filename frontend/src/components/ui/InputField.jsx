import { useState } from 'react';
import {useTranslation} from 'react-i18next';

const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>)

const EyeOffIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>)

const InputField = ({ type = 'text', value, onChange, placeholder, label, id }) => {
    const {t} = useTranslation()
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type
    
    
    return (
    <div className="w-full flex flex-col gap-1">
        {label && (
            <label htmlFor={id} className="text-sm text-text-caption">
                {label}
            </label>
        )}
        <div className="relative w-full">
        <input
            id={id}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full bg-transparent border border-text-tertiary rounded-lg px-4 py-3 text-white placeholder-text-caption focus:outline-none focus:border-primary transition ${isPassword ? 'pr-12' : ''}`}
        />
        {isPassword && (
            <button type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? t('HidePassword') : t('ShowPassword')}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-text-caption hover:text-primary transition'
            >{showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        )}
        </div>
   </div>
    )
}
export default InputField