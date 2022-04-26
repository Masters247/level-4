import Remove from "../../ui/icons/Remove";
import s from "./designs.module.scss";
import Image from "next/image";
import { FC } from "react";
import useSWR from "swr";

const fetcher = (id: any) => fetch(id).then((res) => res.json());

async function deleteImage(i: number) {
  console.log("delete image", i);
  await fetch(`/api/account/deleteCustomImage`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify(i),
  });
}

function useCustomImages(id: any) {
  const { data: images, error } = useSWR(
    `/api/account/getCustomImages?id=${id}`,
    fetcher,
    { revalidateOnFocus: false }
  );
  return {
    images: images,
    isLoading: !error && !images,
    isError: error,
  };
}

interface Props {
  userId: any;
}

const Designs: FC<Props> = ({ userId }) => {
  const { images, isLoading, isError } = useCustomImages(userId);
  // console.log("images in design", images[0].image);

  // console.log("userId Designs", userId);
  return (
    <>
      {isLoading ? (
        <div className={s.loggingInWrap}>
          <div className={s.imageWrap}>
            <Image src={"/loadingIcon.gif"} width={100} height={100} alt="" />
          </div>
        </div>
      ) : (
        <div className={s.designs}>
          {images.map((img: any, i: number) => (
            <div className={s.imageWrap} key={i}>
              {console.log("images", img)}
              <button
                className={s.deleteCustomButton}
                onClick={() => deleteImage(img.id)}
              >
                <Remove styles={s.removeIcon} />
              </button>

              <Image
                layout="responsive"
                src={img.image}
                width={500}
                height={500}
                alt=""
                placeholder="blur"
                blurDataURL={img.image}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// cl2fxc0au0018mw33j6o4d30i
// cl2fxc0au0018mw33j6o4d30i

export default Designs;
