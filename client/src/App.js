import logo from './logo.svg';
import './App.css';
import AuthPage from "./Pages/AuthPage/AuthPage";
import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";
import MainPage from "./Pages/MainPage/MainPage";
import mainStore from "./Stores/MainStore";
import {observer} from "mobx-react";

function App() {

    // const [isLogged,setLogged] = useState(true);

  return (
    <>
        {mainStore.logged ? <MainPage state={mainStore}/>:<AuthPage state={mainStore}/>}
    </>
  );
}

export default observer(App);
