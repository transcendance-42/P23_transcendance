import React from 'react'
import Message from './Message'

export default function MessagePanel({channel})
{
    let list = "There is no message to display"
    if (channel && channel.Message)
    {
        list = channel.Message.map (m =>
            <Message
            messageKey={m.id}
            id={m.id}
            senderName={m.senderName}
            text={m.text}
            />
        )
    }
    return(
        <div>
            <div className='message-panel'></div>
                <div className='messages-list'>
                    {list}
                </div>
            <div className='message-input'>
                <input type="text" />
                <button>Send</button>
            </div>
        </div>
    );
}

