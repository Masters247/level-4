import { FC } from "react";
import s from "./collectionCard.module.scss";
import { Collection } from "../../../lib/graphcms-querys/collectionsQuery";
import { Button } from "../../ui/Button";
import Image from "next/image";
import Link from "next/link";

interface Props {
  collection: Collection;
}

const CollectionCard: FC<Props> = ({ collection }) => {
  return (
    <div className={s.collectionCard}>
      <div className={s.cardImage}>
        <Image
          src={collection.heroImage.url}
          alt="Collecttion Image"
          width={collection.heroImage.width}
          height={collection.heroImage.height}
          layout="responsive"
        />
      </div>
      <div className={s.cardText}>
        <h2>{collection.title}</h2>
        <h3>{collection.shortDesctiption}</h3>
        <Link href="/" passHref>
          <Button variant="secondary">Explore Range</Button>
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;
