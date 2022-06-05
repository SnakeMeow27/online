import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const  {application} = useContext(Context)
    const pageCount = Math.ceil(application.totalCount / application.limit)
    const pages = []

    for (let i = 0; i< pageCount; i++){
       pages.push(i+1)
    }
    return (
        <Pagination className="mt-5">
            {pages.map(page =>
            <Pagination.Item
                key = {page}
            active={application.page === page}
                onClick={() => application.setPage(page)}
            >{page}</Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;