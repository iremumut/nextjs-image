import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from "uuid";

const initialState = {
    card: [],
    selected: [],
    lives: 8,
    win: false,
    status: 'idle',
    error: null
}

export const initialFetch = createAsyncThunk("fetchImage", () => {
    return fetch("https://picsum.photos/v2/list?page=1&limit=8")
        .then(res => res.json())
        .then(data => data);
});

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function createCard(id) {
    return { id: uuid(), img: id, isOpen: false, hidden: false };
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        select: (state, action) => {
            const item = state.card.find(e => e.id === action.payload.id);
            item.isOpen = true;
            state.selected.push({ ...action.payload, isOpen: true });
        },
        compare: (state) => {
            if (state.selected[0].img === state.selected[1].img) {
                state.card = state.card.map(e => {
                    if (e.img === state.selected[0].img) {
                        return { ...e, hidden: true }
                    } else {
                        return e;
                    }
                });
                state.selected = [];
            } else {
                state.selected = [];
                state.card = state.card.map(c => {
                    return { ...c, isOpen: false }
                });
                state.lives -= 1;
            }
            state.win = state.card.find(e => e.hidden === false) ? false : true;
        },
        resetGame: (state) => {
            state.win = false;
            state.card = [];
            state.selected = [];
            state.lives = 8;
            state.status = 'idle';
        }
    },
    extraReducers: {
        [initialFetch.fulfilled](state, action) {
            const imgCard = [...action.payload, ...action.payload].map(e => createCard(e.id));
            state.card.push(...shuffle(imgCard));
            state.status = "succeeded";
        },
        [initialFetch.pending](state) {
            state.status = "loading";
        },
        [initialFetch.error](state) {
            state.status = "failed";
            state.error = "Failed to get initial data from The API"
        }
    }
});

export const { select, compare, resetGame } = gameSlice.actions;
export default gameSlice.reducer;