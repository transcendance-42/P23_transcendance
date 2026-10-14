import { useState } from 'react'
import i18n from '../../i18n'

const LangSwitcher = () => {
    const [lang, setLang] = useState(i18n.language?.slice(0, 2) || 'en')
    const changeLang = (l) => {
        setLang(l)
        i18n.changeLanguage(l)
    }
    return (
        <div className="flex justify-center gap-4">
            {['fr', 'en', 'de'].map(l => (
                <button key={l} onClick={() => changeLang(l)}
                    className={`text-2xl transition-all hover:scale-110 ${lang === l ? 'opacity-100 scale-110' : 'opacity-30'}`}>
                    {l === 'fr' ? '🇫🇷' : l === 'en' ? '🇬🇧' : '🇩🇪'}
                </button>
            ))}
        </div>
    )
}
export default LangSwitcher