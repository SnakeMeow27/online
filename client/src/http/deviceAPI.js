import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}
export const createLanguage = async (language) => {
    const {data} = await $authHost.post('api/language', language)
    return data
}
export const createVersion = async (version) => {
    const {data} = await $authHost.post('api/version', version)
    return data
}
export const createDate = async (date) => {
    const {data} = await $authHost.post('api/dateL', date)
    return data
}
export const createOC = async (oc) => {
    const {data} = await $authHost.post('api/OC', oc)
    return data
}
export const createLicense = async (license) => {
    const {data} = await $authHost.post('api/license', license)
    return data
}
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
export const fetchVersion = async () => {
    const {data} = await $host.get('api/version')
    return data
}
export const fetchDate = async () => {
    const {data} = await $host.get('api/dateL')
    return data
}
export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/type/'+id});
    return data;
}
export const createDeveloper = async (developer) => {
    const {data} = await $authHost.post('api/developer', developer)
    return data
}
export const deleteDelevoper = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/developer/'+id});
    return data;
}
export const fetchDevelopers= async () => {
    const {data} = await $host.get('api/developer', )
    return data
}
export const fetchLicense = async () => {
    const {data} = await $host.get('api/license', )
    return data
}

export const fetchOneDate = async (id) => {
    const {data} = await $host.get('api/dateL/' + id)
    return data
}
export const createApplication = async (application) => {
    const {data} = await $authHost.post('api/application', application)
    return data
}

export const fetchApplications = async (typeId, developerId, page, limit= 4) => {
    const {data} = await $host.get('api/application', {params: {
            typeId, developerId, page, limit
        }})
    return data
}
export const fetchOC = async (OCId, applicationId) => {
    const {data} = await $host.get('api/OC', {params: {
            OCId, applicationId
        }})
    return data
}

export const fetchLanguage = async (LangId, applicationId) => {
    const {data} = await $host.get('api/language', {params: {
            LangId, applicationId
        }})
    return data
}

export const fetchOneApplication = async (id) => {
    const {data} = await $host.get('api/application/' + id)
    return data
}
export const fetchOneVersion= async (id) => {
    const {data} = await $host.get('api/version/' + id)
    return data
}


export const fetchDeleteApplication = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/dapplication/${id}`});
    return data;
}

export const updateApplication = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/application/${id}`, data: body});
    return data;
}

export const getAllDevicesInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authHost({method:'GET', url:`api/application/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}

export const addApplicationToBasket = async (application) => {
    const {data} = await $authHost.post('api/basket', application);
    return data;
}

export const getDeviceFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deleteDeviceFromBasket = async (id) => {
    const {data} = await $authHost.delete(`api/basket/${id}`);
    return data;
}

export const addRating = async (body) => {
    const {data} = await $authHost.post('api/rating', body);
    return data;
}

export const checkRating = async (body) => {
    const {data} = await $authHost.post('api/rating/check-rating', body);
    return data;
}