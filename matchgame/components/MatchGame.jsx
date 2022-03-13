import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card';
import { compare, initialFetch } from '../store/gameSlice';
import Winner from './Winner';
import heart from '../assets/heart.svg';
import Image from 'next/image';
import Loser from './Loser';

const MatchGame = () => {


    const { status, card, selected, win, lives } = useSelector(store => store.game);
    const dispatch = useDispatch();

    useEffect(() => {
        if (win === false && lives !== 0) {
            dispatch(initialFetch());
            console.log("initialFetch");
        }
        console.log("use Effect: initialFetch");
    }, [win, lives !== 0]);

    useEffect(() => {
        console.log("Testt");

        if (selected.length === 2) {
            setTimeout(() => {
                dispatch(compare());
            }, 1500);
        }

    }, [selected]);

    const lives_count = Array(lives).fill(1).map(e => {
        return <Image src={heart} alt="live" />;
    });

    if (win) {
        return <Winner />
    } else if (lives === 0) {
        return <Loser />
    }
    return <div>
        <div>
            {lives_count}
        </div>
        <div className='grid grid-cols-4 gap-4'>
            {card.map(e => {
                return <Card item={e} />
            })}
        </div>
    </div>
}

export default MatchGame;