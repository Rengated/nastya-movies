import { MovieList, getFilms } from "@/api";
import { Card } from "@/components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import { Footer } from "@/components/Footer/Footer";
import { genres, sortTypes } from "../../constants";
import { useDebounce } from "../hooks/useDebounce";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/minimal.css";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const { currentTheme } = useContext(Theme);
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getFilms(
        String(currentPage),
        genre,
        query,
        sortBy
      );
      setFilms(response.movies);
      setTotal(Math.floor(response.movie_count / response.limit));
      setLoading(false);
    };
    fetch();
  }, [currentPage, debouncedQuery, sortBy, genre]);

  return (
    <div
      className={`bg ${currentTheme == "black" ? "bg_black" : ""}`}
      style={{
        backgroundColor: `${currentTheme == "black" ? "#484848" : "#F1F1F1"}`,
      }}>
      <Header />
      <main className="min-h-screen flex justify-center px-5">
        <section className="flex flex-col items-center container">
          <div className="flex items-center  w-full mb-7  justify-between max-lg:flex-col">
            <div className="flex w-full max-lg:mb-5 max-md:flex-col">
              <input
                className="border border-black px-5 py-3 rounded-md mr-3 w-60 max-md:mb-5 max-md:w-full"
                placeholder="film name"
                onChange={(e) => setQuery(e.target.value)}
              />
              <select
                className="border border-black px-5 py-3 rounded-md mr-3 w-60 max-md:mb-5 max-md:w-full"
                onChange={(e) => setGenre(e.target.value)}>
                {genres.map((genre, index) => (
                  <option key={index}>{genre}</option>
                ))}
              </select>
              <select
                className="border border-black px-5 py-3 rounded-md mr-3 w-60 max-md:mb-5 max-md:w-full"
                onChange={(e) => {
                  let selectedIndex = e.target.selectedIndex;
                  let value = e.target.options[selectedIndex].value;
                  setSortBy(value);
                }}>
                {sortTypes.map((type, index) => (
                  <option
                    key={index}
                    value={type.value}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <h1
              className={`text-3xl whitespace-nowrap ${
                currentTheme == "black" ? "text-white" : "text-black"
              }`}>
              Film List
            </h1>
          </div>
          <div className="flex flex-wrap justify-center mb-10 max-w-6xl">
            {films?.length > 0 && !loading ? (
              films?.map((item: MovieList, index) => (
                <Card
                  key={index}
                  id={item.id}
                  filter={checked}
                  rating={String(item.rating)}
                  genre={item.genres[0]}
                  description={item.description_full || item.summary}
                  title={item.title}
                  year={item.year}
                  medium_cover_image={item.medium_cover_image}
                />
              ))
            ) : (
              <div className="flex justify-center items-center min-w-full min-h-screen">
                <Audio
                  height="300"
                  width="300"
                  radius="9"
                  color="black"
                  ariaLabel="loading"
                />
              </div>
            )}
          </div>
          <div
            style={{ maxWidth: "600px", width: "100%", padding: "0px 30px" }}>
            <ResponsivePagination
              previousLabel="<"
              activeItemClassName={`${
                currentTheme == "black" ? "active__item_black" : "active__item"
              }`}
              nextLabel=">"
              pageLinkClassName={`p-3 bg-transparent border-none ${
                currentTheme == "black"
                  ? "text-gray-500 hover:text-white"
                  : "text-gray-400 hover:text-black"
              }`}
              current={currentPage}
              total={total}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
