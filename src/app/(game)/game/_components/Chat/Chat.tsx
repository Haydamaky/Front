import { Input } from '@/components/ui/input';
import { socket } from '@/socket';
import { MessageObjType } from '@/types';
import { Button } from '@nextui-org/react';
import { FC, useCallback, useEffect, useState } from 'react';
import message from './message';
import Message from './message';

const Chat: FC<{ chatId: string; gameId: string }> = ({ chatId, gameId }) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<MessageObjType[]>([]);

  useEffect(() => {
    socket.on('gameChatMessage', onChatMessage);
    if (chatId) getChatData();
    return () => {
      socket.off('gameChatMessage');
    };
  }, [chatId]);

  const getChatData = useCallback(async () => {
    const chatData = await socket.emitWithAck('chatData', { chatId });
    setMessages(chatData.messages);
  }, [chatId]);

  const onChatMessage = useCallback(async (message: MessageObjType) => {
    setMessages(curr => [...curr, message]);
  }, []);

  const onSendMessage = useCallback(() => {
    socket.emit('newGameMessage', { chatId, text, gameId });
    setText('');
  }, [chatId, text, gameId]);

  return (
    <div className="grid h-[-webkit-fill-available] grid-rows-[90%_10%] p-2">
      <div className="scrollbar flex-1 flex-col gap-2 overflow-y-scroll">
        <div className="flex flex-col gap-2">
          {messages.map(message => (
            <Message
              name={message.sender?.nickname as string}
              text={message.text}
              color={'red'}
              time={message.updatedAt}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <Input
          type="text"
          className="h-8"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Написати повідомлення"
        />

        <Button
          className="h-8 rounded-[5px] bg-white font-custom"
          onClick={onSendMessage}
        >
          надіслати
        </Button>
      </div>
    </div>
  );
};

export default Chat;
