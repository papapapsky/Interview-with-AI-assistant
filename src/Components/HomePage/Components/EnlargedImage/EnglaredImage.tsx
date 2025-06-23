import "./englaredImage.css";
import { createPortal } from "react-dom";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  imgSrc: string;
}

export const EnglaredImage = ({ open, setOpen, imgSrc }: IProps) => {
  const modalWindow = document.getElementById("modalWindow");
  if (!modalWindow) return null;

  const closeModal = () => {
    setOpen(false);
  };

  return createPortal(
    <dialog open={open} onClick={closeModal}>
      <div className="modalPictureBox">
        {imgSrc ? <img src={imgSrc} alt="" className="modalPicture" /> : null}
      </div>
    </dialog>,
    modalWindow
  );
};
