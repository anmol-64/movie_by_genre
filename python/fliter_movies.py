import json

# Load movies
with open("../data/movies.json") as f:
    movies = json.load(f)

# User genres (simulate form input)
user_genres = ["Action", "Sci-Fi"]

# Filter movies
recommended = [m for m in movies if any(g in m["genre"] for g in user_genres)]

# Save filtered list
with open("../data/recommended.json", "w") as f:
    json.dump(recommended, f, indent=2)

print(f"{len(recommended)} movies recommended!")