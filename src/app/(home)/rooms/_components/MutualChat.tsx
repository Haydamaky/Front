'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { socket } from '@/socket';
import { MUTUAL_CHAT_ID } from '@/lib/constants';
import { MessageObjType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@nextui-org/input';
import { formatDateToTime } from '@/lib/utils';
import { useAppSelector } from '@/hooks/store';

const MutualChat = () => {
  const [message, setMessage] = useState<MessageObjType>({
    text: '',
    chatId: MUTUAL_CHAT_ID,
    updatedAt: '',
    senderId: '',
  });
  const [messages, setMessages] = useState<MessageObjType[]>([]);
  const user = useAppSelector(state => state.user);

  const isScrolledToBottom = (container: HTMLDivElement | null) =>
    container &&
    container.scrollHeight - container.scrollTop - container.clientHeight < 10;

  const handleOnMessage = (data: MessageObjType) => {
    setMessages(prevMessages => [...prevMessages, data]);
    if (
      data.senderId === user.data?.id ||
      isScrolledToBottom(containerRef.current)
    ) {
      setScroll(_ => true);
    }
  };

  const fetchChatData = async () => {
    const chatData = await socket.emitWithAck('chatData', {
      chatId: MUTUAL_CHAT_ID,
    });
    setMessages(chatData.messages);
  };

  useEffect(() => {
    socket.on('onMessage', handleOnMessage);
    fetchChatData();
    return () => {
      socket.off('onMessage', handleOnMessage);
    };
  }, []);

  const sendMessage = () => {
    socket.emit('newMessage', { text: message.text, chatId: MUTUAL_CHAT_ID });
    setMessage(prevMessage => ({ ...prevMessage, text: '' }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scroll, setScroll] = useState(true);
  const messageRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      });
      setScroll(false);
    }
  }, []);

  return (
    <div className="flex h-[40vh] max-w-3xl flex-col rounded-lg border-2 border-solid px-2 md:sticky md:top-[10vh] md:h-[80vh]">
      <h1 className="mx-auto w-32 text-center font-custom text-sm">
        Спільний чат
      </h1>
      <div className="scrollbar flex-1 overflow-y-scroll" ref={containerRef}>
        {messages.map((message, index: number) => {
          const time = formatDateToTime(message.updatedAt);
          if (index === messages.length - 1 && scroll) {
            return (
              <div key={message.id}>
                <p
                  className="bg-pink-400"
                  ref={messageRef}
                >{`${time} ${message.sender?.nickname} - ${message.text}`}</p>
              </div>
            );
          }
          return (
            <div key={message.id}>
              <p>{`${time} ${message.sender?.nickname} - ${message.text}`}</p>
            </div>
          );
        })}
      </div>
      <div className="mb-1 mt-1 flex items-center">
        <Input
          className="mr-2 w-full"
          type="text"
          size={'sm'}
          value={message.text}
          onKeyDown={handleKeyDown}
          classNames={{
            input: ['bg-base', 'text-primary', 'placeholder:text-primary'],
            inputWrapper: ['divide-solid border-2'],
          }}
          placeholder="Написати повідомлення..."
          radius="sm"
          onChange={e =>
            setMessage(prevMessage => ({
              ...prevMessage,
              text: e.target.value,
            }))
          }
        />
        <Button size="sm" onClick={sendMessage} variant={'tertiary'}>
          надіслати
        </Button>
      </div>
    </div>
  );
};

export default MutualChat;
