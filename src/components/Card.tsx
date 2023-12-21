import { Link } from "react-router-dom";
import { CardProps } from "../types";
import { FaBookmark } from "react-icons/fa6";
import { FavoritesContext } from "../context/FavoritesContext";
import { useContext } from "react";

function Card({ movies }: CardProps) {
  const { favoritesChecker, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const moviesWithImg = movies.filter((movie) => movie.poster_path);

  return (
    <>
      {moviesWithImg.map((movie) => (
        <div
          key={movie.id}
          className="w-[11.875rem] h-[16.875rem] flex-shrink-0 relative overflow-hidden"
        >
          <Link to={`/details/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded"
            />
          </Link>
          {favoritesChecker(movie) ? (
            <FaBookmark
              className="absolute text-[1.625rem] -top-[2px] left-0 pl-2 text-yellow-400 cursor-pointer"
              onClick={() => removeFromFavorites(movie)}
            />
          ) : (
            <FaBookmark
              className="absolute text-[1.625rem] -top-[2px] left-0 pl-2 text-gray-300 hover:text-white cursor-pointer"
              onClick={() => addToFavorites(movie)}
            />
          )}
        </div>
      ))}
    </>
  );
}
export default Card;
