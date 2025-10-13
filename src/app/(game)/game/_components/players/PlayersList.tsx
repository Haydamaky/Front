'use client';

import { api } from '@/api/build/api';
import { useAppSelector } from '@/hooks/store';
import { DataWithGame } from '@/types';
import { Player } from '@/types/player';
import { useEffect, useRef, useState } from 'react';
import PlayerCard from '../playerCard/PlayerCard';
import { useGameStateSync } from '@/hooks/useGameStateSync';

const PlayersList = () => {
    const { game, fields, user } = useGameStateSync();

    const { data: chipTransition } = useAppSelector(
        state => state.chipTransition,
    );
    const [turnTime, setTurnTime] = useState(0);
    const rolledDice = useRef(false);
    const intervalRef = useRef<null | NodeJS.Timeout>(null);

    const startCountdown = (timeToEnd: any) => {
        let countDown = timeToEnd;
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (countDown <= -1) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                return;
            }
            countDown--;
            setTurnTime(prev => prev - 1);
        }, 1000);
    };

    const calculateTimeToEndAndSetStates = ({ game }: DataWithGame) => {
        const now = Date.now();
        const timeToEnd = Math.ceil((+game.turnEnds - now) / 1000);
        setTurnTime(timeToEnd);
        startCountdown(timeToEnd);
    };

    useEffect(() => {
        if (rolledDice.current && !chipTransition) {
            calculateTimeToEndAndSetStates({ game });
            const currentPlayer = game.players.find(
                player => player.userId === game.turnOfUserId,
            );
            const currentField = fields.find(
                fields => fields.index === currentPlayer?.currentFieldIndex,
            );
            if (currentField?.ownedBy === user.data?.id) {
                api.passTurn();
            }

            rolledDice.current = false;
        }
    }, [game, chipTransition]);

    useEffect(() => {
        const setRolledDiceapi = () => {
            rolledDice.current = true;
        };
        api.on.rolledDice(setRolledDiceapi);
        api.onMany(
            ['hasPutUpForAuction', 'gameData', 'passTurnToNext', 'updateGameData'],
            calculateTimeToEndAndSetStates,
        );

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            api.offMany(
                ['hasPutUpForAuction', 'gameData', 'passTurnToNext', 'updateGameData'],
                calculateTimeToEndAndSetStates,
            );
            api.off.rolledDice(setRolledDiceapi);
        };
    }, [user.data]);

    return (
        <div className="relative my-auto flex h-[88%] flex-col gap-[2.7%] overflow-visible text-xs md:text-sm lg:text-lg">
            {game?.players &&
                game.players?.map((player: Player, index) => {
                    return (
                        <PlayerCard
                            player={player}
                            key={player.id}
                            turnOfUserId={game.turnOfUserId}
                            turnTime={turnTime}
                            index={index}
                        ></PlayerCard>
                    );
                })}
        </div>
    );
};

export default PlayersList;