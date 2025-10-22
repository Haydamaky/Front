'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageObjType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@nextui-org/input';
import { formatDateToTime } from '@/lib/utils';
import { useAppSelector } from '@/hooks/store';
import { api } from '@/api/build/api';
import Image from 'next/image';

const MutualChat = () => {
  const [message, setMessage] = useState<MessageObjType>({
    text: '',
    chatId: '',
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
      setScroll(true);
    }
  };

  const fetchChatData = async () => {
    const chatData = await api.mutualChatData();
    setMessage(prevMessage => ({ ...prevMessage, chatId: chatData.id }));
    setMessages(chatData.messages);
  };

  useEffect(() => {
    api.on.onMessage(handleOnMessage);
    fetchChatData();
    return () => {
      api.off.onMessage(handleOnMessage);
    };
  }, [user]);

  const sendMessage = () => {
    api.newMessage({
      newMessage: { text: message.text, chatId: message.chatId },
    });
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
    <div className="flex h-full w-full flex-col rounded-lg bg-chatGradient px-2 md:sticky md:top-[10vh]">
      <h1 className="mx-auto mt-2 w-full text-center font-custom text-xl">
        Group Chat
      </h1>
      <div className="scrollbar flex-1 overflow-y-scroll" ref={containerRef}>
        <div className="flex min-h-full flex-col justify-end">
          {messages.map((message, index: number) => {
            const time = formatDateToTime(message.updatedAt);
            if (index === messages.length - 1 && scroll) {
              return (
                <div key={message.id}>
                  <p
                    className="break-all"
                    ref={messageRef}
                  >{`${time} ${message.sender?.nickname} - ${message.text}`}</p>
                </div>
              );
            }
            return (
              <div key={message.id}>
                <p className="break-all">{`${time} ${message.sender?.nickname} - ${message.text}`}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-1 mt-1 flex items-center">
        <Input
          className="mr-2 w-full"
          type="text"
          size={'sm'}
          value={message.text}
          onKeyDown={handleKeyDown}
          classNames={{
            input: [
              'text-[rgba(245,239,255,0.51)]',
              'placeholder:text-[rgba(245,239,255,0.51)]',
              'bg-transparent',
              '!bg-transparent',
            ],
            inputWrapper: [
              'bg-transparent',
              '!bg-transparent',
              'hover:!bg-transparent',
              'focus:!bg-transparent',
              'focus-within:!bg-transparent',
              'data-[hover=true]:!bg-transparent',
              'data-[focus=true]:!bg-transparent',
              'data-[focus-within=true]:!bg-transparent',
              'data-[filled=true]:!bg-transparent',
              'group-data-[focus=true]:!bg-transparent',
              'group-data-[focus-within=true]:!bg-transparent',
              'group-data-[filled=true]:!bg-transparent',
              'divide-solid',
              'border border-[rgba(245,239,255,0.25)]',
            ],
            innerWrapper: [
              'bg-transparent',
              '!bg-transparent',
              'hover:!bg-transparent',
              'focus:!bg-transparent',
              'data-[hover=true]:!bg-transparent',
              'group-data-[focus=true]:!bg-transparent',
            ],
          }}
          placeholder="Write a message..."
          radius="sm"
          onChange={e =>
            setMessage(prevMessage => ({
              ...prevMessage,
              text: e.target.value,
            }))
          }
        />
        <Button
          onClick={sendMessage}
          variant={'chatButton'}
          className="h-full w-9"
        >
          <Image
            src="/images/MessageBtn.svg"
            alt="telegram"
            width={25}
            height={25}
          />
        </Button>
      </div>
    </div>
  );
};

export default MutualChat;
