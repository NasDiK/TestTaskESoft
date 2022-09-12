import './App.css';
import AuthPage from "./Pages/AuthPage/AuthPage";
import 'bootstrap/dist/css/bootstrap.css';
import MainPage from "./Pages/MainPage/MainPage";
import mainStore from "./Stores/MainStore";
import {observer} from "mobx-react";

function App() {

  return (
    <>
        {mainStore.logged ? <MainPage state={mainStore}/>:<AuthPage state={mainStore}/>}
    </>
  );
}

export default observer(App);
