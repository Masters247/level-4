import LevelUp from "../../components/global/LevelUp/LevelUp";
import graphcms from "../graph-ql";

const levelUpQuery = async () => {
  const { levelUps } = await graphcms.request(`
  query MyQuery {
    levelUps {
      buttonSlug
      buttonText
      heroTitle
      levelUpHeroImage {
        height
        url
        width
      }
    }
  }
      `);
  return levelUps;
};

export type LevelUp = {
  buttonSlug: string;
  buttonText: string;
  heroTitle: string;
  levelUpHeroImage: {
    height: number;
    url: string;
    width: number;
  };
};

export default levelUpQuery;
