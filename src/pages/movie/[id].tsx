"use client";
import { getFilmById } from "@/api";
import { FC, useContext, useEffect, useState } from "react";
import { MovieList } from "@/api";
import { useParams } from "next/navigation";
import { Audio } from "react-loader-spinner";
import { useComments } from "../../hooks/useComments";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import cd from "../../../public/static/cd.png";
import file from "../../../public/static/file.png";
import res from "../../../public/static/res.png";
import Image from "next/image";
import { useRouter } from "next/router";

const Details: FC = () => {
  const [movieDetails, setMovieDetails] = useState<MovieList>();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({
    name: "",
    text: "",
  });
  const id = useParams()?.id;
  const { comments, updateComments } = useComments(id);
  const { currentTheme } = useContext(Theme);
  const router = useRouter();

  const onCommentChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSendComment = () => {
    updateComments(id, comment);
    setComment({ name: "", text: "" });
  };

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        setLoading(true);
        const response: MovieList = await getFilmById(id);
        setMovieDetails(response);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <div
      className={`py-20 ${
        currentTheme == "black" ? "bg-sky-950" : "bg-indigo-300"
      }`}>
      <Header arrowBack={true} />
      {!loading ? (
        <section className="min-h-screen flex items-center flex-col pb-20 px-4 relative">
          <Image
            src={movieDetails?.background_image}
            width={800}
            height={400}
            alt="bg"
            style={{ maxHeight: "750px", objectFit: "cover" }}
            className="absolute -z-index-1 opacity-60 w-full brightness-50 p-10"
          />
          <div className="container py-20 flex flex-col lg:flex-row items-start">
            <div>
              <div
                style={{
                  minWidth: "300px",
                  width: "100%",
                  maxWidth: "400px",
                  minHeight: "600px",
                  position: "relative",
                }}
                className="mb-5">
                <Image
                  layout="fill"
                  loading="lazy"
                  src={movieDetails?.large_cover_image || ""}
                  alt={movieDetails?.title || ""}
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    router.push(movieDetails?.url || "");
                  }}
                  className="py-4 px-6 lex items-center justify-center border text-white bg-rose-300 font-extrabold cursor-pointer rounded-md hover:bg-rose-600">
                  Watch now
                </button>
                <button
                  onClick={() => {
                    router.push(movieDetails?.url || "");
                  }}
                  className="py-4 px-6 flex-items-center justify-center border bg-rose-300 font-extrabold cursor-pointer text-white rounded-md hover:bg-rose-600">
                  Download
                </button>
              </div>
            </div>

            <div className="flex  lg:pl-20 flex-col w-full">
              <p className="text-white text-3xl mb-2">
                Title: {movieDetails?.title}
              </p>
              {movieDetails?.description_full && (
                <p className="text-gray-200 text-xl mb-2">
                  {movieDetails?.description_full}
                </p>
              )}
              <p className="text-white mb-3 text-xl flex flex-wrap  items-center">
                Genres:
                {movieDetails?.genres?.map((genre, index) => (
                  <b
                    className="bg-rose-200 p-2 text-base rounded-md ml-2 mb-3"
                    key={index}>
                    {genre}
                  </b>
                ))}
              </p>
              <p className="text-white text-xl mb-2">
                Language: {movieDetails?.language}
              </p>
              <p className="text-white text-xl mb-2">
                Rating: {movieDetails?.rating}
              </p>
              <p className="text-white text-xl mb-2">
                Runtime: {movieDetails?.runtime}
              </p>
              <div className="flex flex-col mt-5 ">
                {movieDetails?.torrents?.map((torrent, index) => (
                  <a
                    href={torrent.url}
                    key={index}
                    className="flex border-2  bg-sky-600 p-5 text-black mb-2 rounded-md items-center border-transparent hover:bg-sky-500">
                    <Image
                      src={res}
                      alt="res"
                      className="mr-4"
                    />
                    <span className="mr-4">{torrent.quality}</span>
                    <Image
                      src={file}
                      alt="file"
                      className="mr-4"
                    />
                    <span className="mr-4">{torrent.size}</span>
                    <Image
                      src={cd}
                      alt="cd"
                      className=""
                    />
                    <span>{torrent.type}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="container flex flex-col">
            <p className="text-3xl text-rose-500 mb-5">Comments</p>
            <p className="text-white mb-2">Name</p>
            <input
              name="name"
              onChange={onCommentChange}
              type="text"
              className="w-80 bg-transparent border-2 p-2 mb-2 rounded-md text-white"
            />
            <p className="text-white mb-2">Comment</p>
            <textarea
              onChange={onCommentChange}
              name="text"
              className="w-full bg-transparent border-2 p-2 rounded-md text-white"
            />
            <button
              onClick={onSendComment}
              className="ml-auto text-white border-2 rounded-md p-3 mt-3 hover:bg-black">
              Send
            </button>
            <div className="flex flex-col mt-10">
              {comments &&
                comments?.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-col border bg-gray-800 w-full p-5 text-white rounded-md mb-3">
                    <p className="text-xl extrabold mb-2">{comment.name}</p>
                    <p className="text-gray-500">{comment.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center min-w-full min-h-screen">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="#4d50bf"
            ariaLabel="loading"
          />
        </div>
      )}
    </div>
  );
};

export default Details;
