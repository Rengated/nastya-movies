import { MovieList, getFilms } from "@/api";
import { Card } from "@/components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/minimal.css";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentTheme } = useContext(Theme);

  const data = useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getFilms(String(currentPage));
      setFilms(response.movies);
      setTotal(Math.floor(response.movie_count / response.limit));
      setLoading(false);
    };
    fetch();
  }, [currentPage]);

  return (
    <div
      className={`bg ${currentTheme == "black" ? "bg_black" : ""}`}
      style={{
        backgroundColor: `${currentTheme == "black" ? "#484848" : "#F1F1F1"}`,
      }}>
      <Header />
      {!loading ? (
        <main className="min-h-screen flex justify-center">
          <section className="flex flex-col items-center container">
            <div className="flex items-center  w-full mb-7  justify-end">
              <h1
                className={`text-3xl ${
                  currentTheme == "black" ? "text-white" : "text-black"
                }`}>
                Film List
              </h1>
            </div>
            <div className="flex flex-wrap justify-center mb-10">
              {films?.map((item: MovieList, index) => (
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
              ))}
            </div>
            <ResponsivePagination
              maxWidth={600}
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
          </section>
        </main>
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
      <Footer />
    </div>
  );
}
