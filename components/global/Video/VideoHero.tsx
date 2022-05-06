import { FC } from "react";
import s from "./videoHero.module.scss";

interface Props {
  video?: string;
}

const VideoHero: FC<Props> = ({ video }) => {
  console.log("videos", video);
  return (
    <div className={s.videoWrapper}>
      <video autoPlay loop muted className={s.video}>
        <source src="/home-video.mp4" />
      </video>
    </div>
  );
};

export default VideoHero;
