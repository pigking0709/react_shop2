import Modal from 'react-modal';
import './ReactModal.css';
import { FaCartPlus } from 'react-icons/fa';

Modal.setAppElement('#root');

export default function ReactModal({isOpen, item, onClose, onAddToCart}){
    if (!item) return null;

    return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel='상품 상세 보기'
        className="Modal"
        overlayClassName="Overlay"
    >
        <div className='modal-content'>
            <img src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
            <hr></hr>
            <p>{item.description}</p>
            <hr></hr>
            <b>{item.price * 1300} 원</b>
            <div>
                <button onClick={(e) => onAddToCart(e, item)}><FaCartPlus  style={{ fontSize: '16px' }}/></button>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    </Modal>
    );
}