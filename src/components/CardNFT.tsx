import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { nftsImgs } from "contains/fakeData";
import ItemTypeImageIcon from "./ItemTypeImageIcon";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import { ClockIcon } from "@heroicons/react/outline";
import ItemTypeVideoIcon from "./ItemTypeVideoIcon";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../config";
import Market from "../abi/NFTMarket.json";
import NFT from "../abi/NFT.json";

export interface CardNFTProps {
  className?: string;
  isLiked?: boolean;
}

const CardNFT: FC<CardNFTProps> = ({ className = "", isLiked }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const data = await marketContract.fetchMarketItems();
    console.log(data);

    const items: any = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        console.log(meta);

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

    setNfts(items);
    setLoading(false);
  }

  async function buyNFT(nft:any) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    //sign the transaction
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    //set the price
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    //make the sale
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();

    loadNFTs();
  }

  useEffect(() => {
    loadNFTs();
  }, []);

  const renderAvatars = () => {
    return (
      <div className="flex -space-x-1 ">
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
        <Avatar
          containerClassName="ring-2 ring-white dark:ring-neutral-900"
          sizeClass="h-5 w-5 text-sm"
        />
      </div>
    );
  };

  if (loading === true || !nfts.length)
    return <div className=" font-bold text-blue-500">Loading...</div>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
      {nfts.map((nft: any, i) => (
        <div
          className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
          key={i}
        >
          <div className="relative flex-shrink-0 ">
            <div>
              <NcImage
                containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
                src={nft.image}
                className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
              />
            </div>
            {Math.random() > 0.5 ? (
              <ItemTypeVideoIcon className="absolute top-3 left-3 !w-9 !h-9" />
            ) : (
              <ItemTypeImageIcon className="absolute top-3 left-3 !w-9 !h-9" />
            )}
            <LikeButton
              liked={isLiked}
              className="absolute top-3 right-3 z-10 !h-9"
            />
            <div className="absolute top-3 inset-x-3 flex"></div>
          </div>

          <div className="p-4 py-5 space-y-3">
            <div className="flex justify-between">
              {renderAvatars()}
              {/* <span className="text-neutral-700 dark:text-neutral-400 text-xs">
                {Math.floor(Math.random() * 90) + 10} in stock
              </span> */}
            </div>
            <h2 className={`text-lg font-medium`}>
              {nft.name} #{nft.tokenId}
            </h2>

            <div className="w-2d4 w-full border-b border-neutral-100 dark:border-neutral-700"></div>

            <div className="flex justify-between items-end ">
              <Prices
                labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50"
                price={`${nft.price} MATIC`}
              />
              <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                <ClockIcon className="w-4 h-4" />
                {/* <span className="ml-1 mt-0.5">
                  {Math.floor(Math.random() * 20) + 1} hours left
                </span> */}
              </div>
            </div>
          </div>

          {/* <Link to={"/nft-detailt"} className="absolute inset-0"></Link> */}
          <button
            className="nc-Button relative h-auto inline-flex items-center justify-center rounded-md transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
            onClick={() => buyNFT(nft)}
          >
            BUY
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardNFT;
