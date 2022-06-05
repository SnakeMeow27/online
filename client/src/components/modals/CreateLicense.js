import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import app from "../../App";
import {
    createApplication, createLicense,
    fetchApplications,
    fetchDate,
    fetchVersion
} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateLicense = observer(({show, onHide}) => {
    const {application} = useContext(Context)
    const [name, setName] = useState('')
    const [apps, setApps] = useState('')


    useEffect(() => {
        fetchVersion().then(data=> application.setVersion(data))
        fetchDate().then(data=> application.setDate(data))
    }, [])

    const addLicense = () => {
        const formData = new FormData()
        formData.append('licenseApp', name)
        formData.append('applicationId', apps)
        formData.append('VersionId', application.selectedVersion.id)
        formData.append('DateOfActionId', application.selectedDate.id)

        createLicense(formData).then(data => onHide())

    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить лицензию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Control
                        value={apps}
                        onChange={e => setApps(e.target.value)}
                        className="mt-2"
                        placeholder="Введите код приложения">
                    </Form.Control>

                    <Container>
                        <Row>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle  className={"btn-secondary"}>{application.selectedDate.name || "Выберите время действия"}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {application.dates.map(date =>
                                            <Dropdown.Item onClick={() => application.setSelectedDate(date)}
                                                           key={date.id}
                                            >
                                                {date.name}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle  className={"btn-secondary"}>{application.selectedVersion.name || "Выберите версию"}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {application.versions.map(version =>
                                            <Dropdown.Item onClick={() => application.setSelectedVersion(version)}
                                                           key={version.id}
                                            >
                                                {version.name}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Container>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-2"
                        placeholder="Введите название лицензии">
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addLicense}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateLicense;