import s from "./designs.module.scss";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import DesignsProduct, { Design } from "./DesignsProduct";

const fetcher = (id: any) => fetch(id).then((res) => res.json());

function useCustomImages(id: string) {
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
  const {
    data,
    isLoading,
    isError,
    mutate,
  }: {
    data: Design[];
    isLoading: boolean;
    isError: boolean;
    mutate: () => void;
  } = useCustomImages(userId);

  const [savedImages, setSavedImages] = useState(data);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (data) {
      setSavedImages(data);
      setSelectedImage("all");
    }
  }, [data]);

  const categories = data?.map((item: Design) => item.category);

  const handleFilter = (category: string) => {
    if (category === "all") {
      setSavedImages(data);
      setSelectedImage("all");
    } else {
      const filtered = data?.filter(
        (item: Design) => item.category === category
      );
      setSavedImages(filtered);
      setSelectedImage(category);
    }
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
          <div className={s.navFilterWrap}>
            <div className={s.navFilter}>
              <button onClick={() => handleFilter("all")}>
                <p className={`${selectedImage === "all" && s.selected}`}>
                  All
                </p>
              </button>
              {categories
                ?.filter((cat, i) => categories.indexOf(cat) === i)
                .map((category, i) => (
                  <button
                    key={`${category}-${i}`}
                    onClick={() => handleFilter(category)}
                  >
                    <p
                      className={`${category === selectedImage && s.selected}`}
                    >
                      {category.replace("_", " ")}
                    </p>
                  </button>
                ))}
            </div>
          </div>
          <div className={s.designs}>
            {savedImages?.length !== 0 ? (
              savedImages?.map((d: Design, i: number) => (
                <DesignsProduct design={d} key={i} mutate={mutate} />
              ))
            ) : (
              <div className={s.noDesigns}>
                <h2>No designs</h2>
                <p>Head to a product page to start creating your designs</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Designs;
