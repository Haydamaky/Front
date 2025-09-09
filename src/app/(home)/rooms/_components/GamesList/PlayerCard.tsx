import { api } from '@/api/build/api';
import { api } from '@/api/build/api';
import { useAppSelector } from '@/hooks/store';
import { Avatar } from '@nextui-org/react';
import { PlusCircleIcon, X } from 'lucide-react';
import { FC, useState } from 'react';

const PlayerCard: FC<{ player: any; gameId: string }> = ({
  player,
  gameId,
}) => {
  const user = useAppSelector(state => state.user);
  const handleJoinGame = () => {
    user.data && !player && api.joinGame({ id: gameId });
  };
  const [isPlayerHoveredItself, setIsPlayerHoveredItself] = useState(false);

  const handleMouseOver = () => {
    if (user.data?.id === player?.userId) {
      setIsPlayerHoveredItself(true);
    }
  };
  const handleMouseLeave = () => {
    setIsPlayerHoveredItself(false);
  };
  const onClickRemovePlayer = () => {
    api.leaveGame({ id: gameId });
  };
  return (
    <li
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={`relative flex h-full list-none flex-col gap-2 rounded-xl border border-base bg-transparent p-2 pt-6 text-base ${user.data?.id === player?.userId && 'hover:bg-[#011A36]'} ${!player && 'hover:border-red-300'} transition-all`}
      onClick={handleJoinGame}
    >
      {isPlayerHoveredItself && (
        <X
          className="absolute right-1 top-1 cursor-pointer"
          color="red"
          onClick={onClickRemovePlayer}
        />
      )}
      {!player && (
        <>
          <PlusCircleIcon
            size={40}
            color="white"
            className="self-center"
            strokeWidth={1}
          />
          <p className={`text-center font-custom text-standard`}>Join</p>
        </>
      )}

      {player && (
        <>
          <Avatar
            size="md"
            className="self-center"
            src="https://s3-alpha-sig.figma.com/img/b81a/3d66/3c6f9b66749639d081f4dda82c968c5f?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CN8lE-4LIi9ZWyXzS9TBxrwm3Sn-RFTfgzB-tT2NjHpoGTcteYmU0VgzuUp9biFTu7FEHMEdtGGVyUQZMYn28G6ea5RxWzFtz-p-3x7vvo53wlPJZ16mFdvG2joz11riVBE1XsYzDu6~Li9lITEQYTQuhz2dAO9e057VHjwX-dxlO4uYViRYVJBALulQMzdm1Oc3hUuCXKG0oxfn-rMmH0DGfmYJ5rTOceTL035i6nA3ZHIQQu4WG6iEEl7VKUPwUO8Ge6a38watOVn7dJpQZ1HzHuxKm2KDlza6EiLAAL6M2-199c-zFQfv09y0dkMUQilQlJPopeKf2pIufRiBxg__"
          />
          <p className="text-center">
            {player.userId === user.data?.id ? 'You' : player.user.nickname}
          </p>
        </>
      )}
    </li>
  );
};

export default PlayerCard;
