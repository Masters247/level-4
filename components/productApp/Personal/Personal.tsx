import Image from "next/image";
import { Button } from "../../ui/Button";
import Link from "next/link";
import s from "./personal.module.scss";

const Personal = () => {
  return (
    <section className={s.personalWrap}>
      <h2>Products made personal</h2>
      <Link href="/" passHref>
        <Button className={s.button} variant="primary">
          Build Your Range
        </Button>
      </Link>
    </section>
  );
};

export default Personal;
