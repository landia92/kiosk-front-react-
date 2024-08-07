import React, { useContext } from 'react';
import { Product, OrderModuleDTO } from '../types';
import axios from "axios";
import styled from 'styled-components';

const CheckoutButtonWrapper = styled.button`
    background-color: ${({ theme }) => theme.checkoutBgColor};
    color: ${({ theme }) => theme.checkoutColor};
    border: none;
    padding: 1rem;
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.checkoutHoverBgColor};
    }
`;

const API_URL = process.env.REACT_APP_API_URL;

interface CheckoutButtonProps {
    selectedProducts: Product[];
    totalPrice: number;
    onCheckoutClick: (orderData: OrderModuleDTO) => void;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ selectedProducts, totalPrice, onCheckoutClick }) => {
    const handleCheckout = () => {
        const adminName = localStorage.getItem('adminId');
        axios.get(`${API_URL}/api/request_payment/check_out/${adminName}`)
            .then(response => {
                const data = response.data;
                console.log(data);
                const orderData: OrderModuleDTO = {
                    id: data.id,
                    price: totalPrice,
                    storeName: data.storeName,
                    email: data.email,
                    address: data.address,
                    status: data.status,
                    paymentUid: '',
                    orderUid: data.orderUid
                };

                console.log('Checkout data:', orderData);
                onCheckoutClick(orderData);
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <CheckoutButtonWrapper onClick={handleCheckout}>
            Checkout
        </CheckoutButtonWrapper>
    );
};

export default CheckoutButton;
