import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './Home.css';
import { FaCartPlus } from "react-icons/fa";
import ReactModal from '../../components/itemModal/reactModal';
import { useState } from 'react';


export default function Home(props){
    // props.products 배열
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // 카로셀 설정값
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    function hSaveCart(event, product){
        // 버튼을 누르면 로컬스토리지에 저장하게(my_shop_cart)
        // 개수는 qty 키워드
        // {...product, qty}
        // 이미 있으면 개수만 증가시키고 없으면 추가
        event.stopPropagation(); // 이벤트 버블링 방지

        const cartKey = "my_shop_cart";
        const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const existingIndex = savedCart.findIndex(item => item.id === product.id);

        if (existingIndex !== -1) {
            // 이미 존재하면 qty 증가
            savedCart[existingIndex].qty += 1;
        } else {
            // 없으면 새로 추가
            savedCart.push({ ...product, qty: 1 });
        }

        localStorage.setItem(cartKey, JSON.stringify(savedCart));
        console.log('장바구니 업데이트 됨:', savedCart);
        alert(`${product.title}이 장바구니에 추가되었습니다.`);

    }

    function openDetailModal(item){
        setSelectedItem(item);
        setModalOpen(true);
    }

    function closeDetailModal(){
        setModalOpen(false);
        setSelectedItem(null);
    }
    return(
        <div className='Home_container'>
            {/* props.products 배열을 react-slick으로 카로셀 */}
            <div className='Home_slider_container'>
                <Slider {...sliderSettings} className='Home_slider'>
                    {
                        props.products?.map((item, index)=>{
                            return(
                                <div key={item.id} className='Home_slider_item'>
                                    <img src={item.image}/>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>

            {/* 
                props.products 배열을 grid로 한 행에 5개 
                이미지(200, 200), title, price, 가장 밑에 버튼
            */}
            <div className='Home_grid_container'>
                {
                    // map 배열반복문을 통해서
                    props.products?.map((item, index)=>{
                        return(
                            <div key={item.id} className='Home_items' onClick={()=>{openDetailModal(item)}}>
                                <img src={item.image} alt={item.title}/>
                                <b>{item.title}</b>
                                <p>{`${item.price * 1300} 원`}</p>
                                <button onClick={(event)=>{hSaveCart(event, item)}}><FaCartPlus /></button>
                            </div>
                        )
                    })
                }
            </div>
            {/* 
                상품의 상세 내역을 모달창을 통해 보내줌
                모달창이 열려있을 때만 보여줄 컴포넌트 <ReactModal>
                이미지, title, description, price*1300, 장바구니추가버튼
            */}
            {/* 모달창 오픈 && <ItemModal 장바구니 추가함수, 클릭된 item, 모달창 닫기함수, 모달창 오픈체크 */}
            <ReactModal
                isOpen={modalOpen}
                item={selectedItem}
                onClose={closeDetailModal}
                onAddToCart={hSaveCart}
            />
        </div>
    )
}