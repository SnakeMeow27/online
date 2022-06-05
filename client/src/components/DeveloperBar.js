import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Container, Row} from "react-bootstrap";

const DeveloperBar = observer(() => {
    const {application} = useContext(Context)
    return (
        <Container>
            <Row className="d-flex" >
                {application.developers.map(developer =>
                    <Card
                        style={{cursor:'pointer'}}
                        key={developer.id}
                        className="p-3 card text-center col-sm-2"
                        onClick={() => application.setSelectedDeveloper(developer)}
                        border={developer.id === application.selectedDeveloper.id ? 'danger' : 'light'}
                    >
                        {developer.name}
                    </Card>
                )}
            </Row>
        </Container>

    );
});

export default DeveloperBar;