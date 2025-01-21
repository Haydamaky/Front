import { FC, forwardRef } from 'react';

interface MessageProps {
  name: string;
  text: string;
  color: string;
  time: string;
}

const Message = forwardRef<HTMLLIElement, MessageProps>(
  ({ name, text, color }, ref) => {
    return (
      <li
        className="inline-flex items-center gap-[0.2rem] leading-none text-white"
        ref={ref}
      >
        <p
          className="flex items-center rounded-sm px-1 pb-[2px] text-lg"
          style={{
            background: color,
          }}
        >
          {name}
        </p>
        <div className="flex flex-row items-center">
          <span>
            {' : '}
            {text}
          </span>
        </div>
      </li>
    );
  },
);

export default Message;
