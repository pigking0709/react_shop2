import { useEffect, useState } from 'react';
import './Cart.css';

export default function Cart() {
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem("my_shop_cart")) || [];
        setCartList(cartData);
    }, []);

    // 수량 증가
    const increaseQty = (id) => {
        const updatedCart = cartList.map(item =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
        setCartList(updatedCart);
        localStorage.setItem("my_shop_cart", JSON.stringify(updatedCart));
    };

    // 수량 감소
   const decreaseQty = (id) => {
    let updatedCart = cartList.map(item =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
    );

    updatedCart = updatedCart.filter(item => item.qty > 0);

    setCartList(updatedCart);
    localStorage.setItem("my_shop_cart", JSON.stringify(updatedCart));
};


    // 총금액 계산
    const total = cartList.reduce((acc, item) => acc + (item.price * 1300 * item.qty), 0);

    return (
        <div className='Cart_container'>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>사진</th>
                        <th>품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>총금액</th>
                    </tr>
                </thead>
                <tbody>
                    {cartList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td><img src={item.image} alt={item.title} width="50" /></td>
                            <td>{item.title}</td>
                            <td>{(item.price * 1300).toLocaleString()} 원</td>
                            <td>
                                <button onClick={() => decreaseQty(item.id)}>-</button>
                                {` ${item.qty} `}
                                <button onClick={() => increaseQty(item.id)}>+</button>
                            </td>
                            <td>{(item.price * 1300 * item.qty).toLocaleString()} 원</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}><b>총금액 : {total.toLocaleString()} 원</b></td>
                        <td ></td>
                        <td>
                            <button className="purchase-button" onClick={() => alert("구매가 완료되었습니다!")}>
                                구매하기
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
