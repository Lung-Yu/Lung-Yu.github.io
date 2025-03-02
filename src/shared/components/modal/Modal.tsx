import './styles/modal.css';

interface CommonModalProps {
  isOpen?: boolean;
  image?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = ({ isOpen = true, image, onClose, children }: CommonModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <span className="close">&times;</span>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {image ? (
          <img src={image} alt="Modal content" className="modal-image" />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Modal;