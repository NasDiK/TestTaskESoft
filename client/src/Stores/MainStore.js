import {action, makeObservable, observable} from "mobx";

class MainStore{
    logged=false

    constructor() {
        makeObservable(this,{
            logged:observable,
            changeLogged:action
        });


    }

    changeLogged(){
        this.logged=!this.logged;
    }
}

export default observable(new MainStore());