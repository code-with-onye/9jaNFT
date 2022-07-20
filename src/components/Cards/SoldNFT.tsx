import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import { nftsAbstracts } from "contains/fakeData";
import LikeButton from "../LikeButton";
import Prices from "../Prices";
import musicWave from "images/musicWave.png";
import ButtonPlayMusicRunningContainer from "containers/ButtonPlayMusicRunningContainer";
import { nanoid } from "@reduxjs/toolkit";
import AudioForNft from "../AudioForNft";
import RemainingTimeNftCard from "../RemainingTimeNftCard";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../../config";
import Market from "../../abi/NFTMarket.json";
import NFT from "../../abi/NFT.json";

export interface SoldNFTProps {
  className?: string;
  featuredImage?: string;
  isLiked?: boolean;
}

const SoldNFT: FC<SoldNFTProps> = ({
  className = "",
  isLiked,
  featuredImage = nftsAbstracts[18],
}) => {
  const [DEMO_NFT_ID] = React.useState(nanoid());
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    //     {
    //   network: "mainnet",
    //   cacheProvider: true,
    // }
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchItemsCreated();

    const items: any = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          name: meta.data.name,
          image: meta.data.image,
        };
        return item;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i: any) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoading(false);
  }

  const renderIcon = (state?: "playing" | "loading") => {
    if (!state) {
      return (
        <svg className="ml-0.5 w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
          ></path>
        </svg>
      );
    }

    return (
      <svg className=" w-9 h-9" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15.25 6.75V17.25"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8.75 6.75V17.25"
        ></path>
      </svg>
    );
  };

  const renderListenButtonDefault = (state?: "playing" | "loading") => {
    return (
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full bg-neutral-50 text-primary-500 cursor-pointer`}
      >
        {renderIcon(state)}
      </div>
    );
  };

  return (
    <>
      {Boolean(sold.length) && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
          {sold.map((nft: any, i) => (
            <div
              className={`nc-CardNFTMusic relative group  ${className}`}
              data-nc-id="CardNFTMusic"
              key={i}
            >
              {/* AUDIO MEDiA */}
              <AudioForNft nftId={DEMO_NFT_ID} />

              <div className="">
                <NcImage
                  containerClassName="block aspect-w-12 aspect-h-10 w-full h-0 rounded-3xl overflow-hidden z-0"
                  src={nft.image}
                  className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out"
                />
              </div>

              {/* LIKE AND AVATARS */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-2">
                <LikeButton liked={isLiked} className=" !h-9" />
              </div>

              {/* ----TIME--- */}
              <RemainingTimeNftCard />

              {/* MAIN CONTENT */}
              <div className="w-11/12 max-w-[360px] transform -mt-32 relative z-10">
                <div className={`px-5 flex items-center space-x-4 relative `}>
                  <div className={`flex-grow flex justify-center`}>
                    <img src={musicWave} alt="musicWave" />
                  </div>
                  <ButtonPlayMusicRunningContainer
                    className="relative z-10"
                    nftId={DEMO_NFT_ID}
                    renderDefaultBtn={() => renderListenButtonDefault()}
                    renderPlayingBtn={() =>
                      renderListenButtonDefault("playing")
                    }
                    renderLoadingBtn={() =>
                      renderListenButtonDefault("loading")
                    }
                  />
                </div>

                <div
                  // to={"/nft-detailt"}
                  className="block p-5 mt-5 bg-white dark:bg-neutral-800 shadow-xl dark:shadow-2xl rounded-3xl rounded-tl-none"
                >
                  <div className="flex items-center justify-between">
                    <h2 className={`text-lg font-semibold`}>
                      {nft.name} #{nft.tokenId}
                    </h2>
                    <div className="flex -space-x-1.5 ">
                      <div className="bg-primary-6000 px-3 py-1 rounded-lg text-sm tracking-widest bg-opacity-40">
                        SOLD
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-1.5 flex justify-between items-end ">
                    <Prices
                      labelText="Price"
                      labelTextClassName="bg-white dark:bg-neutral-800 "
                      price={nft.price + " MATIC"}
                    />
                  </div>
                </div>
              </div>

              <Link to={"/nft-detailt"} className="absolute inset-0 "></Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SoldNFT;
