
import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._developers = []
        this._licenses = []
        this._applications = []
        this._selectedType = {}
        this._selectedDeveloper = {}
        this._selectedLicense = {}
        this._selectedApplication = {}
        this._selectedVersion = {}
        this._selectedDate = {}
        this._OC = []
        this._versions = []
        this._date = []
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }
    setVersion(version){
        this._versions = version
    }
    setDate(date){
        this._date = date
    }

    setDevelopers(developers){
        this._developers = developers
    }
    setLicenses(licenses){
        this._licenses = licenses
    }
    setApplications(applications){
        this._applications = applications
    }

    setSelectedType(selectedType) {
        this.setPage(1)
        this._selectedType = selectedType
    }
    setSelectedVersion(selectedVersion) {
        this.setPage(1)
        this._selectedVersion = selectedVersion
    }
    setSelectedDate(selectedDate) {
        this.setPage(1)
        this._selectedDate = selectedDate
    }
    setSelectedApplication(selectedApplication) {
        this._selectedApplication = selectedApplication
    }
    setSelectedDeveloper(selectedDeveloper) {
        this.setPage(1)
        this._selectedDeveloper = selectedDeveloper
    }
    setSelectedLicense(selectedLicense) {
        this._selectedLicense = selectedLicense
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }
    get types(){
        return this._types
    }

    get developers(){
        return this._developers
    }
    get licenses(){
        return this._licenses
    }
    get versions(){
        return this._versions
    }
    get dates(){
        return this._date
    }
    get applications(){
        return this._applications
    }

    get selectedType(){
        return this._selectedType
    }
    get selectedApplication(){
        return this._selectedApplication
    }
    get selectedDate(){
        return this._selectedDate
    }
    get selectedVersion(){
        return this._selectedVersion
    }
    get selectedDeveloper(){
        return this._selectedDeveloper
    }
    get selectedLicense(){
        return this._selectedLicense
    }

    get totalCount(){
        return this._totalCount
    }
    get page(){
        return this._page
    }
    get limit(){
        return this._limit
    }
}