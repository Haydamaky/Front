import { useGameCenterFunctionality } from '../_hooks/useGameCenterFunctionality';
import ActionsSection from './Actions/ActionsSection';
import Auction from './Auction/Auction';
import Chat from './Chat/Chat';
import DicesContainer from './Dice/DicesContainer';
import TradeAcceptence from './Trade/TradeAcceptence';
import TradeOffer from './Trade/TradeOffer';
import WinnerDisplay from './WinnerDisplay';

const Center = () => {
  const {
    tradeAcceptance,
    setTradeAcceptance,
    trade,
    turnOfUser,
    currentField,
    currentPlayer,
    chipTransition,
    action,
    game,
    secretInfo,
    amountToPay,
    auction,
    playerWon,
  } = useGameCenterFunctionality();

  return (
    <div className="relative h-full p-3">
      {tradeAcceptance && (
        <TradeAcceptence
          trade={tradeAcceptance}
          setTradeAcceptance={setTradeAcceptance}
        />
      )}
      {trade && <TradeOffer />}
      <div className="absolute left-[50%] top-[2%] w-[calc(100%-24px)] translate-x-[-50%]">
        {turnOfUser &&
          !currentPlayer?.lost &&
          !chipTransition &&
          action &&
          action !== 'auction' &&
          (currentField.ownedBy !== game.turnOfUserId || !game.dices) && (
            <ActionsSection
              action={action}
              currentField={currentField}
              secretInfo={secretInfo}
              amountToPay={amountToPay}
            />
          )}
      </div>
      <Auction
        isOpen={action === 'auction'}
        currentField={currentField}
        auction={auction}
        defaultOpen={!!auction && action === 'auction'}
      />
      <div className="absolute left-[50%] top-[46%] translate-x-[-50%] translate-y-[-50%]">
        <div className="flex gap-5">
          <DicesContainer />
        </div>
      </div>
      <Chat chatId={game?.chat?.id} gameId={game.id} players={game.players} />
      {playerWon && !chipTransition && <WinnerDisplay playerWon={playerWon} />}
    </div>
  );
};

export default Center;
