import Image from "next/image";
import { Button } from "../../ui/Button";
import Link from "next/link";
import s from "./visualise.module.scss";

const Visualise = () => {
  return (
    <section className={s.visualiseWrap}>
      <div className={s.imageWrap}>Image</div>
      <div className={s.visualiseText}>
        <h2>Visualise</h2>
        <p>
          Our visualiser tool makes it easier for you to see products with your
          brand on. Start now and get a quote from our trusted sales team.
        </p>
        <Link href="/" passHref>
          <Button className={s.button} variant="primary">
            Personalise this item
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Visualise;
