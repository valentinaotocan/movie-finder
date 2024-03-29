import { useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import useFetchGenres from "../hooks/useFetchGenres";
import Loading from "./common/Loading";
import Error from "./common/Error";
import Cards from "./common/Cards";
import { Genre } from "../types";

function PopularByGenre() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>({
    id: 28,
    name: "Action",
  });

  const { genres } = useFetchGenres();

  const { movies, isLoading, error } = useFetchMovies("/discover/movie", {
    with_genres: selectedGenre.id,
    sort_by: "popularity.desc",
  });

  return (
    <section className="px-custom">
      <h2 className="pb-3 pt-6">Popular by genre:</h2>
      <div className="flex justify-center flex-wrap gap-3.5 md:gap-2 pb-4">
        {genres.map((genre) => (
          <div
            key={genre.id}
            onClick={() => setSelectedGenre(genre)}
            className={`cursor-pointer ${
              selectedGenre && selectedGenre.id === genre.id
                ? "border-b-4 border-yellow-500"
                : ""
            }`}
          >
            {genre.name}
          </div>
        ))}
      </div>
      {isLoading && <Loading />}
      {error && <Error />}
      {selectedGenre && (
        <div className="overflow-x-auto flex flex-nowrap">
          <div className="flex gap-3.5">
            {movies && <Cards movies={movies} layout="horizontal" />}
          </div>
        </div>
      )}
    </section>
  );
}

export default PopularByGenre;
