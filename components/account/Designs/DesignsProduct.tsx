import { FC, useState } from "react";
import Download from "../../ui/icons/Download";
import Remove from "../../ui/icons/Remove";
import s from "./designs.module.scss";
const download = require("downloadjs");
import Image from "next/image";

export type Design = {
  category: string;
  createdAt: string;
  id: string;
  productName: string;
  s3Key: string;
  url: string;
  userId: string;
};

interface Props {
  design: Design;
  mutate: () => void;
}

const DesignsProduct: FC<Props> = ({ design, mutate }) => {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const date = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const deleteImage = async (i: string, key: string) => {
    await fetch(`/api/account/deleteCustomImage`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify({
        id: i,
        key,
      }),
    });
    mutate();
  };

  const downloadImage = async (
    url: RequestInfo,
    name: string,
    createdAt: string
  ) => {
    setDownloadLoading(true);
    const convertImage = await fetch(`/api/downloadImage`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        url,
      }),
    });
    const { base64 } = await convertImage.json();
    download(
      `data:image/jpeg;base64,${base64}`,
      `Level 4 - ${name} - ${date(createdAt)}.jpeg`,
      "image/jpeg"
    );
    setDownloadLoading(false);
  };
  return (
    <div className={s.productWrap}>
      <div className={s.imageWrap}>
        <button
          className={s.deleteCustomButton}
          onClick={() => deleteImage(design.id, design.s3Key)}
        >
          <Remove styles={s.removeIcon} />
        </button>

        <button
          className={s.downloadCustomButton}
          onClick={() =>
            downloadImage(design.url, design.productName, design.createdAt)
          }
        >
          {!downloadLoading ? (
            <Download styles={s.removeIcon} />
          ) : (
            <div className={s.imageWrap}>
              <Image src={"/loadingIcon.gif"} width={20} height={20} alt="" />
            </div>
          )}
        </button>

        <Image
          layout="responsive"
          src={design.url}
          width={500}
          height={500}
          alt=""
          placeholder="blur"
          blurDataURL={design.url}
        />
      </div>
      <div className={s.productName}>
        <p>{design.productName}</p>
        <p className={s.created}>Created on: {date(design.createdAt)}</p>
      </div>
    </div>
  );
};

export default DesignsProduct;
