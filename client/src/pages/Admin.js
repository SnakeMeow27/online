import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateApplication from "../components/modals/CreateApplication";
import CreateDeveloper from "../components/modals/CreateDeveloper";
import CreateType from "../components/modals/CreateType";
import CreateLanguage from "../components/modals/CreateLanguage";
import CreateOC from "../components/modals/CreateOC";
import CreateVersion from "../components/modals/CreateVersion";
import CreateDate from "../components/modals/CreateDate";
import CreateLicense from "../components/modals/CreateLicense";
import DeleteDeveloperOrType from "../components/modals/DeleteDeveloperOrType";



const Admin = () => {
    const [applicationVisible, setApplicationVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [developerVisible, setDeveloperVisible] = useState(false)
    const [LanguageVisible, setLanguageVisible] = useState(false)
    const [OCVisible, setOCVisible] = useState(false)
    const [VersionVisible, setVersionVisible] = useState(false)
    const [DateVisible, setDateVisible] = useState(false)
    const [DateLicense, setDateLicense] = useState(false)
    const [deleteDeveloperOrType, setDeleteDeveloperOrType] = useState(false);


    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }
    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setTypeVisible(true)}>Добавить тип</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2"  onClick={() => setDeveloperVisible(true)}>Добавить разработчика</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setApplicationVisible(true)}>Добавить приложение</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setLanguageVisible(true)}>Добавить язык</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setOCVisible(true)}>Добавить операционную систему</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setVersionVisible(true)}>Добавить версию</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setDateVisible(true)}>Добавить время действия лицензии</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setDateLicense(true)}>Добавить лицензию</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setDeleteDeveloperOrType(true)}>Удаление бренда и разработчика</Button>

            <CreateApplication show={applicationVisible} onHide={() => setApplicationVisible(false)}/>
            <CreateDeveloper show={developerVisible} onHide={() => setDeveloperVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateLanguage show={LanguageVisible} onHide={() => setLanguageVisible(false)}/>
            <CreateOC show={OCVisible} onHide={() => setOCVisible(false)}/>
            <CreateVersion show={VersionVisible} onHide={() => setVersionVisible(false)}/>
            <CreateDate show={DateVisible} onHide={() => setDateVisible(false)}/>
           <CreateLicense show={DateLicense} onHide={() => setDateLicense(false)}/>
            <DeleteDeveloperOrType show={deleteDeveloperOrType} onHide={() => setDeleteDeveloperOrType(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>


        </Container>
    );
};

export default Admin;