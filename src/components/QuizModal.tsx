import { useEffect, useRef, ReactNode } from "react";

type ModalProps = {
  openModal: boolean;
  closeModal: () => void;
  children: ReactNode;
  audio: boolean;
  image: boolean;
};

const Modal: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  children,
  audio,
  image,
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className={
        "modal " + (audio ? "modal-audio" : image ? "modal-image" : "")
      }
    >
      <div className="modal-content">{children}</div>
    </dialog>
  );
};

export default Modal;
