import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

import {createDeveloper} from "../../http/deviceAPI";

const CreateDeveloper = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addDeveloper = () => {
        createDeveloper({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить разработчика
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название разработчика"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDeveloper}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDeveloper;