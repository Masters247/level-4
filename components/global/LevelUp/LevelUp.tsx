import type { GetStaticProps } from "next";
import { FC } from "react";
import levelUpQuery from "../../../lib/graphcms-querys/levelUpQuery";
import Image from "next/image";
import Link from "next/link";
import exp from "constants";
import s from "./levelUp.module.scss";
import Button from "../../ui/Button/Button";

interface Props {
  levelUp?: any;
}

const LevelUp: FC<Props> = ({ levelUp }) => {
  return (
    <div className={s.levelUpWrap}>
      <Image
        src={levelUp[0].levelUpHeroImage.url}
        height={levelUp[0].levelUpHeroImage.height}
        width={levelUp[0].levelUpHeroImage.width}
      />
      <div className={s.textButtonWrap}>
        <h2>{levelUp[0].heroTitle}</h2>
        <Link href={`/${levelUp[0].buttonSlug}`} passHref>
          <Button className={s.button} variant="primary">
            {levelUp[0].buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LevelUp;
