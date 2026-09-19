import Mascot from "../ui/Mascot"
import CallToAction from "./CallToAction"
import { useTranslation } from 'react-i18next'

export default function Hero(){
    const { t } = useTranslation()
    return (
        <div className="bg-surface-cream flex flex-col min-h-[80vh] items-center justify-center gap-4">
            <Mascot size='lg' index={6}/>
            <div className="flex flex-col gap-3">
                <h1 className="font-heading font-bold text-6xl md:text-8xl text-text-primary">Tindog</h1>
                <p className="font-body font-semibold text-base"> {t('Hero1')} </p>
            </div>
            <CallToAction to="/register">{t('Hero2')}  <span>→</span></CallToAction>
        </div>
    ) 
}