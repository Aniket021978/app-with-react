import React, { useState } from 'react';
const MovieDetails = () => {
    const [movieName, setMovieName] = useState('');
    const [movieDetails, setMovieDetails] = useState('');
    const apiKey = '53e49e84';  
    const baseUrl = 'https://www.omdbapi.com/';

    const handleSearch = async () => {
        try {
            if (!movieName) {
                throw new Error('Please enter a movie name.');
            }

            const apiUrl = `${baseUrl}?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`;
            
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (!data || data.Response === 'False') {
                throw new Error('Movie not found. Please enter a valid movie name.');
            }

            const movieInfo = `
                <h2>${data.Title}</h2>
                <img src="${data.Poster}" alt="${data.Title} Poster" style="max-width: 100%;">
                <p>${data.Plot}</p>
                <p>Released: ${data.Released}</p>
                <p>Genre: ${data.Genre}</p>
                <p>Director: ${data.Director}</p>
                <p>Actors: ${data.Actors}</p>
                <p>IMDb Rating: ${data.imdbRating}</p>
                <!-- Add more details as needed -->
            `;
            setMovieDetails(movieInfo);
        } catch (error) {
            console.error('Error:', error);
            setMovieDetails(`<p>${error.message}</p>`);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                placeholder="Enter movie name"
            />
            <button onClick={handleSearch}>Search</button>
            <div dangerouslySetInnerHTML={{ __html: movieDetails }}></div>
        </div>
    );
};

export default MovieDetails;
