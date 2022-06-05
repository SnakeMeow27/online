import React, {useContext, useState} from 'react';
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {sendOrder} from "../http/ordersAPI";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";
import emptyBasket from "../assets/emptyBasket.jpg";

const Ordering = () => {
    const {basket, user} = useContext(Context);
    const history = useNavigate();

    const buy = () => {
        let order = {
            basket: basket.Basket
        }

        if(user.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            console.log(data);
            basket.setDeleteAllDeviceFromBasket();
            history(SHOP_ROUTE);
        });
    }
    return (
        <>
            <div className="d-flex flex-column align-items-center mt-5">

                <div className="text-center mt-5" style={{fontSize: 18}}><b>Заказ сформирован. Ожидается оплата.</b></div>
            </div>
            <Row className="text-center mt-5">
                <Col    xs={12}>
                    <Button variant="secondary" onClick={buy}>Оплатить</Button>
                </Col>
            </Row>
        </>
    );
};

export default Ordering;