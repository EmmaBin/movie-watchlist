const watchlistHtml = document.getElementById('watchlist')
const emptyContainer = document.querySelector('.empty-container')

//if there are movies in the storage, render the movie according to the movieID
//give each movie card 'remove' function
//use removeItem() to remove from the local storage
//if there nothing in storage, render empty-container




if (JSON.parse(localStorage.getItem('watchlist')).length>0){
    emptyContainer.style.display='none';

    JSON.parse(localStorage.getItem('watchlist')).forEach((movieID)=>{
        fetch(`http://www.omdbapi.com/?apikey=6829f1aa&i=${movieID}&type=movie`)
        .then(res => res.json())
        .then(data => renderWatchlist(data))
    })

}





function renderWatchlist(data){
    //destructure the object,{} should be the key 
    const{Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID} = data

    watchlistHtml.innerHTML += 
    `
    <div class='movie-container'>
        <div class='movie-poster'>
            <img src='${
              Poster === 'N/A' ? 
                // "https://m.media-amazon.com/images/M/MV5BOGYyOTU2NTMtNzViZi00OTZhLTlhNWYtMWE0NDQ2Y2Y3NmVlXkEyXkFqcGdeQXVyMTYzMTY1MjQ@._V1_SX300.jpg"
                './assets/error.jpg'
                : Poster
            }' alt='movie-poster'>
        </div>

        <div class='movie-info-container'>
            <div class='movie-title'>
                <p>
                ${Title}
                </p>
                <img src='assets/star.png'>
                <span>${
                    imdbRating === 'N/A' ? 8.0 : imdbRating
                }</span>
                
               
            </div>

            <div class='movie-info'>
                <div class='movie-length'>
                    ${
                        Runtime === 'N/A' ? '120mins': Runtime
                    }
                </div>

                <div class='movie-type'>
                    ${Genre}
                </div>
                
                <div>
                <img src='/assets/remove.png' class='remove-sign' alt='remove-icon'>
                <button class='remove' id='${imdbID}'>Remove</button>
                
                </div>
            </div>

            <div class='movie-plot'>
                ${
                    Plot === 'N/A' ? 'Plot is not available' : Plot}
            </div>
            
        </div>
    </div>
    `
    document.querySelectorAll('.remove').forEach((movie)=>{
        movie.addEventListener('click', function(e){
            e.preventDefault();
            e.target.closest('.movie-container').remove();

            //delete the id from JSON.parse(localStorage.getItem('watchlist')
            let movies = JSON.parse(localStorage.getItem('watchlist'))

            //use filter to return the rest of the movies excluding the matching deleted ID
            let savedMovies = movies.filter((movie)=> movie != e.target.id)
            localStorage.setItem('watchlist', JSON.stringify(savedMovies))
        })
    })



}