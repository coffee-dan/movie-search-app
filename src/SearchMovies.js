import React, {useState} from 'react'
import MovieCard from "./MovieCard"

/**
 * This component will take user input and will query TMDB API
 */

export default function SearchMovies() {
    
    // states - query, movies
    const [ query, setQuery ] = useState('')
    const [ movies, setMovies ] = useState([])


    // there is a reason this is async. i am unsure why
    const searchMovies = async (event) => {
        event.preventDefault()
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`

        /* fetch returns a promise, this will be handled with an await */
        try {
            const response = await fetch(url)
            const data = await response.json()
            setMovies(data.results)

        } catch (error) {
            // Handle bad queries gracefully
            console.error(error)
        }
        
    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input 
                    className="input"
                    type="text"
                    name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button className="button" type="submit">Submit</button>
            </form>
            {/* TODO cleanup this map usage */}
            {/* movies.filter() takes callback function to filter out elements within array
                that do not contain poster_path which is what is used to obtain movie poster img
                movies.map() is used to create the card where the aggregated movie data is displayed
                 */}
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </>
    )
}