const searchForm = document.getElementById('search-movie-form')
const exploreIcon = document.getElementById('explore-icon')

searchForm.addEventListener('submit',(e)=>{
   e.preventDefault()
    exploreIcon.style.display = 'none'
    let searchName = document.getElementById('search-input').value
    let movieList=[]
   
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=6829f1aa&s=${searchName}`)
    .then(res => res.json())
    .then(data => {
        data.Search.map(movie=> movieList.push(movie.imdbID))
        for (let movie of movieList){
            fetch(`http://www.omdbapi.com/?i=${movie}&apikey=6829f1aa&t=${searchName}`)
            .then(res => res.json())
            .then(data =>{
                console.log(data)
            })
        }
        
    })
 
})