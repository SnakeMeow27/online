import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, USERBUY_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import BasketNavBar from "./BasketNavBar";

const NavBar =  observer( () => {
    const {user} = useContext(Context)
   const history = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
               < NavLink style={{color:"white"}} to={SHOP_ROUTE}>Kasumova Shop</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">

                        <BasketNavBar/>
                        {user.isAuth && <Button
                            className={"mr-3"}
                            variant={"outline-light"}
                            onClick={() => history(USERBUY_ROUTE) }
                        >
                            Заказы
                        </Button>}


                        <Button
                            variant={"outline-light"}
                            onClick={() => history(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()} className="ml-4"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} onClick={()=> history(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>

                }

            </Container>
        </Navbar>

    );
});

export default NavBar;