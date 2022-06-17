import s from "./visualiserButtons.module.scss";
import cn from "classnames";
import { useSession } from "next-auth/react";
import ControlButton from "../Button/ControlButton";
import Spinner from "../../ui/icons/Spinner";
import { useState } from "react";
import { useStore } from "../store";
import html2canvas from "html2canvas";

const download = require("downloadjs");

const VisualiserButtons = ({
  actionsTaken, //  STORE DIFFICULT
  handleRedo, // STORE
  handleUndo, // STORE
  redoActive, // STORE
  undoActive, // STORE
}: any) => {
  const store = useStore();
  const { data: session }: any = useSession();
  const [spinnerColourDownload, setSpinnerColourDownload] = useState("#ffffff");
  const [spinnerColourSave, setSpinnerColourSave] = useState("#ffffff");

  const handleMouseEnter = (i: string) => {
    if (i === "save") {
      setSpinnerColourSave("#909090");
    } else {
      setSpinnerColourDownload("#be9957");
    }
  };

  const handleMouseLeave = (i: string) => {
    if (i === "save") {
      setSpinnerColourSave("#ffffff");
    } else {
      setSpinnerColourDownload("#ffffff");
    }
  };

  const handleDownloadCustomImage = () => {
    store.setDownloadCustomImage(1);
    store.setShowHidDragResizeDiv(false);

    const takeScreenShot = () => {
      html2canvas(document.getElementById("capture") as HTMLElement, {
        useCORS: true,
      })
        .then((canvas) => {
          const image = canvas.toDataURL("image/jpeg");
          download(image, `Level 4 | ${name}.jpeg`, "image/jpeg");
          store.setDownloadCustomImage(2);
          setTimeout(() => store.setDownloadCustomImage(0), 2000);
        })
        .then(() => {
          store.setShowHidDragResizeDiv(true);
        })
        .catch((err) => {
          console.log("IMAGE DOWNLOAD ERROR: ", err);
        });
    };
    setTimeout(() => takeScreenShot(), 1000);
  };

  const handleSaveCustomImage = () => {
    store.setSaveCustomImage(1);
    store.setShowHidDragResizeDiv(false);

    const takeScreenShot = () => {
      html2canvas(document.getElementById("capture") as HTMLElement, {
        useCORS: true,
      })
        .then((canvas) => {
          const image = canvas.toDataURL("image/jpeg");
          fetch("/api/productApp/customImage", {
            method: "POST",
            body: JSON.stringify({
              image,
              userId: session.user.userId,
              productName: store.productName,
              productCategory: store.productCategory,
            }),
            headers: { "Content-Type": "application/json" },
          });
        })
        .then(() => {
          store.setShowHidDragResizeDiv(true),
            store.setSaveCustomImage(2),
            setTimeout(() => store.setSaveCustomImage(0), 2000);
        })
        .catch((err) => {
          console.log("IMAGE DOWNLOAD ERROR: ", err);
        });
    };
    setTimeout(() => takeScreenShot(), 1000);
  };

  return (
    <div className={cn(s.uiButtons)}>
      <ControlButton
        className={s.newLogoButton}
        variant="primary-c"
        onClick={() => store.setImageUploader(!store.imageUploader)}
      >
        {store.imageUploader ? <>Close Image Uploader</> : <>Add New Logo</>}
      </ControlButton>
      <ControlButton
        undo={true}
        variant="primary-c"
        disabled={!undoActive}
        onClick={handleUndo}
      >
        undo
      </ControlButton>
      <ControlButton
        redo={true}
        variant="primary-c"
        disabled={!redoActive}
        onClick={handleRedo}
      >
        redo
      </ControlButton>
      <ControlButton
        save={store.saveCustomImage === 0 && true}
        tick={store.saveCustomImage === 2 && true}
        variant="tertiary"
        disabled={!session || !actionsTaken}
        onClick={handleSaveCustomImage}
        onMouseEnter={() => handleMouseEnter("save")}
        onMouseLeave={() => handleMouseLeave("save")}
      >
        {store.saveCustomImage === 0 && "save"}
        {store.saveCustomImage === 1 && <Spinner colour={spinnerColourSave} />}
        {store.saveCustomImage === 2 && "saved"}
      </ControlButton>
      <ControlButton
        download={store.downloadCustomImage === 0 && true}
        tick={store.downloadCustomImage === 2 && true}
        variant="secondary"
        disabled={!actionsTaken}
        onClick={handleDownloadCustomImage}
        onMouseEnter={() => handleMouseEnter("download")}
        onMouseLeave={() => handleMouseLeave("download")}
      >
        {store.downloadCustomImage === 0 && "download"}
        {store.downloadCustomImage === 1 && (
          <Spinner colour={spinnerColourDownload} />
        )}
        {store.downloadCustomImage === 2 && "downloaded"}
      </ControlButton>
    </div>
  );
};

export default VisualiserButtons;
