import React, {useEffect, useRef, useState} from 'react';
import s from './MainPage.module.css';
import {observer} from "mobx-react";
import ModalWindow from "../Components/ModalWindow/ModalWindow";
import TaskBox from "./TaskBox/TaskBox";


const Main = (props) => {

    const [modalActive, setModalActive] = useState(false); //редактировать задачу
    const [tasks, setTasks] = useState(() => [<h2>Выберите группировку</h2>]);

    const captionRef = useRef('');
    const descriptionRef = useRef('');
    const priorityRef = useRef('');
    const endDateRef = useRef('');
    const statusRef = useRef('');
    const responsibleRef = useRef('');
    const checkType = useRef('');

    const [disabledInputs, setDisabledInputs] = useState(() => {
        return {
            caption: false,
            description: false,
            priority: false,
            endDate: false,
            responsible: false,
        }
    })

    const changeTaskAttributes = function (task) {
        const date = new Date(task.endDate);

        captionRef.current.value = task.caption;
        descriptionRef.current.value = task.description;
        priorityRef.current.value = task.priority;
        endDateRef.current.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        statusRef.current.value = task.status;
        responsibleRef.current.value = task.responsible;
        checkType.current = 'change|' + task.id;

        if (responsibleRef.current.value == props.state.user.id) {
            setDisabledInputs({
                caption: true,
                description: true,
                priority: true,
                endDate: true,
                responsible: true,
            });
        } else {
            setDisabledInputs({
                caption: false,
                description: false,
                priority: false,
                endDate: false,
                responsible: false,
            });
        }
        setModalActive(true);
    }

    const getsortedTask = (value) => {
        const result = [];
        switch (value) {
            case 'byEndDate': {
                const groupOwnTasks = new Array(4); //|today|tomorrow|future|other
                const todayDate = new Date().toLocaleDateString();
                let tomorrowDate = new Date();
                tomorrowDate.setDate(tomorrowDate.getDate() + 1);
                tomorrowDate = tomorrowDate.toLocaleString();
                let nextWeekDate = new Date();
                nextWeekDate.setDate(nextWeekDate.getDate() + 7);

                groupOwnTasks[0] = props.state.user.ownTasks.filter((tsk) => {
                    const taskDate = new Date(tsk.endDate).toLocaleDateString();
                    return taskDate === todayDate;
                });
                groupOwnTasks[1] = props.state.user.ownTasks.filter((tsk) => {
                    const taskDate = new Date(tsk.endDate).toLocaleDateString();

                    return taskDate === tomorrowDate;
                });
                groupOwnTasks[2] = props.state.user.ownTasks.filter((tsk) => {
                    const taskDate = new Date(tsk.endDate);
                    return taskDate.getTime() > nextWeekDate.getTime();
                });
                groupOwnTasks[3] = props.state.user.ownTasks.filter((tsk) =>
                    !groupOwnTasks[0].includes(tsk) && !groupOwnTasks[1].includes(tsk) && !groupOwnTasks[2].includes(tsk));

                const groupSubordinatesTasks = Array(4); //|today|tomorrow|future|other
                groupSubordinatesTasks[0] = props.state.user.subordinatesTasks.filter((tsk) => {
                    const taskDate = new Date(tsk.endDate).toLocaleDateString();
                    return taskDate === todayDate;
                });
                groupSubordinatesTasks[1] = props.state.user.subordinatesTasks.filter((tsk) => {
                    const taskDate = new Date(tsk.endDate).toLocaleDateString();
                    return taskDate === tomorrowDate;
                });
                groupSubordinatesTasks[2] = props.state.user.subordinatesTasks.filter((tsk) => {
                    const taskDate = new Date(tsk.endDate);
                    return taskDate.getTime() > nextWeekDate.getTime();
                });
                groupSubordinatesTasks[3] = props.state.user.subordinatesTasks.filter((tsk) =>
                    !groupSubordinatesTasks[0].includes(tsk) && !groupSubordinatesTasks[1].includes(tsk) && !groupSubordinatesTasks[2].includes(tsk));
                result.push(<h3>Мои собственные задачи:</h3>);
                result.push(props.state.user.ownTasks.length === 0 ? <p>Нет доступных задач</p> :
                    <>
                        {groupOwnTasks[0].length === 0 ? null : <>
                            <h4>Сегодня</h4>
                            <div className={s.Tasks}>
                                {groupOwnTasks[0].map((el, index) => <TaskBox key={index} Task={{
                                    ...el,
                                    responsible: props.state.user.id,
                                    firstname: props.state.user.firstname,
                                    lastname: props.state.user.lastname,
                                    patronymic: props.state.user.patronymic,
                                }} changeTaskAttributes={changeTaskAttributes}/>)}
                            </div>
                        </>}
                        {groupOwnTasks[1].length === 0 ? null : <>
                           <h4>Завтра</h4>
                            <div className={s.Tasks}>
                                {groupOwnTasks[1].map((el, index) => <TaskBox key={index} Task={{
                                    ...el,
                                    responsible: props.state.user.id,
                                    firstname: props.state.user.firstname,
                                    lastname: props.state.user.lastname,
                                    patronymic: props.state.user.patronymic,
                                }} changeTaskAttributes={changeTaskAttributes}/>)}
                            </div>
                        </>}
                        {groupOwnTasks[2].length === 0 ? null : <>
                            <h4>Больше чем через неделю</h4>
                            <div className={s.Tasks}>
                                {groupOwnTasks[2].map((el, index) => <TaskBox key={index} Task={{
                                    ...el,
                                    responsible: props.state.user.id,
                                    firstname: props.state.user.firstname,
                                    lastname: props.state.user.lastname,
                                    patronymic: props.state.user.patronymic,
                                }} changeTaskAttributes={changeTaskAttributes}/>)}
                            </div>
                        </>}
                        {groupOwnTasks[3].length === 0 ? null : <>
                            <h4>Остальные</h4>
                            <div className={s.Tasks}>
                                {groupOwnTasks[3].map((el, index) => <TaskBox key={index} Task={{
                                    ...el,
                                    responsible: props.state.user.id,
                                    firstname: props.state.user.firstname,
                                    lastname: props.state.user.lastname,
                                    patronymic: props.state.user.patronymic,
                                }} changeTaskAttributes={changeTaskAttributes}/>)}
                            </div>
                        </>}
                    </>
                )
                result.push(props.state.user.subordinates.length === 0 ? null : <div>
                    <hr/>
                    <h2>Задачи подчиненных: </h2>
                    {props.state.user.subordinatesTasks.length === 0 ?
                        <h2>Нет задач</h2> :
                        <>
                            {groupSubordinatesTasks[0].length === 0 ? null : <>
                                <h4>Сегодня</h4>
                                <div className={s.Tasks}>
                                    {groupSubordinatesTasks[0].map((el, index) => <TaskBox key={index} Task={el}
                                                                                  changeTaskAttributes={changeTaskAttributes}/>)}
                                </div>
                            </>}
                            {groupSubordinatesTasks[1].length === 0 ? null : <>
                                <h4>Завтра</h4>
                                <div className={s.Tasks}>
                                    {groupSubordinatesTasks[1].map((el, index) => <TaskBox key={index} Task={el}
                                                                                  changeTaskAttributes={changeTaskAttributes}/>)}
                                </div>
                            </>}
                            {groupSubordinatesTasks[2].length === 0 ? null : <>
                                <h4>Больше чем через неделю</h4>
                                <div className={s.Tasks}>
                                    {groupSubordinatesTasks[2].map((el, index) => <TaskBox key={index} Task={el}
                                                                                  changeTaskAttributes={changeTaskAttributes}/>)}
                                </div>
                            </>}
                            {groupSubordinatesTasks[3].length === 0 ? null : <>
                                <h4>Остальные</h4>
                                <div className={s.Tasks}>
                                    {groupSubordinatesTasks[3].map((el, index) => <TaskBox key={index} Task={el}
                                                                                  changeTaskAttributes={changeTaskAttributes}/>)}
                                </div>
                            </>}
                        </>}

                </div>)
                break;
            }
            case 'byResponsible':
                const subbordinatesArray = [];
                props.state.user.subordinates.forEach((sub)=>{
                    subbordinatesArray.push({
                        ...sub,
                        tasks:props.state.user.subordinatesTasks.filter((tsk)=>tsk.responsible==sub.id)
                    });
                })
                result.push(props.state.user.subordinates.length === 0 ? <h4>У вас нет подчиненных</h4> : <div>
                    <h4>Задачи подчиненных: </h4>
                    {subbordinatesArray.length === 0 ?
                        <h2>Нет задач</h2> :<>
                            {subbordinatesArray.filter(sub=>sub.tasks.length!==0).map((sub,index)=><>
                                <p>{sub.lastname + ' ' + sub.firstname + ' ' + sub.patronymic}</p>
                                <div className={s.Tasks}>
                                    {sub.tasks.map((el, index) =>
                                        <TaskBox key={index} Task={el} changeTaskAttributes={changeTaskAttributes}/>)}
                                </div>
                            </>)}
                        </>}
                </div>)
                break;
            case 'byLastRefresh':
                result.push(<h4>Мои собственные задачи:</h4>);
                result.push(props.state.user.ownTasks.length === 0 ? <p>Нет доступных задач</p> :
                    <div className={s.Tasks}>
                        {props.state.user.ownTasks.sort((a,b)=>{
                            const refreshDateA = new Date(a.refreshedAt);
                            const refreshDateB = new Date(b.refreshedAt);
                            return refreshDateA.getTime()<=refreshDateB.getTime() ? 1:-1;
                        }).map((el, index) =>
                            <TaskBox key={index} Task={{
                                ...el,
                                responsible: props.state.user.id,
                                firstname: props.state.user.firstname,
                                lastname: props.state.user.lastname,
                                patronymic: props.state.user.patronymic,
                            }} changeTaskAttributes={changeTaskAttributes}/>)}
                    </div>)
                result.push(props.state.user.subordinates.length === 0 ? null : <div>
                    <h4>Задачи подчиненных: </h4>
                    {props.state.user.subordinatesTasks.length === 0 ?
                        <h2>Нет задач</h2> :
                        <div className={s.Tasks}>
                            {props.state.user.subordinatesTasks.sort((a,b)=>{
                                const refreshDateA = new Date(a.refreshedAt);
                                const refreshDateB = new Date(b.refreshedAt);
                                return refreshDateA.getTime()<=refreshDateB.getTime() ? 1:-1;
                            }).map((el, index) =>
                                <TaskBox key={index} Task={el} changeTaskAttributes={changeTaskAttributes}/>)}

                        </div>}
                </div>)
                break;
            default:
                result.push(<h3>Выберите группировку</h3>)

                break;

        }
        return result;
    }

    useEffect(() => {
        //Todo можно убрать
    }, []);

    return (<>
        <div className={s.Header}>
            {/*<span className={`${s.Link}`} id={s.toMain}>Главная</span> /!*А надо ли?*!/*/}
            <span className={s.Title}
                  id={s.toMain}>{`${props.state.user.lastname} ${props.state.user.firstname} ${props.state.user.patronymic}`}</span>
            <span className={`${s.Link}`} id={s.toExit} onClick={() => props.state.logOut()}>Выйти</span>
        </div>
        {/*------------------------------------------------------------------------------------------------*/}
        <ModalWindow setActive={setModalActive} active={modalActive}>
            {checkType.current === 'create|-1' ? <h3>Создание задачи</h3> : <h3>Изменение задачи</h3>}
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupName">Название</label>
                <input type="text" id="inputGroupName" ref={captionRef} disabled={disabledInputs.caption}
                       className={`form-control`}/>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupDesc">Описание</label>
                <textarea id="inputGroupName" disabled={disabledInputs.description} ref={descriptionRef}
                          className={`form-control`}></textarea>
            </div>
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Приоритет</label>
                <select className="form-select" disabled={disabledInputs.priority} ref={priorityRef}
                        id="inputGroupSelect01">
                    <option value="high">Высокий</option>
                    <option value="medium">Средний</option>
                    <option value="low">Низкий</option>
                </select>
            </div>
            <div className="input-group mb-3">
                <label htmlFor="endDate" className={'input-group-text'}>Выполнить до </label>
                <input type="text" name="endDate" disabled={disabledInputs.endDate} ref={endDateRef}
                       className={`form-control`} id="endDate"/>
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
                <select className="form-select" disabled={disabledInputs.responsible} ref={responsibleRef}
                        id="inputGroupResponsible">
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
                switch (taskType[0]) {
                    case 'change': {
                        const result = await props.state.updateTask({
                            id: Number(taskType[1]),
                            caption: captionRef.current.value,
                            description: descriptionRef.current.value,
                            priority: priorityRef.current.value,
                            endDate: endDateRef.current.value,
                            status: statusRef.current.value,
                            responsible: Number(responsibleRef.current.value)
                        });

                        if (result.ok) await props.state.refreshTasks();
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
                        if (result.ok) await props.state.refreshTasks();
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
                <select defaultValue={'-1'} className={`form-select mb-3`} id={s.groupSelect}
                        aria-label="Default select example"
                        onChange={async (event) => {
                            await props.state.refreshTasks();
                            setTasks(getsortedTask(event.target.value));
                        }}>
                    <option disabled={true} value="-1">Группировать задачи:</option>
                    <option value="byEndDate">По дате завершения</option>
                    <option value="byResponsible">По ответственным</option>
                    <option value="byLastRefresh">Без группировок</option>
                </select>
                <button className="btn btn-primary mb-3" id={s.createTaskButton}
                        onClick={() => {
                            if (props.state.user.subordinates.length === 0) {
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
                            setDisabledInputs({
                                caption: false,
                                description: false,
                                priority: false,
                                endDate: false,
                                responsible: false,
                            });
                            setModalActive(true)
                        }}>Новая задача
                </button>
            </div>
            {/*--------------------------------------------------------------------------------------------------*/}
            <div>
                {tasks}
            </div>

        </div>
        {/*--------------------------------------------------------------------------------------------------------*/}
        <div className={s.Footer}>
            <span id={s.FooterSign}>Тестовое задание ESoft. Тунгусов Александр. © Сентябрь 2022</span>
        </div>
    </>);
};

export default observer(Main);