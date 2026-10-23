import MessageBubble from "./MessageBubble";
import { useRef } from "react";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next'

export default function MessageList({messages, userId}) {
    const { t } = useTranslation()
    const bottomRef = useRef(null);
    useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}, [messages])
    if (messages.length === 0){
        return (
            <div className="flex flex-1 flex-col items-center justify-center bg-surface-cream p-5 text-text-caption">
                {t('StartConv')}
            </div>
        )
    }
    return (
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-surface-cream p-5 min-h-0">
            
                    {messages.map (m =>
                        <MessageBubble
                        key={m.id}
                        senderName={m.users.first_name}
                        send_at= {m.send_at}
                        text={m.content}
                        isMine={m.sender_id === userId}
                        />
                    )}
                    <div ref={bottomRef} />
        </div>
    )
}