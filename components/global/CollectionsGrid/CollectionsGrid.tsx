import { FC } from "react";
import { Collection } from "../../../lib/graphcms-querys/collectionsQuery";
import CollectionCard from "../CollectionCard";
import s from "./collectionsGrid.module.scss";

interface Props {
  collections: Collection[];
  slugs: any;
}

const CollectionsGrid: FC<Props> = ({ collections, slugs }) => {
  return (
    <div className={s.gridWrapper}>
      {collections.map((collection) => (
        <CollectionCard collection={collection} key={collection.id} />
      ))}
    </div>
  );
};

export default CollectionsGrid;
