import {action, makeObservable, observable} from "mobx";

class MainStore{
    user={}
    logged=false

    constructor() {
        makeObservable(this,{
            logged:observable,
            changeLogged:action,
            logOut:action,
        });


    }

    async changeLogged(data){
        const result = await fetch('http://localhost:3001/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json;charset=utf-8'
            },
            body:JSON.stringify({
                login:data.login,
                password:data.password
            })
        });
        const json = await result.json();
        if(result.ok){
            this.logged=!this.logged;
            this.user.token=json.token;
            this.getSubordinate()

        }
        else {
            alert(json.message);

        }
    }
    logOut(){
        this.logged=!this.logged;
        this.user={};
    }

    async getSubordinate(){
        fetch('http://localhost:3001/auth/getUsers',{
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+ this.user.token,
            }
        })
            .then(x=>x.json())
            .then(x=>this.user.subordinates=x);
    }
}

export default observable(new MainStore());