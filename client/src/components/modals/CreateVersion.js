import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createVersion} from "../../http/deviceAPI";

const CreateVersion =  ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addVersion = () => {
        createVersion({name: value}).then(data => {
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
                    Добавить версию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название версии"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addVersion}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateVersion;