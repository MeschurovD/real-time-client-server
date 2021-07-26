import React, { useEffect, useState } from 'react';
import axios from "axios";

import './style.css'

const LongPulling = () => {

  const [messages, setMessages] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {
    sub()
  }, [])

  const sub = async () => {
    try {
      const {data} = await axios.get('http://localhost:5000/get-messages')
      console.log(data)
      setMessages(prev => [data, ...prev])
      await sub()
    } catch (e) {
      setTimeout(() => {
        sub()
      }, 500)
    }
  }

  /**
   * Обработка Input
   * @param {*} event 
   */
  const changeValue = (event) => {
    setValue(event.target.value)
  }

  /**
   * Отправка сообщения на сервер
   */
  const sendMessage = async () => {
    const message = value
    setValue('')
    await axios.post('http://localhost:5000/new-messages', {
      message,
      id: Date.now()
    })
    
  
  }

   
  return (
    <div className='center'>
      <div>
        <div className='form'>
          <input value={value} onChange={changeValue} type="text"></input>
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className='messages'>
          {messages.map(item => 
            <div className='message' key={item.key}>
              {item.message}
            </div>
            )}
        </div>
      </div>
      
    </div>
  );
};

export default LongPulling;