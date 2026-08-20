import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000') // Backend server URL

const initalFormData = {
  room: '',
  userName: '',
  message: '',
}

function App() {
  const [formData, setFormData] = useState(initalFormData)

  const [messages, setMessages] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleEnterRoom = () => {
    socket.emit('join_room',
    formData.room,
    )
  }

  const handleSendMessage = () => {
    const messageData = {
      message: formData.message,
      room: formData.room,
      userName: formData.userName,
      timeStamp: new Date().toISOString(),
      type: 'sent',
    }
    socket.emit('send_message', messageData)

    setMessages((prevMessages) => [...prevMessages, messageData])

    // Clear message input
    setFormData((prev) => ({ ...prev, message: '' }))
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...data, type: 'received' }, // Mark this message as received
      ])
    })

    return () => {
      socket.off('receive_message') // Clean up the listener when the component unmounts
    }
  }, [socket])

  return (
    <div className='App'>
      <div>
        <input
          name='room'
          placeholder='Room...'
          value={formData.room}
          onChange={handleChange}
        />
        <input
          name='userName'
          placeholder='User Name...'
          value={formData.userName}
          onChange={handleChange}
        />
        <button onClick={handleEnterRoom}>Enter Room</button>
      </div>
      <div>
        <input
          name='message'
          placeholder='Message...'
          value={formData.message}
          onChange={handleChange}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      <div>
        Message:
        <div style={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <div key={index} style={styles.messageWrapper(msg.type)}>
              <div>{msg.message}</div>
              <div style={styles.timestamp}>
                <div>{msg.userName}</div>
                <div>{new Date(msg.timeStamp).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  messagesContainer: {
    width: '520px',
    height: '520px',
    border: '1px solid black',
    overflowY: 'scroll',
  },
  messageWrapper: (type) => ({
    margin: '10px',
    textAlign: type === 'sent' ? 'right' : 'left',
  }),
  timestamp: {
    fontSize: '12px',
    color: 'gray',
  },
}

export default App