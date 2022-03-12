async function searchMovie() {
  try {
    let input = document.querySelector("#searchMovie").value;
    let res = await fetch(
      `https://www.omdbapi.com/?apikey=eaf4b3f5&s=${input}`
    );

    let data = await res.json();
    let arrayOfMovie = data.Search;
    return arrayOfMovie;
  } catch (error) {
    console.log(error);
  }
}

let timerid;

async function main() {
  try {
    let data = await searchMovie();
    if (data === undefined) {
      return false;
    }
    searchAppend(data);
  } catch (error) {
    console.log(error);
  }
}
function debounce(ind, delay) {
  if (timerid) {
    clearTimeout(timerid);
  }
  timerid = setTimeout(function () {
    ind();
  }, delay);
}

function searchAppend(data) {
  let container = document.querySelector("#movies");
  container.innerHTML = null;

  data.forEach(function (el) {
    let anchor = document.createElement("a");

    let smallDiv = document.createElement("div");
    smallDiv.setAttribute("id", "smallDiv");

    let searchPoster = document.createElement("img");
    searchPoster.setAttribute("id", "searchPoster");
    searchPoster.src = el.Poster;
    searchPoster.alt = el.Title;

    let p = document.createElement("a");
    p.setAttribute("id", "p");
    p.href = "#singleMovie";
    p.addEventListener("click", function () {
      takeMe(el);
    });

    p.innerText = el.Title;

    anchor.append(smallDiv);

    smallDiv.append(searchPoster, p);

    container.append(smallDiv);
  });
}

async function takeMe(el) {
  try {
    let ID = el.imdbID;

    let res = await fetch(`https://www.omdbapi.com/?apikey=eaf4b3f5&i=${ID}`);
    let data = await res.json();

    singleMovieAppend(data);
    console.log(data, ID);
  } catch (err) {
    console.log(err);
  }
}
function singleMovieAppend(data) {
  let text = document.querySelector("#dataDiv");
  let posterDiv = document.querySelector("#posterDiv");
  //   document.querySelector("#singleMovie").innerHTML = null;
  text.innerHTML = null;
  posterDiv.innerHTML = null;

  let poster = document.createElement("img");
  poster.setAttribute("id", "poster");
  poster.src = data.Poster;
  posterDiv.append(poster);
  let name = document.createElement("h1");
  name.innerText = data.Title;

  let genre = document.createElement("h3");
  genre.innerText = "Genre:    " + data.Genre;
  let runtime = document.createElement("h3");
  runtime.innerText = "Runtime: " + data.Runtime;
  let rated = document.createElement("h3");
  rated.innerText = "Rated:    " + data.Rated;
  let plot = document.createElement("h4");
  plot.innerText = "Plot: " + data.Plot;
  let imdb = document.createElement("h3");
  imdb.innerText = recomend(data.imdbRating);

  let cast = document.createElement("h3");
  cast.innerText = "Cast: " + data.Actors;
  text.append(name, genre, rated, imdb, runtime, cast, plot);
}
function recomend(data) {
  let img = document.createElement("img");
  img.src = "script/image.svg";
  if (data >= 7.5) {
    console.log(img);
    return `Imdb:   ⭐     ${data}  Recommended`;
  } else {
    return `Imdb:   ⭐     ${data} `;
  }
}

// document.body.append(img);
