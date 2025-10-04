import { Button } from '@/components/ui/button';
import useScreenSize from '@/hooks/screenSize';
import { Player } from '@/types/player';

interface SecretPayActionProps {
  secretInfo: {
    users: string[];
    amounts: number[];
  };
  amountToPay: number;
  gamePlayers: Player[];
  onPay: () => void;
}

const SecretPayAction = ({
  secretInfo,
  amountToPay,
  gamePlayers,
  onPay,
}: SecretPayActionProps) => {
  const screenSize = useScreenSize();

  const getSecretMessage = () => {
    if (secretInfo.users.length === 1) {
      return `The unknown demands sacrifices! You have entered a secret field and must make a payment.`;
    } else {
      const player = gamePlayers.find(
        player => player.userId === secretInfo?.users[0],
      );
      return `Player ${player?.user.nickname} activated a secret field, and this led to an event that affected you.`;
    }
  };

  return (
    <>
      <div className="mb-3 flex w-full items-center gap-2 font-fixelDisplay">
        <p className="text-[10px]">{getSecretMessage()}</p>
      </div>
      <Button
        variant={'blueGame'}
        size={screenSize.width > 1200 ? 'default' : 'xs'}
        className="font-custom text-[9px] text-white md:text-sm lg:text-lg"
        onClick={onPay}
      >
        Pay {Math.abs(amountToPay)}
      </Button>
    </>
  );
};

export default SecretPayAction;
