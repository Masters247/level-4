import Remove from "../../ui/icons/Remove";
import s from "./designs.module.scss";
import Image from "next/image";
import { FC } from "react";
import useSWR from "swr";
import Download from "../../ui/icons/Download";

const fetcher = (id: any) => fetch(id).then((res) => res.json());

function useCustomImages(id: any) {
  const { data, error, mutate } = useSWR(
    `/api/account/getCustomImages?id=${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

interface Props {
  userId: any;
}

const Designs: FC<Props> = ({ userId }) => {
  const { data, isLoading, isError, mutate } = useCustomImages(userId);

  async function deleteImage(i: string, key: string) {
    await fetch(`/api/account/deleteCustomImage`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify({
        id: i,
        key,
      }),
    });
    mutate();
  }

  const handleFilter = (category: any) => {
    // console.log("category", category);
  };

  const downloadImage = (url: RequestInfo) => {
    const FileSaver = require("file-saver");
    FileSaver.saveAs(url, "image.jpg");
  };

  const date = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  return (
    <>
      {isLoading ? (
        <div className={s.loggingInWrap}>
          <div className={s.imageWrap}>
            <Image src={"/loadingIcon.gif"} width={100} height={100} alt="" />
          </div>
        </div>
      ) : (
        <>
          {/* <div className={s.navFilterWrap}>
            <div className={s.navFilter}>
              {pages[1].products?.map((c: any, i: number) => (
                <button
                  key={`${c.name} ${i}`}
                  onClick={() => handleFilter(c.name)}
                >
                  <p>{c.name}</p>
                </button>
              ))}
            </div>
          </div> */}
          <div className={s.designs}>
            {data.map((d: any, i: number) => (
              <div key={i} className={s.productWrap}>
                <div className={s.imageWrap}>
                  <button
                    className={s.deleteCustomButton}
                    onClick={() => deleteImage(d.id, d.s3Key)}
                  >
                    <Remove styles={s.removeIcon} />
                  </button>

                  {/* <a href={d.url} download target="_blank" rel="noreferrer"> */}
                  <button
                    className={s.downloadCustomButton}
                    onClick={() => downloadImage(d.url)}
                  >
                    <Download styles={s.removeIcon} />
                  </button>
                  {/* </a> */}
                  <Image
                    layout="responsive"
                    src={d.url}
                    width={500}
                    height={500}
                    alt=""
                    placeholder="blur"
                    blurDataURL={d.url}
                  />
                </div>
                <div className={s.productName}>
                  <p>{d.productName}</p>
                  <p className={s.created}>Created on: {date(d.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Designs;
