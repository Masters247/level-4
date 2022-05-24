import Image from "next/image";
import { FC } from "react";
import { Button } from "../../ui/Button";
import Link from "next/link";
import s from "./visualise.module.scss";

interface Props {
  slug: any;
  image?: any;
}

const Visualise: FC<Props> = ({ slug, image }) => {
  return (
    <section className={s.visualiseWrap}>
      <div className={s.imageWrap}>
        {image === null ? (
          <p
            style={{
              margin: "auto",
            }}
          >
            Image
          </p>
        ) : (
          <Image
            layout="responsive"
            alt=""
            src={image.url}
            blurDataURL={image.url}
            placeholder="blur"
            width={image.width}
            height={image.height}
          />
        )}
      </div>
      <div className={s.visualiseText}>
        <h2>Visualise</h2>
        <p>
          Our visualiser tool makes it easier for you to see products with your
          brand on. Start now and get a quote from our trusted sales team.
        </p>
        <Link href={`/custom/${slug}`} passHref>
          <Button className={s.button} variant="primary">
            Personalise this item
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Visualise;
