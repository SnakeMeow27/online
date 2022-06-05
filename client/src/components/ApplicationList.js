import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ApplicationItem from "./ApplicationItem";

const ApplicationList = observer(() => {
   const {application} = useContext(Context)
    return (
        <Row className="d-flex">
            {application.applications.map(application =>
<ApplicationItem key={application.id} application={application}></ApplicationItem>
            )}
        </Row>
    );
});

export default ApplicationList;