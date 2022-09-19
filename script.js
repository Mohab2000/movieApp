// apiKey = 9813ce01a72ca1bd2ae25f091898b1c7
// url = https://api.themoviedb.org/3
// path = /discover/movie?sort_by=popularity.desc

//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7

const apiKey = "api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const url = "https://api.themoviedb.org/3";
const path = "/discover/movie?sort_by=popularity.desc&";
const apiUrl = url + path + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500/";

const main = document.getElementById("main");
var x;
getMovies(apiUrl);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      x = data.results;
      console.log(data.results);
      showMovie(data.results);
    });
}

//////////////////////////
function showMovie(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, id } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
          <a href="./movieDetailsPage.html?id=${id}">
                      <img src="${imgUrl + poster_path}" alt="Movie" />
            <h4 id="movieName">${title}</h4>
          </a>
    
    `;
    main.appendChild(movieElement);
  });
}
/////////////////////////////////////Details Page

var movieId = location.search.split("=")[1];
const movieDetailsData = document.getElementById("movieData");

function getMoviesDetails(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((movie) => {
        if (movie.id == movieId) {
          const { title, poster_path, overview } = movie;
          // Create Element
          const mElement = document.createElement("div");
          mElement.classList.add("container");
          mElement.innerHTML = `
          <img src="${imgUrl + poster_path}" alt="Movie"/>
          <div class="dataBox"><h3>${title}</h3>
          <p>${overview}</p></div>
          `;
          movieDetailsData.appendChild(mElement);
        }
      });
    });
}

getMoviesDetails(apiUrl);
