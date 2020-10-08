import React from 'react'

/**
 * This component will take user input and will query TMDB API
 */

export default function SearchMovies() {
    
    return (
        <form className="form">
            <label className="label" htmlFor="query">
                Movie Name
                <input 
                    className="input"
                    type="text"
                    name="query"
                    placeholder="i.e. Jurassic Park"
                />
            </label>
            <button className="button" type="submit">Submit</button>
        </form>
    )
}