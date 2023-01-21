    const searchBtn = document.querySelector("#search-btn");
    const searchField = document.querySelector("#search-field");
    const moviesContainer = document.querySelector("#movies-container");

    searchBtn.addEventListener("click", renderSearch);

    async function renderSearch() {
        const searchResults = await getMoviesData();
        // console.log(searchResults.results)
        moviesContainer.innerHTML = printMovies(searchResults.results) ;
    }

    async function getMoviesData() {
        // const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3ca008549b6464301a16aa99a8cb8c93&query=blade runner`)

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3ca008549b6464301a16aa99a8cb8c93&query=${searchField.value}`)

        const searchResults = await response.json();
        
        return searchResults;
    }

    function printMovies(movies) {
        console.log(movies);
        let moviesHtml = "";

        for (let movie of movies) {
            moviesHtml += `<div class="movie" id="${movie.id}">
            <div class="movie-poster-box">
                <img class="movie-poster" src="${getPosterUrl(movie.poster_path)}" alt="poster">
            </div>
            <div class="movie-info-box">
                <h3 class="movie-title">${movie.title}<span class="movie-score"><img src="img/star.png" class="small-icon" alt="">${movie.vote_average.toFixed(1)}</span></h3>
                                    
                <p class="movie-duration">${movie.release_date.slice(0,4)}</p>
                <p class="movie-category">${movie.genre_ids}</p>
                <button class="watchlist-btn" class="watchlist-btn"><img src="img/plus.png" class="small-icon" alt="">Watchlist</button>
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