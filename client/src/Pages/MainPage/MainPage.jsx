import React, {useState} from 'react';
import s from './MainPage.module.css';
import {observer} from "mobx-react";
import ModalWindow from "../Components/ModalWindow/ModalWindow";
import TaskBox from "./TaskBox/TaskBox";


const Main = (props) => {

    const [modalActive, setModalActive] = useState(false); //редактировать задачу

    return (<>
        <div className={s.Header}>
            <span className={`${s.Link}`} id={s.toMain}>Главная</span>
            <span className={`${s.Link}`} id={s.toExit} onClick={() => props.state.changeLogged()}>Выйти</span>
        </div>
        <ModalWindow setActive={setModalActive} active={modalActive}>
            <h3>Создание задачи</h3>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupName">Название</label>
                <input type="text" id="inputGroupName" className={`form-control`}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupDesc">Описание</label>
                <input type="text" id="inputGroupName" className={`form-control`}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Приоритет</label>
                <select className="form-select" id="inputGroupSelect01">
                    <option value="high">Высокий</option>
                    <option value="medium">Средний</option>
                    <option value="low">Низкий</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label htmlFor="endDate" className={'input-group-text'}>Выполнить до </label>
                <input type="date" name="endDate" className={`form-control`} id="endDate"/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupStatus">Статус</label>
                <select className="form-select" id="inputGroupStatus">
                    <option value="created">К выполнению</option>
                    <option value="in process">Выполняется</option>
                    <option value="completed">Выполнена</option>
                    <option value="cancelled">Отменена</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupResponsible">Ответственный</label>
                <select className="form-select" id="inputGroupResponsible">
                    {Array(10).fill({id: 1, name: 'Вася пупкин'}).map((el, index) => <option key={index}
                        value={`${el.id}`}>{el.name}</option>)}
                </select>
            </div>
            <button className="btn btn-primary">Готово</button>
        </ModalWindow>
        <div className={s.Content}>
            <div>
                <select className={`form-select mb-3`} id={s.groupSelect} aria-label="Default select example">
                    <option selected>Группировать задачи:</option>
                    <option value="1">По дате завершения</option>
                    <option value="2">По ответственным (для руководителей)</option>
                    <option value="3">Без группировок</option>
                </select>
                <button className="btn btn-primary mb-3" id={s.createTaskButton}
                        onClick={() => setModalActive(true)}>Новая задача
                </button>
            </div>
            <div id={s.Tasks}>
                {Array(50).fill('').map((_, index) => <TaskBox key={index}>Welcome to the International!</TaskBox>)}
            </div>
        </div>
        <div className={s.Footer}>
            <span id={s.FooterSign}>Тестовое задание ESoft. Тунгусов Александр. © Сентябрь 2022</span>
        </div>
    </>);
};

export default observer(Main);