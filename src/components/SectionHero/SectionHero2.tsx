import React, { FC } from "react";
import imagePng from "images/hero-right-3.png";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import HeroCard from "../Cards/HeroCard";

export interface SectionHero2Props {
  children?: React.ReactNode;
  className?: string;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children }) => {
  return (
    <div
      className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-0  xl:pb-0 xl:pr-14 lg:mr-10 xl:mr-0 ">
          <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%] ">
            Discover, collect, and sell NFT Music 🎧
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Discover the most outstanding NTFs in all topics of life. <br />{" "}
            Creative your NTFs and sell them
          </span>
          <div className="space-x-4">
            <ButtonPrimary>Explore</ButtonPrimary>
            <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-8  ttnc-ButtonSecondary border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0 ">
              Create your NFT
            </button>
          </div>
        </div>

        <div className="flex-grow ">
          {/* <img className="w-full" src={imagePng} alt="hero" /> */}

          <HeroCard />
        </div>
      </div>

      {/* <div className="z-10 mb-12 lg:mb-0 lg:-mt-20 xl:-mt-48 w-full">
        <HeroSearchForm />
      </div> */}
    </div>
  );
};

export default SectionHero2;
