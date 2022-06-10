import s from "./designs.module.scss";
import Image from "next/image";
import { FC } from "react";
import useSWR from "swr";
import DesignsProduct, { Design } from "./DesignsProduct";

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

  const handleFilter = (category: any) => {
    // console.log("category", category);
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
            {data?.length !== 0 ? (
              data.map((d: Design, i: number) => (
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
