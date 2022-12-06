const searchBtn = document.getElementById('search-btn')
const exploreIcon = document.getElementById('explore-icon')
const searchEl= document.getElementById('search-input')
const movieList = document.getElementById('movie-list')
let moviesArr = []

searchBtn.addEventListener('click', onSearchClick)

function onSearchClick(e){
    e.preventDefault()
    exploreIcon.style.display='none'
    fetchShortMovie();
}

function fetchShortMovie(){
    let searchVal= searchEl.value
    fetch(`http://www.omdbapi.com/?apikey=6829f1aa&s=${searchVal}`)
    .then(res => res.json())
    .then(data => {
        let moviesData = data.Search.slice(0,10);
        fetchAllMovieData(moviesData)})
}


// from this function, it's returning JS objects
function fetchAllMovieData(data){
    data.forEach((movie) => {
        fetch(`http://www.omdbapi.com/?apikey=6829f1aa&i=${movie.imdbID}&type=movie`)
        .then(res => res.json())
        .then(data => renderHTML(data))
    })
}

//save each object into array, and then loop over the array to display on HTML
function renderHTML(data){
    let eachMovieObj = {
        title: data.Title,
        poster: data.Poster,
        rating: data.imdbRating,
        runtime: data.Runtime,
        genre: data.Genre,
        plot: data.Plot,
        imdbID: data.imdbID
    }
    moviesArr.push(eachMovieObj)
    console.log(moviesArr)
    let html=''
    html = moviesArr.map(movieObj=>{
        
        return `
        <div class='movie-poster'>
            <img src='${
                movieObj.poster ==='N/A' ? 'assets/error.jpg' : movieObj.poster
            }' alt='movie-poster'>
        </div>

        <div class='movie-info-container'>
            <div class='movie-title'>
                ${movieObj.title}
                <img src='assets/star.png'>
                <p>${
                    movieObj.rating === 'N/A' ? 8.0 : movieObj.rating
                }</p>
            </div>

            <div class='movie-info'>
                <div class='movie-length'>
                    ${
                        movieObj.runtime === 'N/A' ? '120mins': movieObj.runtime
                    }
                </div>

                <div class='movie-type'>
                    ${movieObj.genre}
                </div>

                <button class='add-on'> Watchlist </button>
            </div>

            <div class='movie-plot'>
                ${movieObj.plot}
            </div>
            
        </div>
        `
    })
    movieList.innerHTML = html.join('')


}





// console.log(data.Poster)
// console.log(data.Title)
// console.log(data.imdbRating)
// console.log(data.Runtime)
// console.log(data.Genre)
// console.log(data.Plot)
