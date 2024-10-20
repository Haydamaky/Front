'use client';

import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { MUTUAL_CHAT_ID } from 'lib/constants';

type MessageObjType = {
  text: string;
  chatId: number;
  userId?: number;
  nickname?: string;
};

const RoomsPage = () => {
  const [message, setMessage] = useState<MessageObjType>({
    text: '',
    chatId: MUTUAL_CHAT_ID,
  });
  const [messages, setMessages] = useState<MessageObjType[]>([]);
  useEffect(() => {
    socket.on('onMessage', (data: MessageObjType) => {
      setMessages(prevMessage => [...prevMessage, data]);
    });

    socket.on('error', (err: any) => {
      console.log(err);
    });

    async function getChatData() {
      const chatData = await socket.emitWithAck('chatData', {
        chatId: MUTUAL_CHAT_ID,
      });
      setMessages(chatData.messages);
    }
    getChatData();

    return () => {
      socket.off('onMessage');
      socket.off('error');
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('newMessage', { text: message.text, chatId: MUTUAL_CHAT_ID });
      setMessage({ text: '', chatId: MUTUAL_CHAT_ID });
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msgObj, index) => (
          <p key={index}>{msgObj.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={message?.text}
        onChange={e =>
          setMessage(prevMessageObj => ({
            ...prevMessageObj,
            text: e.target.value,
          }))
        }
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default RoomsPage;
