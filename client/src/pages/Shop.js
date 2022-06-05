import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import DeveloperBar from "../components/DeveloperBar";
import ApplicationList from "../components/ApplicationList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchApplications, fetchDevelopers, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {application} = useContext(Context)

    useEffect(() => {
      fetchTypes().then(data => application.setTypes(data));
        fetchDevelopers().then(data=> application.setDevelopers(data));
        fetchApplications(null, null, 1, 12).then(data=> {
            application.setApplications(data.rows);
            application.setTotalCount(data.count);
    })
    }, [])

    useEffect(() => {
        if (application.selectedType === "all"){
            fetchApplications(null, application.selectedDeveloper.id, application.page, 12). then (data => {
                application.setApplications(data.rows);
                application.setTotalCount(data.count)
            });
        }

        else {
            fetchApplications(application.selectedType.id, application.selectedDeveloper.id, application.page, 12).then(data=> {
                application.setApplications(data.rows)
                application.setTotalCount(data.count)
            });
        }

    }, [application.page, application.selectedType, application.selectedDeveloper], );

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar></TypeBar>
                </Col>
                <Col md={9}>
                   <DeveloperBar></DeveloperBar>
                    <ApplicationList></ApplicationList>
                    <Pages></Pages>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;