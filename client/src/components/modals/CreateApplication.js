import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, FormControl, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import app from "../../App";
import {createApplication, fetchApplications, fetchDevelopers, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateApplication = observer(({show, onHide}) => {
   const {application} = useContext(Context)
   const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data=> application.setTypes(data))
        fetchDevelopers().then(data=> application.setDevelopers(data))
    }, [])


    const addInfo = () => {
      setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i=>i.number !== number))
    }
   const changeInfo = (key, value, number) =>{
       setInfo(info.map(i=> i.number === number ? {...i, [key]:value} : i))
   }

    const selectFile = e => {
       setFile(e.target.files[0])
    }

    const addApplication = () => {
       const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('developerId', application.selectedDeveloper.id)
        formData.append('typeId', application.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createApplication(formData).then(data => onHide())
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить приложение
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle  className={"btn-secondary"}>{application.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {application.types.map(type =>
                           <Dropdown.Item onClick={() => application.setSelectedType(type)}
                                          key={type.id}
                           >
                               {type.name}
                           </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle  className={"btn-secondary"}>{application.selectedDeveloper.name || "Выберите разработчика"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {application.developers.map(developer =>
                                <Dropdown.Item onClick={() => application.setSelectedDeveloper(developer)}
                                               key={developer.id}
                                >
                                    {developer.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-2"
                        placeholder="Введите название приложения">
                    </Form.Control>
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-2"
                        placeholder="Введите стоимость приложения"
                        type="number"

                    >
                    </Form.Control>
                    <Form.Control
                        className="mt-2"
                        type="file"
                        onChange={selectFile}
                    >
                    </Form.Control>
                    <hr/>
                    <Button
                    variant="outline-dark"
                    onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e)=>changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    onChange={(e)=>changeInfo('description', e.target.value, i.number)}
                                    value={i.description}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addApplication}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateApplication;