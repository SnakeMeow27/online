import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom";
import {APPLICATION_ROUTE} from "../utils/consts";

const ApplicationItem = ({application}) => {
   const history = useNavigate()

    return (
        <Col md={3} className={"mt-3"} onClick={()=> history(APPLICATION_ROUTE + '/'+ application.id)}>
            <Card style={{width:150, cursor: 'pointer'}} border={"light"}>
             <Image width={150} height={150} src={process.env.REACT_APP_API_URL + application.img} ></Image>
                <div className="text-black-50 mt-1 d-flex align-items-center justify-content-between">
                    <div>Рейтинг: </div>
                    <div className="d-flex align-items-center">
                        <div>{application.rating}</div>
                        <Image width={15} height={15} src={star}></Image>
                    </div>
                </div>
                <div>{application.name}</div>
            </Card>
        </Col>
    );
};

export default ApplicationItem;