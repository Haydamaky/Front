import { FC } from 'react';

const Message: FC<{
  name: string;
  text: string;
  color: string;
  time: string;
}> = ({ name, text }) => {
  return (
    <li className="flex flex-row gap-[0.2rem] text-white">
      <div className="w-fit rounded-sm bg-gradient-to-r from-cyan-500 to-red-400 px-2 py-1">
        <span>{name}</span>
      </div>
      <div className="flex flex-row items-center">
        <span>
          {' : '}
          {text}
        </span>
      </div>
    </li>
  );
};

export default Message;
