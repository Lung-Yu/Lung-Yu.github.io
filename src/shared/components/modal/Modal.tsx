import './styles/modal.css';

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: CommonModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <span className="close">&times;</span>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;