import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import s from "./pictureGrid.module.scss";
import cn from "classnames";

interface Props {
  radius?: String;
  data?: any;
  category?: boolean;
  // category - Is the component on the home page or a category page
}

const PictureGrid: FC<Props> = ({ radius, data, category }) => {
  const trendingStyleArray = [
    {
      slug: data[0].trendingStylesOneSlug,
      picture: data[0].trendingStylesOneImage,
    },
    {
      slug: data[0].trendingStylesTwoSlug,
      picture: data[0].trendingStylesTwoImage,
    },
    {
      slug: data[0].trendingStylesThreeSlug,
      picture: data[0].trendingStylesThreeImage,
    },
    {
      slug: data[0].trendingStylesFourSlug,
      picture: data[0].trendingStylesFourImage,
    },
  ];

  return (
    <section
      className={cn(s.pictureGridWrap, category && s.categorypictureGridWrap)}
    >
      <h2>{data[0].trendingStyleTitle}</h2>
      <div className={cn(s.pictureGrid, category && s.category)}>
        {trendingStyleArray.map((p: any, i: number) => (
          <Link href={p.slug} key={i} passHref>
            <a className={s.picture} style={{ borderRadius: `${radius}` }}>
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
