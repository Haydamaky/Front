'use client';

import { api } from '@/api/build/api';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setFields } from '@/store/slices/fields';
import { DataWithGame } from '@/types';
import { Player } from '@/types/player';
import { useEffect, useRef, useState } from 'react';
import PlayerCard from '../playerCard/PlayerCard';
import { useGameState } from '@/hooks/useGameState';

const PlayersList = () => {
    const dispatch = useAppDispatch();
    const { game, loading, user } = useGameState();
    const fields = useAppSelector(state => state.fields.fields);
    const { data: chipTransition } = useAppSelector(state => state.chipTransition);

    const [turnTime, setTurnTime] = useState(0);
    const rolledDice = useRef(false);
    const intervalRef = useRef<null | NodeJS.Timeout>(null);

    const startCountdown = (timeToEnd: number) => {
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
                p => p.userId === game.turnOfUserId,
            );
            const currentField = fields.find(
                f => f.index === currentPlayer?.currentFieldIndex,
            );

            if (currentField?.ownedBy === user.data?.id) {
                api.passTurn();
            }

            rolledDice.current = false;
        }
    }, [game, chipTransition, fields, user.data?.id]);

    useEffect(() => {
        const handleFieldsUpdate = (data: DataWithGame) => {
            if (data.fields) {
                dispatch(setFields(data.fields));
            }
        };

        const setRolledDiceapi = () => (rolledDice.current = true);

        api.on.rolledDice(setRolledDiceapi);
        api.onMany(
            ['hasPutUpForAuction', 'gameData', 'passTurnToNext', 'updateGameData'],
            calculateTimeToEndAndSetStates,
        );
        api.onMany(
            ['hasPutUpForAuction', 'gameData', 'passTurnToNext', 'updateGameData'],
            handleFieldsUpdate,
        );

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            api.off.rolledDice(setRolledDiceapi);
            api.offMany(
                ['hasPutUpForAuction', 'gameData', 'passTurnToNext', 'updateGameData'],
                calculateTimeToEndAndSetStates,
            );
            api.offMany(
                ['hasPutUpForAuction', 'gameData', 'passTurnToNext', 'updateGameData'],
                handleFieldsUpdate,
            );
        };
    }, [dispatch]);

    if (loading) return null;

    return (
        <div className="relative my-auto flex h-[88%] flex-col gap-[2.7%] overflow-visible text-xs md:text-sm lg:text-lg">
            {game?.players?.map((player: Player, index) => (
                <PlayerCard
                    key={player.id}
                    player={player}
                    turnOfUserId={game.turnOfUserId}
                    turnTime={turnTime}
                    index={index}
                />
            ))}
        </div>
    );
};

export default PlayersList;
