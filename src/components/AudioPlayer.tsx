import { FC } from "react";
import { useAudioPlayer } from "react-use-audio-player";
export interface AudioPlayerProps {
  className?: string;
  file?: string;
  src?: string;
}

const renderIcon = (state?: "loading" | "playing") => {
  switch (state) {
    case "loading":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
          ></path>
          <path
            fill="currentColor"
            d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
          ></path>
          <path
            fill="currentColor"
            d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"
          ></path>
        </svg>
      );

    case "playing":
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
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

    default:
      return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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

const AudioPlayer: FC<AudioPlayerProps> = ({ file }) => {
  const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
    src: file,
    format: "mp3",
    autoplay: false,
    onend: () => console.log("sound has ended!"),
  });

  if (!ready && !loading) return <div>No audio to play</div>;
  if (loading) return <div>Loading audio</div>;
  return (
    <div>
      <button onClick={togglePlayPause}>
        {playing
          ? renderListenButtonDefault("playing")
          : renderListenButtonDefault()}
      </button>
    </div>
  );
};

export default AudioPlayer;
