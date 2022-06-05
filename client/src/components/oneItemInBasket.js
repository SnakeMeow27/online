import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {NavLink} from "react-router-dom";

const OneItemInBasket = ({application}) => {
    const {basket, user} = useContext(Context);

    return (
        <Card key={application.id} style={{width: "100%"}} className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={4}>
                        <Image src={process.env.REACT_APP_API_URL + application.img} style={{width: "100%", maxWidth: 250}} />
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12}>
                                <b>Название:</b> <NavLink to={`/application/${application.id}`}>{application.name}</NavLink>
                            </Col>
                        </Row>
                        <br/><br/>
                        <Row>
                            <Col xs={12}>
                                <b>Описание:</b><br/><br/>
                                {application.info && application.info.length !== 0? application.info.map((info, i) => {

                                    if(i % 2 === 0 ) {
                                        return (
                                            <Row key={info.id}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    } else {
                                        return (
                                            <Row key={info.id} style={{backgroundColor: "lightgray"}}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    }

                                }) : "Описание отсутствует"}
                            </Col>
                        </Row>


                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {user.isAuth ? <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(application, true)}>Удалить из корзины</Button>
                                    : <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(application)}>Удалить из корзины</Button>
                                }
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">

                            </Col>
                        </Row>

                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Цена: {application.price} RUB
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )};

export default OneItemInBasket;