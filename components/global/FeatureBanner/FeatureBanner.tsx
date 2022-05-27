import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./featureBanner.module.scss";
import Button from "../../ui/Button/Button";

interface Props {
  featureBanner?: any;
}

const FeatureBanner: FC<Props> = ({ featureBanner }) => {
  const { heroImage, heroTitle, buttonText, buttonSlug } = featureBanner;

  return (
    <div className={s.featureBannerWrap}>
      <Image
        layout="responsive"
        src={heroImage.url}
        height={heroImage.height}
        width={heroImage.width}
        placeholder="blur"
        blurDataURL={heroImage.url}
      />
      <div className={s.textButtonWrap}>
        <h2>{heroTitle}</h2>
        <Link href={`/${buttonSlug}`} passHref>
          <Button className={s.button} variant="primary">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureBanner;
