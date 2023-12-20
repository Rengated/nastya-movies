import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CardProps {
  id: number;
  title: string;
  year: number;
  medium_cover_image: string;
  description: string;
  rating: string;
  genre: string;
  filter: boolean;
}

export const Card: FC<CardProps> = ({ id, title, medium_cover_image }) => {
  const router = useRouter();
  const onCardClick = () => {
    router.push(`/movie/${id}`);
  };

  return (
    <div
      className=" bg-white border border-black object-cover rounded ml-5 mb-6 cursor-pointer relative flex flex-col"
      onClick={onCardClick}>
      <Image
        width={230}
        height={300}
        src={medium_cover_image}
        alt={title}
      />
    </div>
  );
};
