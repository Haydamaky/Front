import { useAppSelector } from '@/hooks/store';
import { socket } from '@/socket';
import { Game } from '@/types';
import { Avatar } from '@nextui-org/react';
import { Plus, PlusCircleIcon } from 'lucide-react';
import { FC } from 'react';

const PlayerCard: FC<{ player: any; gameId: string }> = ({
  player,
  gameId,
}) => {
  const user = useAppSelector(state => state.user);
  const handleJoinGame = () => {
    user.data && socket.emit('joinGame', { id: gameId });
  };

  return (
    <li
      className={`flex list-none flex-col gap-6 rounded-md pt-6 ${player ? 'bg-white' : 'bg-transparent'} h-full rounded-md border-2 border-white p-2 ${!player && 'hover:border-red-300'} transition-all`}
      onClick={handleJoinGame}
    >
      {!player && (
        <>
          <PlusCircleIcon size={40} color="white" className="self-center" />
          <p className={`text-center font-custom text-standard text-white`}>
            Join
          </p>
        </>
      )}

      {player && (
        <>
          <Avatar
            size="lg"
            className="self-center"
            src="https://s3-alpha-sig.figma.com/img/b81a/3d66/3c6f9b66749639d081f4dda82c968c5f?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CN8lE-4LIi9ZWyXzS9TBxrwm3Sn-RFTfgzB-tT2NjHpoGTcteYmU0VgzuUp9biFTu7FEHMEdtGGVyUQZMYn28G6ea5RxWzFtz-p-3x7vvo53wlPJZ16mFdvG2joz11riVBE1XsYzDu6~Li9lITEQYTQuhz2dAO9e057VHjwX-dxlO4uYViRYVJBALulQMzdm1Oc3hUuCXKG0oxfn-rMmH0DGfmYJ5rTOceTL035i6nA3ZHIQQu4WG6iEEl7VKUPwUO8Ge6a38watOVn7dJpQZ1HzHuxKm2KDlza6EiLAAL6M2-199c-zFQfv09y0dkMUQilQlJPopeKf2pIufRiBxg__"
          />
          <p className="text-center text-black">
            {player.userId === user.data?.id ? 'You' : player.user.nickname}
          </p>
        </>
      )}
    </li>
  );
};

export default PlayerCard;
