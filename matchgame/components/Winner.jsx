import { useDispatch } from "react-redux";
import { resetGame } from "../store/gameSlice";

const Winner = () => {

    const dispatch = useDispatch();

    return <>
        <img src="https://i.giphy.com/media/etKSrsbbKbqwW6vzOg/giphy.webp" alt='winning' className="w-[400px] m-4" />
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            dispatch(resetGame());
        }}>Play again</button>
    </>
}

export default Winner;