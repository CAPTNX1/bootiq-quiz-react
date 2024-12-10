import { useEffect, useRef, ReactNode } from "react";

type ModalProps = {
  openModal: boolean;
  closeModal: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ openModal, closeModal, children }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className="modal">
      <div className="modal-content">{children}</div>
    </dialog>
  );
};

export default Modal;
