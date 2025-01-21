import { Input } from '@/components/ui/input';
import { socket } from '@/socket';
import { MessageObjType } from '@/types';
import { Button } from '@nextui-org/react';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Message from './message';
import { Player, PlayerColor } from '@/types/player';
import { gradientColorVariants } from '../../_utils';

const Chat: FC<{ chatId: string; gameId: string; players: Player[] }> = ({
  chatId,
  gameId,
  players,
}) => {
  const isInitialRender = useRef<boolean>(true);
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

  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (isInitialRender.current && messages.length)
      isInitialRender.current = false;
  }, [messages]);

  const refMessage = useCallback(
    (node: HTMLLIElement) => {
      if (divRef.current && node) {
        const isAllowedToScroll =
          Math.ceil(
            divRef.current.clientHeight +
              divRef.current.scrollTop +
              divRef.current.firstElementChild?.firstElementChild
                ?.clientHeight! *
                6,
          ) >= divRef.current.scrollHeight;

        if (isAllowedToScroll || isInitialRender.current) node.scrollIntoView();
      }
    },
    [divRef.current],
  );

  return (
    <div className="grid h-[-webkit-fill-available] grid-rows-[92%_8%]">
      <div className="scrollbar mt-2 block overflow-y-scroll" ref={divRef}>
        <div className="flex min-h-full flex-col justify-end gap-2">
          {messages.map((message, index) => {
            const player = players.find(
              ({ userId }) => message.senderId === userId,
            );
            return (
              <Message
                key={message.id}
                name={message.sender?.nickname as string}
                text={message.text}
                color={
                  gradientColorVariants[
                    player?.color as Exclude<PlayerColor, 'pink' | 'red'>
                  ]
                }
                ref={index === messages.length - 1 ? refMessage : null}
                time={message.updatedAt}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-auto flex flex-row items-center justify-center gap-2">
        <Input
          type="text"
          className="h-8 border-white"
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
