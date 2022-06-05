import React, {useState} from 'react';
import {Button,  Form, Modal} from "react-bootstrap";
import {createOC} from "../../http/deviceAPI";

const CreateOC =  ({show, onHide}) => {
    const [value, setValue] = useState('')
    const [categoryOC, setCategory] = useState('')

        const addOC = () => {
            const formData = new FormData()
            formData.append('name', value)
            formData.append('categoryOC', categoryOC)
            createOC(formData).then(data => onHide())

        }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить операционную систему
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
 <Form>
                            <Form.Control  md={4}
                                value={value}
                                className="mt-2"
                                onChange={e => setValue(e.target.value)}
                                placeholder={"Введите название операционной системы"}
                            />

                            <Form.Control  md={4}
                                value={categoryOC}
                                className="mt-2"
                                onChange={e => setCategory(e.target.value)}
                                placeholder={"Введите категорию операционной системы (при наличии)"}
                            />



                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addOC}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateOC;