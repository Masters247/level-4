import { FC } from "react";
import s from "./collectionCard.module.scss";
import { Collection } from "../../../lib/graphcms-querys/collectionsQuery";
import { Button } from "../../ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Category } from "../../../lib/graphcms-querys/categoryQuery";

interface Props {
  collection: Category;
}

const CollectionCard: FC<Props> = ({ collection }) => {
  return (
    <div className={s.collectionCard}>
      <div className={s.cardImage}>
        <Image
          src={collection.homePageOrLinkImage.url}
          alt="Collection Image"
          width={collection.homePageOrLinkImage.width}
          height={collection.homePageOrLinkImage.height}
          layout="responsive"
          placeholder="blur"
          blurDataURL={collection.homePageOrLinkImage.url}
        />
      </div>
      <div className={s.cardText}>
        <h2>{collection.title}</h2>

        <Link href={`/${collection.categoriesSlug}`} passHref>
          <Button variant="secondary">Explore Range</Button>
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;
