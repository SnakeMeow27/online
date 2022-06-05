import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";

import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {
    addApplicationToBasket,
    addRating,
    checkRating, fetchApplications, fetchDate, fetchDevelopers, fetchLanguage, fetchLicense, fetchOC,
    fetchOneApplication, fetchOneDate, fetchOneVersion, fetchTypes
} from "../http/deviceAPI";
import {Context} from "../index";
import RatingStars from "../components/ratingStars";
import {observer} from "mobx-react-lite";

const ApplicationPage = observer(() => {
    const [application, setApplication] = useState({info: []})
    const [application2, setApplication2] = useState({license: []})
    const  [license1, setLisense1] = useState(null)
    const  {id} = useParams()
    const {user, basket} = useContext(Context);
    const [resRate, setResRate] = useState("");
    const [isAccessRating, setSsAccessRating] = useState(false);
    const [dateL, setDateL] = useState()
    const [versionL, setversion] = useState()
    const [OCS, setOC] = useState()
    const [LanguageApp, setLanguageApp] = useState()
    useEffect(() =>{

        fetchOC(null, id).then((data=> setOC(data)));
        fetchLanguage(null, id).then((data=> setLanguageApp(data)));
    }, [id])



    useEffect(() =>{
fetchOneApplication(id).then(data=>setApplication(data));
fetchOneApplication(id).then(data=>setApplication2(data));
    if(user.isAuth) {
        checkRating({deviceId: id}).then(res => setSsAccessRating(res.allow));
        console.log("рейтинг проверен")
    }

}, [id, resRate])

    const isApplicationInBasket = () => {
        const findApplication = basket.Basket.findIndex(item => Number(item.id) === Number(application.id));
        return findApplication < 0;
    }

    const addApplicationInBasket = (application) => {

        if(user.isAuth) {
            addApplicationToBasket(application).then(() => basket.setBasket(application, true))

        } else {
            basket.setBasket(application);
        }
    }


    const ratingChanged = (rate) => {
        addRating({
            rate,
            applicationId: id
        }).then(res => {
            setResRate(res);
        });
    };
    function   AppOC ()
    {
        let OCApplication = "Операционные системы, которые поддерживает приложение: "
              for (let i =0; i <=  Object.keys(OCS).length -1; i++)
        { OCApplication = OCApplication + OCS[i].OC.name + " " + OCS[i].OC.categoryOC + ".   "
        }
        console.log(OCApplication)
        return OCApplication
    }

    function   AppLanguage ()
    {
        let LanguageApplication = "Языки, которые поддерживает приложение: "
        for (let i =0; i <= Object.keys(LanguageApp).length -1; i++)
        { LanguageApplication = LanguageApplication + LanguageApp[i].language.name + ". "
        }
        console.log(LanguageApp)
        return LanguageApplication
    }


    function ValueLicense(license) {
    setLisense1(license);
  fetchOneDate(license).then((data=>setDateL(data.name)))
  console.log(dateL)


}

    function ValueVersion(version) {
        setLisense1(version);
        fetchOneVersion(version).then((data=>setversion(data.name)))
        console.log(versionL)


    }




    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + application.img}></Image>

                </Col>
                <Col  md={4}>

                    <Row className="d-flex flex-column align-items-center">
                        <h2>{application.name}</h2>
                        <div className="d-flex align-items-center justify-content-center"
                             style={{background: `url(${bigStar}) no-repeat center center`, width:240, height:240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {application.rating}
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <RatingStars
                                ratingChanged={ratingChanged}
                                ratingVal={application?.rating || 0}
                                isAuth={user.isAuth}
                                isAccessRating={isAccessRating}

                            />
                            {resRate}
                        </div>

                    </Row>
                </Col>

                <Col md={4}>
                <Card className="d-flex flex-column align-items-center justify-content-around"
                style={{width:300, height:300, fontSize:32, border: '5px solid lightgray'}}
                >
                    <Container>
                        <Row>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle className={"btn-secondary"}>{ dateL|| "Лицензия"}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {application2.license.map(license =>
                                            <Dropdown.Item onClick={() =>  ValueLicense(license.DateOfActionId)}
                                                           key={license.id}
                                            >
                                                {"Код лицензии: " + license.DateOfActionId}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Button   variant="outline-dark" onClick={() => {const LangN = AppLanguage()
                                    alert(LangN)} }>Язык</Button>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle className={"btn-secondary"}>{ versionL|| "Версия"}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {application2.license.map(version =>
                                            <Dropdown.Item onClick={() =>  ValueVersion(version.VersionId)}
                                                           key={version.id}
                                            >
                                                {"Код версии: " + version.VersionId}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Button   variant="outline-dark" onClick={() => {const OCN = AppOC ()
                                    alert(OCN)} }>ОС</Button>
                            </Col>
                        </Row>
                    </Container>
                    <h3>{application.price + " RUB"}</h3>

                    { isApplicationInBasket() ?
                        <Button  variant="dark" onClick={() => addApplicationInBasket(application)}>Добавить в корзину</Button>
                        :
                        <Button variant="outline-dark" disabled>Приложение уже в корзине</Button>
                    }

                </Card>
                </Col>

            </Row>

           <Row className="d-flex flex-column mt-3">
               <h1>Характеристики</h1>
               {application.info.map((info, index ) =>
                   <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                       {info.title}:{info.description}
                   </Row>
               )}
           </Row>
        </Container>
    );

});

export default ApplicationPage;