import React, {useEffect, useRef, useState} from 'react';
import s from './MainPage.module.css';
import {observer} from "mobx-react";
import ModalWindow from "../Components/ModalWindow/ModalWindow";
import TaskBox from "./TaskBox/TaskBox";


const Main = (props) => {

    const [modalActive, setModalActive] = useState(false); //редактировать задачу
    const [tasks, setTasks] = useState([]);

    const captionRef = useRef('');
    const descriptionRef = useRef('');
    const priorityRef = useRef('');
    const endDateRef = useRef('');
    const statusRef = useRef('');
    const responsibleRef = useRef('');
    const checkType = useRef('');

    const changeTaskAttributes = function (task) {
        const date = new Date(task.endDate);

        captionRef.current.value = task.caption;
        descriptionRef.current.value = task.description;
        priorityRef.current.value = task.priority;
        endDateRef.current.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        statusRef.current.value = task.status;
        responsibleRef.current.value = task.responsible;
        checkType.current = 'change|' + task.id;
        setModalActive(true);
    }

    useEffect(() => {
        console.log(props.state.user);
    }, []);

    return (<>
        <div className={s.Header}>
            <span className={`${s.Link}`} id={s.toMain}>Главная</span>
            <span className={`${s.Link}`} id={s.toExit} onClick={() => props.state.logOut()}>Выйти</span>
        </div>
        <ModalWindow setActive={setModalActive} active={modalActive}>
            {checkType.current === 'create|-1' ? <h3>Создание задачи</h3> : <h3>Изменение задачи</h3>}
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupName">Название</label>
                <input type="text" id="inputGroupName" ref={captionRef} className={`form-control`}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupDesc">Описание</label>
                <textarea id="inputGroupName" ref={descriptionRef} className={`form-control`}></textarea>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Приоритет</label>
                <select className="form-select" ref={priorityRef} id="inputGroupSelect01">
                    <option value="high">Высокий</option>
                    <option value="medium">Средний</option>
                    <option value="low">Низкий</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label htmlFor="endDate" className={'input-group-text'}>Выполнить до </label>
                <input type="text" name="endDate" ref={endDateRef} className={`form-control`} id="endDate"/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupStatus">Статус</label>
                <select className="form-select" ref={statusRef} id="inputGroupStatus">
                    <option value="created">К выполнению</option>
                    <option value="in process">Выполняется</option>
                    <option value="completed">Выполнена</option>
                    <option value="cancelled">Отменена</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupResponsible">Ответственный</label>
                <select className="form-select" ref={responsibleRef} id="inputGroupResponsible">
                    {props.state.user.subordinates.map((sub, index) =>
                        <option key={index}
                                value={sub.id}>{`${sub.lastname} ${sub.firstname} ${sub.patronymic}`}</option>)}
                    {<option value={props.state.user.id}
                             disabled={true}>
                        {`${props.state.user.lastname} ${props.state.user.firstname} ${props.state.user.patronymic}`}
                    </option>}
                </select>
            </div>
            <button className="btn btn-primary" onClick={async () => {
                const taskType = checkType.current.split('|');
                console.log(taskType);
                switch(taskType[0]){
                    case 'change':
                    {
                        const result = await props.state.updateTask({
                            id: Number(taskType[1]),
                            caption: captionRef.current.value,
                            description: descriptionRef.current.value,
                            priority: priorityRef.current.value,
                            endDate: endDateRef.current.value,
                            status: statusRef.current.value,
                            responsible: Number(responsibleRef.current.value)
                        });

                        if(result.ok) await props.state.refreshTasks();
                        alert(result.status);
                        break;
                    }
                    case 'create': {
                        const result = await props.state.createTask({
                            caption: captionRef.current.value,
                            description: descriptionRef.current.value,
                            priority: priorityRef.current.value,
                            endDate: endDateRef.current.value,
                            status: statusRef.current.value,
                            responsible: Number(responsibleRef.current.value)
                        });
                        if(result.ok) await props.state.refreshTasks();
                        alert(result.status);
                        alert('создаю')
                        break;
                    }
                }
                setModalActive(false);
            }}>Готово
            </button>
        </ModalWindow>
        <div className={s.Content}>
            <div>
                <select defaultValue={'-1'} className={`form-select mb-3`} id={s.groupSelect} aria-label="Default select example"
                        onChange={async () => {
                            await props.state.refreshTasks();
                            setTasks([]);
                        }}>
                    <option disabled={true} value="-1">Группировать задачи:</option>
                    <option value="1">По дате завершения</option>
                    <option value="2">По ответственным (для руководителей)</option>
                    <option value="3">Без группировок</option>
                </select>
                <button className="btn btn-primary mb-3" id={s.createTaskButton}
                        onClick={() => {
                            if(props.state.user.subordinates.length===0) {
                                alert('У вас нет подчиненных => вы не руководитель:)');
                                return;
                            }

                            captionRef.current.value = '';
                            descriptionRef.current.value = '';
                            priorityRef.current.value = '';
                            endDateRef.current.value = '';
                            statusRef.current.value = '';
                            responsibleRef.current.value = '';
                            checkType.current = 'create|-1';

                            setModalActive(true)
                        }}>Новая задача
                </button>
            </div>
            {/*--------------------------------------------------------------------------------------------------*/}
            <div>
                <h1>Мои собственные задачи:</h1>
                {props.state.user.ownTasks.length === 0 ? <h2>Нет доступных задач</h2> : <div className={s.Tasks}>
                    {props.state.user.ownTasks.map((el, index) =>
                        <TaskBox key={index} Task={{
                            ...el,
                            responsible: props.state.user.id,
                            firstname: props.state.user.firstname,
                            lastname: props.state.user.lastname,
                            patronymic: props.state.user.patronymic,
                        }} changeTaskAttributes={changeTaskAttributes}/>)}
                </div>}
            </div>
            {props.state.user.subordinates.length === 0 ? null : <div>
                <h1>Задачи подчиненных: </h1>
                {props.state.user.subordinatesTasks.length === 0 ?
                    <h2>Нет задач</h2> :
                    <div className={s.Tasks}>
                        {props.state.user.subordinatesTasks.map((el, index) =>
                            <TaskBox key={index} Task={el} changeTaskAttributes={changeTaskAttributes}/>)}

                    </div>}
            </div>}
        </div>
        {/*--------------------------------------------------------------------------------------------------------*/}
        <div className={s.Footer}>
            <span id={s.FooterSign}>Тестовое задание ESoft. Тунгусов Александр. © Сентябрь 2022</span>
        </div>
    </>);
};

export default observer(Main);