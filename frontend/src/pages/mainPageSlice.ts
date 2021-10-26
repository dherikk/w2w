import { createSlice } from "@reduxjs/toolkit"
import IMoviesList from "../services/types"

const initialState: IMoviesList = {
    movies: [],
    loading: false,
    nextPage: 0,
    filterSearch: "",
    filterGenre: [],
    filterDateStart: -1635203598,
    filterDateEnd: 1635203598
}

const MainPageSlice = createSlice({
    name: "mainPage",
    initialState,
    reducers: {
        setMovies(state, action) {
            state.nextPage += 1
            if (state.movies !== null) {
                state.movies = state.movies.concat(action.payload)
            }
        },
        setFilterStartDate(state, action) {
            state.filterDateStart = action.payload
        },
        setFilterEndDate(state, action) {
            console.log("set filter")
            state.filterDateEnd = action.payload
        },
        setSearchQuery(state, action) {
            state.filterSearch = action.payload
        },
        setFilterGenres(state, action) {
            console.log("Payload", action.payload)
            state.filterGenre = [...state.filterGenre, action.payload]
        },
        removeFilterGenres(state, action) {
            const index = state.filterGenre.indexOf(action.payload)
            if (index > -1) {
                state.filterGenre = state.filterGenre.splice(index, 1)
            }  
        },
        emptyMovies(state) {
            console.log("Emptying movies")
            state.nextPage = 0
            state.movies = []
        }
    },
})

export const { setMovies, setFilterGenres, emptyMovies, removeFilterGenres, setFilterEndDate, setFilterStartDate} = MainPageSlice.actions
export default MainPageSlice.reducer