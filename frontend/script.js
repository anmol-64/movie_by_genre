const API_KEY = "YOUR_API_KEY_HERE";

const genreMap = {
  horror: 27,
  comedy: 35,
  "sci-fi": 878,
  romance: 10749,
};

const button = document.getElementById("submit");
const container = document.getElementById("moviesContainer");

button.addEventListener("click", () => {
  const selectedGenre = document.getElementById("genre").value;
  const genreId = genreMap[selectedGenre];
  fetchMovies(genreId);
});

function fetchMovies(genreId) {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`,
  )
    .then((res) => res.json())
    .then((data) => displayMovies(data.results))
    .catch((err) => console.error("Error fetching movies:", err));
}

// Displaying movies dynamically in the container
function displayMovies(movies) {
  container.innerHTML = "";

  if (!movies || movies.length === 0) {
    container.innerHTML = "<p>No movies found for this genre.</p>";
    return;
  }

  // Limit  movies for recommendation
  const topMovies = movies.slice(0, 100);

  topMovies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const image = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    card.innerHTML = `
      <img class="card-img" src="${image}" alt="${movie.title}" />
      <div class="movie-title">${movie.title}</div>
      <div class="rating">⭐ ${movie.vote_average}</div>
      <div class="duration">📅 ${movie.release_date}</div>
    `;

    container.appendChild(card);
  });
}
