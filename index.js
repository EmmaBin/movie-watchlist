const searchBtn = document.getElementById('search-btn')
const exploreIcon = document.getElementById('explore-icon')
const searchEl= document.getElementById('search-input')
const movieList = document.getElementById('movie-list')
let moviesArr = []
//if there is watchlist inside the storage, should keep the pre-existed items. otherwise, render []
//new Set will delete any duplicates, but set is not an array
const watchlistSet = new Set(localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : [])

searchBtn.addEventListener('click', onSearchClick)

function onSearchClick(e){
    e.preventDefault()
    exploreIcon.style.display='none'
    fetchShortMovie();
}

// if there is no match search result, catch that possibility by using if false
function fetchShortMovie(){
    let searchVal= searchEl.value
    fetch(`http://www.omdbapi.com/?apikey=6829f1aa&s=${searchVal}`)
    .then(res => res.json())
    .then(data => {
        if (!data.Search){
            movieList.innerHTML =`
            <h2 class='reminder'>Unable to find what you are looking for. Please try another search.</h2>
            `
        }else{
            let moviesData = data.Search.slice(0,10);
            moviesArr=[]
            fetchAllMovieData(moviesData)
        }
})
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
   
    let html=''
    html = moviesArr.map(movieObj=>{
        return `
        <div class='movie-container'>
            <div class='movie-poster'>
                <img src='${
                    movieObj.poster === 'N/A' ? 
                    // "https://m.media-amazon.com/images/M/MV5BOGYyOTU2NTMtNzViZi00OTZhLTlhNWYtMWE0NDQ2Y2Y3NmVlXkEyXkFqcGdeQXVyMTYzMTY1MjQ@._V1_SX300.jpg"
                    './assets/error.jpg'
                    : movieObj.poster
                }' alt='movie-poster'>
            </div>

            <div class='movie-info-container'>
                <div class='movie-title'>
                    <p>
                    ${movieObj.title}
                    </p>
                    <img src='assets/star.png'>
                    <span>${
                        movieObj.rating === 'N/A' ? 8.0 : movieObj.rating
                    }</span>
                    
                   
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
                    
                    <div>
                    <img src='/assets/add-on.png' class='plus-sign' alt='add-on-icon'>
                    <button class='add-on' id='${movieObj.imdbID}'>Watchlist </button>
                    
                    </div>
                </div>

                <div class='movie-plot'>
                    ${
                        movieObj.plot === 'N/A' ? 'Plot is not available' : movieObj.plot}
                </div>
                
            </div>
        </div>
        `
    })
    movieList.innerHTML = html.join('')

    document.querySelectorAll('.add-on').forEach((btn)=>{
    btn.addEventListener('click', function(e){
        e.preventDefault()
        watchlistSet.add(e.target.id)
        console.log(e.target.id)
        //JSON.stringify will only work on primitive type, set is not primitive, but set is iterable, ...spread operator works on 
        // iterable type. In this case, ... is making a copy of the set and returning an array
        localStorage.setItem('watchlist', JSON.stringify([...watchlistSet]))
        console.log(JSON.parse(localStorage.getItem('watchlist')))
       

    })
})


}



