const Modal = ({ modalImage, closeModal }: { modalImage: string | null, closeModal: () => void }) => (
    modalImage ? (
        <div className="modal" onClick={closeModal}>
            <span className="close">&times;</span>
            <img className="modal-content" src={modalImage} alt="預覽圖片" />
        </div>
    ) : null
);

export default Modal;