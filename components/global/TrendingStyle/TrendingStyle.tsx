import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import s from "./trendingStyle.module.scss";
import cn from "classnames";

interface Props {
  radius?: number;
  trendingStyle?: any;
  category?: boolean;
}

const PictureGrid: FC<Props> = ({ radius, trendingStyle, category }) => {
  const {
    trendingStyleTitle,
    trendingStylesOneSlug,
    trendingStylesOneImage,
    trendingStylesTwoSlug,
    trendingStylesTwoImage,
    trendingStylesThreeSlug,
    trendingStylesThreeImage,
    trendingStylesFourSlug,
    trendingStylesFourImage,
  } = trendingStyle;

  const trendingStyleArray = [
    {
      slug: trendingStylesOneSlug,
      picture: trendingStylesOneImage,
    },
    {
      slug: trendingStylesTwoSlug,
      picture: trendingStylesTwoImage,
    },
    {
      slug: trendingStylesThreeSlug,
      picture: trendingStylesThreeImage,
    },
    {
      slug: trendingStylesFourSlug,
      picture: trendingStylesFourImage,
    },
  ];

  return (
    <section
      className={cn(s.pictureGridWrap, category && s.categorypictureGridWrap)}
    >
      <h2>{trendingStyleTitle}</h2>
      <div className={cn(s.pictureGrid, category && s.category)}>
        {trendingStyleArray.map((p: any, i: number) => (
          <Link href={`/${p.slug}`} key={i} passHref>
            <a
              style={{
                display: "block",
                borderRadius: `${radius}%`,
                overflow: "hidden",
              }}
              className={s.link}
            >
              <Image
                layout="responsive"
                alt=""
                src={p.picture.url}
                placeholder="blur"
                blurDataURL={p.picture.url}
                height={500}
                width={500}
              />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PictureGrid;
