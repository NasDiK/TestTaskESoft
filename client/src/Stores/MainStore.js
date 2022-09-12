import {action, makeObservable, observable} from "mobx";

class MainStore{
    user={
        id:'',
        lastname:'',
        firstname:'',
        patronymic:'',
        subordinates:[],
        ownTasks:[],
        subordinatesTasks:[]
    }
    logged=false

    constructor() {
        makeObservable(this,{
            logged:observable,
            changeLogged:action,
            logOut:action,
            getSubordinate:action,
            getSubordinatesTask:action,
            getOwnTasks:action,
        });


    }

    async refreshTasks(){
        await this.getSubordinate();
        await this.getSubordinatesTask();
        await this.getOwnTasks();
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
            this.user.id=json.id;
            this.user.token=json.token;
            this.user.firstname=json.firstname;
            this.user.lastname=json.lastname;
            this.user.patronymic=json.patronymic;
            await this.refreshTasks()
            this.logged=!this.logged;

        }
        else alert(json.message);
    }
    logOut(){
        this.logged=!this.logged;
        this.user={
            id:'',
            lastname:'',
            firstname:'',
            patronymic:'',
            subordinates:[],
            ownTasks:[],
            subordinatesTasks:[]
        };
    }

    async getSubordinate(){
        fetch('http://localhost:3001/auth/getUsers',{
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+ this.user.token,
            }
        })
            .then(x=>x.json())
            .then(x=>this.user.subordinates=x.list);
    }

    async getSubordinatesTask(){
        fetch('http://localhost:3001/auth/getSubordinatesTask',{
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+ this.user.token,
            }
        })
            .then(x=>x.json())
            .then(x=>this.user.subordinatesTasks=x.list);
    }

    async getOwnTasks(){
        fetch('http://localhost:3001/auth/getOwnTasks',{
            method:'GET',
            headers:{
                'Authorization': 'Bearer '+ this.user.token,
            }
        })
            .then(x=>x.json())
            .then(x=>this.user.ownTasks=x.list);
    }

    async updateTask(data){
        return fetch('http://localhost:3001/auth/updateTask',{
            method:'POST',
            headers:{
                'Authorization': 'Bearer '+ this.user.token,
                'Content-Type':'application/json;charset=utf-8'
            },
            body:JSON.stringify(data)
        });
    }

    async createTask(data){
        return fetch('http://localhost:3001/auth/createTask',{
            method:'POST',
            headers:{
                'Authorization': 'Bearer '+ this.user.token,
                'Content-Type':'application/json;charset=utf-8'
            },
            body:JSON.stringify(data)
        });
    }
}

export default observable(new MainStore());