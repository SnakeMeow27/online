import {makeAutoObservable} from "mobx";
import {deleteDeviceFromBasket} from "../http/deviceAPI";

export default class BasketStoreStore {
    constructor() {
        this._totalPrice = 0;
        this._basket = [];
        makeAutoObservable(this);
    }

    async setDeleteItemBasket(application, isAuth = false) {
        if(isAuth) {
            await deleteDeviceFromBasket(application.id).then(() => {
                this._basket = this._basket.filter(item => item.id !== application.id);
                this._totalPrice -=  application.price * application.count;
            });
        } else {
            this._basket = this._basket.filter(item => item.id !== application.id);
            this._totalPrice -=  application.price * application.count;

            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setBasket(item, isAuth =false) {
        const checkApplicationInBasket = this._basket.findIndex(application => application.id === item.id);
        if(checkApplicationInBasket < 0) {
            this._basket = [...this._basket, { count: 1, ...item}];
            let totalPrice = 0;
            this._basket.forEach(application => totalPrice += Number(application.price * application.count));
            this._totalPrice = totalPrice;
        }

        if(!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
            console.log("Не зарегистрирован")
        }
    }

    setDeleteAllDeviceFromBasket() {
        this._totalPrice = 0;
        return this._basket = [];
    }

    setCountDevice(applicationId, action, isAuth = false) {
        const itemInd = this._basket.findIndex(item => item.id === applicationId);
        const itemInState = this._basket.find(device => device.id === applicationId);
        if (action === "+") {
            const newItem = {
                ...itemInState,
                count: ++itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        } else {
            const newItem = {
                ...itemInState,
                count: itemInState.count === 1 ? 1 : --itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        }

        if(!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }

        let totalPrice = 0;
        this._basket.forEach(application => totalPrice += Number(application.price * application.count));
        this._totalPrice = totalPrice;
    }

    resetBasket() {
        this._basket = [];
        this._totalPrice = 0;
        localStorage.removeItem('application');
    }


    get Basket() {
        return this._basket;
    }

    get Price() {
        return this._totalPrice;
    }
}