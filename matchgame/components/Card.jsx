import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compare, select } from "../store/gameSlice";

const Card = ({ item }) => {

    const selected = useSelector(store => store.game.selected);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (selected.length <= 1 && !item.isOpen) {
            dispatch(select(item));
        }
    }

    return <div onClick={handleClick} className={`flip-content w-[100px] h-[100px] ${(item.isOpen === true) ? 'flip-item' : ''} ${item.hidden === true ? 'item-hidden' : ''} `}>
        <div className="flip-front grid grid-cols-1 justify-items-center content-center">
            <h1 className="text-5xl font-bold">?</h1>
        </div>
        <div className="flip-back">
            <img src={`https://picsum.photos/id/${item.img}/100/100`} alt="image" />
        </div>
    </div >
}

export default Card;