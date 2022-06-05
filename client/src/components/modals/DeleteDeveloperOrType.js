import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {deleteDelevoper, deleteType, fetchDevelopers, fetchTypes} from "../../http/deviceAPI";

const DeleteBrandOrType = ({show, onHide, showSuccessMsgFunc}) => {
    const [developerOrType, setDeveloperOrType] = useState("Разработчик");
    const [developers, setDevelopers] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectDeveloper, setSelectDeveloper] = useState({name: "Разработчик не выбран"});
    const [selectType, setSelectType] = useState({name: "Тип не выбран"});
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
        fetchTypes().then(data => setTypes(data));
        fetchDevelopers().then(data => setDevelopers(data));
    }, []);

    const Delete = async () => {
        if(developerOrType === "Разработчик") {
            if(selectDeveloper.name !== "Разработчик не выбран") {
                await deleteDelevoper(selectDeveloper.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectDeveloper({name: "Разработчик не выбран"});
                });
            } else {
                setMsgErr("Пожалуйста, выберите Разработчика");
                setShowMsgErr(true);
            }
        } else {
            if(selectType.name !== "Тип не выбран") {
                await deleteType(selectType.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectType({name: "Тип не выбран"});
                });
            } else {
                setMsgErr("Пожалуйста, выберите тип");
                setShowMsgErr(true);
            }
        }
    };

    useEffect(() => setShowMsgErr(false), [selectType, selectDeveloper, developerOrType])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Удаление типа или разработчика
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMsgErr &&
                    <>
                        <p style={{color: "red", textAlign: "center"}}>{msgErr}</p>
                    </>
                }

                Выберите категорию:
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {developerOrType}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {developerOrType === "Разработчик" ? <Dropdown.Item disabled>Разработчик</Dropdown.Item> : <Dropdown.Item onClick={() => setDeveloperOrType("Разработчик")}>Разработчик</Dropdown.Item>}
                        {developerOrType === "Тип" ? <Dropdown.Item disabled>Тип</Dropdown.Item> : <Dropdown.Item onClick={() => setDeveloperOrType("Тип")}>Тип</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>

                Выберите элемент из {developerOrType === "Разработчик" ? "Разработчик" : "Тип"}
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {developerOrType === "Разработчик" ? selectDeveloper.name : selectType.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {developerOrType === "Разработчик" ?
                            developers.map(({id, name}) =>
                                selectDeveloper.name === name ? <Dropdown.Item disabled key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectDeveloper({id, name})}>{name}</Dropdown.Item>
                            )
                            :
                            types.map(({id, name}) =>
                                selectType.name === name ? <Dropdown.Item disabled  key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectType({id, name})}>{name}</Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={Delete}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrandOrType;