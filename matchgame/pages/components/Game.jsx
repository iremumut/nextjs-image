import { useEffect, useState } from "react";
import Card from "./Card";

const Game = () => {

    const [pics, setPics] = useState([]);
    const [selected, setSelect] = useState([]);
    const [win, setWin] = useState(false);

    function randomElm(arr) {
        const arr1 = [...arr];
        const arr2 = [];
        for (let index = 0; index < 8; index++) {
            const rand = (Math.floor(Math.random() * arr1.length));
            arr2.push(arr1[rand]);
            arr1.splice(rand, 1);
        }
        console.log(arr2);
        return arr2;
    }

    function onSelect(id) {
        if (selected.length < 2) {
            setSelect(prev => [...prev, id]);
            return true;
        } else {
            return false;
        }
    }

    function closeCard(close) {
        close();
    }

    useEffect(() => {
        fetch("https://picsum.photos/v2/list?page=1&limit=8")
            .then(res => res.json())
            .then(data => {
                const arrData = data.map(e => e.id);
                setPics([...randomElm(arrData), ...randomElm(arrData)]);
            })
    }, []);

    if (selected.length === 2 && selected[0] === selected[1]) {
        setPics(pics.filter(e => e === selected[0]));
        setSelect([]);
        console.log("You won the game.");
    }

    console.log(selected);

    return <div>
        {pics.map((pic, i) => {
            return (<Card key={i} img={pic} onSelect={onSelect} selectedCount={selected.length === 0} />);
        })}
    </div>
}

export default Game;