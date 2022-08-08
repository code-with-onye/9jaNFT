import { nanoid } from "@reduxjs/toolkit";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import AudioForNft from "./AudioForNft";
import Prices from "./Prices";

import AudioPlayer from "./AudioPlayer";
import { AudioPlayerProvider } from "react-use-audio-player";

export interface CardNFTMusic2Props {
  className?: string;
  featuredImage?: string;
  audio?: any;
  name?: string;
  price?: string;
  description?: string;
  imageUrl?: any;
}

const CardNFTMusic2: FC<CardNFTMusic2Props> = ({
  className = "",
  audio,
  name,
  price,
  description,
  imageUrl,
}) => {
  const [DEMO_NFT_ID] = React.useState(nanoid());

  return (
    <div
      className={`nc-CardNFTMusic2 relative flex justify-between p-2 space-x-2 rounded-3xl bg-neutral-100 dark:bg-neutral-800 hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="CardNFTMusic2"
    >
      <Link to={"/nft-detailt"} className="flex-grow flex space-x-4">
        <div className="relative w-16 sm:w-24">
          <NcImage
            containerClassName="absolute inset-0 rounded-2xl overflow-hidden shadow-lg "
            src={imageUrl}
          />
        </div>

        <div className="flex flex-col justify-center flex-grow">
          <h2 className={`block font-medium sm:text-lg`}>{name}</h2>
          <p>{description}</p>
          <div className=" flex items-center pt-3 mt-1.5">
            {!price ? (
              ""
            ) : (
              <Prices
                price={!price ? "" : price + "ETH"}
                labelText="Price"
                className="sm:ml-3.5"
                contentClass="py-1.5 px-2 sm:px-3 text-xs sm:text-sm font-semibold"
                labelTextClassName="bg-neutral-100 dark:bg-neutral-800 "
              />
            )}
          </div>
        </div>
      </Link>

      <AudioPlayerProvider>
        <AudioPlayer file={audio} />
      </AudioPlayerProvider>

      {/* AUDIO MEDiA */}
      <AudioForNft className="absolute opacity-0" nftId={DEMO_NFT_ID} />
    </div>
  );
};

export default CardNFTMusic2;
