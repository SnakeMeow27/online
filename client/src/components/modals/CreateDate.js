import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createDate} from "../../http/deviceAPI";

const CreateDate =  ({show, onHide}) => {
    const [value, setValue] = useState('')
    const addDateL = () => {
        createDate({name: value}).then(data => {
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
                    Добавить время действия лицензии
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название времени действия"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDateL}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDate;