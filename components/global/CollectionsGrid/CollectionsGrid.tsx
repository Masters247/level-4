import { FC } from "react";
import { Category } from "../../../lib/graphcms-querys/categoryQuery";
import CollectionCard from "../CollectionCard";
import s from "./collectionsGrid.module.scss";

interface Props {
  collections: Category[];
}

const CollectionsGrid: FC<Props> = ({ collections }) => {
  return (
    <div className={s.gridWrapper}>
      {collections?.map((collection, i) => (
        <CollectionCard collection={collection} key={i} />
      ))}
    </div>
  );
};

export default CollectionsGrid;
