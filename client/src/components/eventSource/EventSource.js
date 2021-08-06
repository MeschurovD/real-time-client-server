import React, { useEffect, useState } from 'react';
import axios from "axios";


const EventSource1 = () => {

  const [messages, setMessages] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {
    sub()
  }, [])

  //Получение сообщений
  const sub = async () => {
    console.log('qwe')
    const eventSource = new EventSource('http://localhost:5000/connect')
    eventSource.onmessage = function(event) {
      const data = JSON.parse(event.data)
      setMessages(prev => [data, ...prev])
      console.log(data)
       
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
      key: Date.now()
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

export default EventSource1;