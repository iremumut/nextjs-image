import { useState, useEffect } from "react";

const Card = ({ img, onSelect, selectedCount }) => {

    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        if (selectedCount) {
            setOpen(false);
        }
    });

    const onClickHandle = () => {
        if (!isOpen && onSelect(img)) {
            setOpen(prev => !prev);
        }
    }

    return <div onClick={onClickHandle}>
        <img src={`https://picsum.photos/id/${img}/200/300`} alt="image" />
    </div>
}

export default Card;