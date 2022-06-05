import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {application} = useContext(Context)
    const getAllApplications = () => {
        application.setSelectedType("all");
        application.setSelectedDeveloper("all");
    }


    return (
        <div>
            <ListGroup.Item
                style={{cursor: "pointer"}}
                active={"all" === application.selectedType}
                onClick={getAllApplications}
            >
                Все приложения
            </ListGroup.Item>

            <ListGroup>
                {application.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === application.selectedType.id}
                    onClick={() => application.setSelectedType(type)}
                    key = {type.id}
                >
                    {type.name}
                </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
});

export default TypeBar;