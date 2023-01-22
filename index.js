const searchBtn = document.querySelector("#search-btn");
const searchField = document.querySelector("#search-field");
const moviesContainer = document.querySelector("#movies-container");
const watchListPage = document.querySelector("#watchlist");
let myWatchlist;
if (localStorage.length > 0 && document.body.id === "watchlist") {
    renderMyWatchlist();
} else {
    myWatchlist = []
}

// searchField.value = "blade runner"

searchBtn.addEventListener("click", renderSearch);
moviesContainer.addEventListener("click", (e) => {
    if (e.target.dataset.add) {
        addToWatchlist(e.target.dataset.add)
    }
    if (e.target.dataset.remove) {
        removeFromWatchlist(e.target.dataset.remove)
    }

})

function renderMyWatchlist() {
        myWatchlist = JSON.parse(localStorage.getItem("myWatchlist"))
        moviesContainer.innerHTML = printMovies(myWatchlist, true);
    }

async function addToWatchlist(movieId) {
    const searchResult = await getMoviesData();
    const chosenMovie = searchResult.results.filter(movie => movie.id == movieId)
    addToLocalStorage(chosenMovie[0])
}

function removeFromWatchlist(movieId) {
    console.log(movieId) 
    console.log(myWatchlist) 
    let index;
    for (let movie of myWatchlist) {
        if (movie.id == movieId) {
            index = myWatchlist.indexOf(movie)
            myWatchlist.splice(index, 1);
        }
    }
    localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist));
    renderMyWatchlist()
}

function addToLocalStorage(element) {
    myWatchlist.push(element)
    localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist));
}

async function renderSearch() {
    const searchResults = await getMoviesData();
    // console.log(searchResults.results)
    moviesContainer.innerHTML = printMovies(searchResults.results, false);
}

async function getMoviesData() {
    // const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3ca008549b6464301a16aa99a8cb8c93&query=blade runner`)

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3ca008549b6464301a16aa99a8cb8c93&query=${searchField.value}`)

    const searchResults = await response.json();

    return searchResults;
}

function printMovies(movies, fromWatchList) {
    // console.log(movies);
    let moviesHtml = "";

    for (let movie of movies) {
        moviesHtml += `<div class="movie" id="${movie.id}">
            <div class="movie-poster-box">
                <img class="movie-poster" src="${getPosterUrl(movie.poster_path)}" alt="poster">
            </div>
            <div class="movie-info-box">
                <h3 class="movie-title">${movie.title}<span class="movie-score"><img src="img/star.png" class="small-icon" alt="">${movie.vote_average.toFixed(1)}</span></h3>
                                    
                <p class="movie-duration">${movie.release_date.slice(0, 4)}</p>
                <p class="movie-category">${movie.genre_ids}</p>
                <button class="watchlist-btn" data-id=${movie.id} data-${fromWatchList ? "remove" : "add"}=${movie.id}><img src="img/${fromWatchList ? "minus.png" : "plus.png"}" class="small-icon" alt="">${fromWatchList ? "Remove" : "Watchlist"}</button>
                <p class="movie-description">${movie.overview}</p>
            </div>
        </div>`;
    }

    moviesHtml = `<div class="data-box">${moviesHtml}</div>`

    return moviesHtml;
}

function getPosterUrl(url) {
    return `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${url}`
}


// renderSearch();