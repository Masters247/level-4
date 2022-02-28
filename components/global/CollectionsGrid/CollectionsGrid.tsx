import { FC } from "react";
import { Collection } from "../../../lib/graphcms-querys/collectionsQuery";
import CollectionCard from "../CollectionCard";
import s from "./collectionsGrid.module.scss";

interface Props {
  collections: Collection[];
}

const CollectionsGrid: FC<Props> = ({ collections }) => {
  return (
    <div className={s.gridWrapper}>
      {collections.map((collection) => (
        <CollectionCard collection={collection} key={collection.id} />
      ))}
    </div>
  );
};

export default CollectionsGrid;
