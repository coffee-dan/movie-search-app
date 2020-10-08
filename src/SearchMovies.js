import React, {useState} from 'react'

/**
 * This component will take user input and will query TMDB API
 */

export default function SearchMovies() {
    
    // states - input, query, movies
    const [ query, setQuery ] = useState('')
    // const [ input, setInput ] = useState('')
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
            console.log(movies)
            console.log(data.results)
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
                    <div className="card" key={movie.id}>

                        <img className="card--image"
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                            alt={movie.title + ' poster'}
                        />
                        <div className="card--content" />
                        <h3 className="card--title">{movie.title}</h3>
                        <p><small>RELEASE DATE: {movie.release_date}</small></p>
                        <p><small>RATING: {movie.vote_average}</small></p>
                        <p className="card--desc">{movie.overview}</p>

                    </div>
                ))}
            </div>
        </>
    )
}