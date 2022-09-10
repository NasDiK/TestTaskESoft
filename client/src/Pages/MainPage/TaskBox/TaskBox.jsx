import React from 'react';
import s from './TaskBox.module.css';

const getPriority = (priority) => {
    switch (priority) {
        case 'high':
            return 'Высокий';
        case 'medium':
            return 'Средний';
        case 'low':
            return 'Низкий';
        default:
            return 'undefined';
    }
}

const getStatus = (status)=>{
    switch (status) {
        case 'created':
            return 'К выполнению';
        case 'in process':
            return 'Выполняется';
        case 'completed':
            return 'Выполнена';
        case 'cancelled':
            return 'Отменена';
        default:
            return 'undefined';
    }
}

const Task = (props) => {
    return (
        <div className={s.wrapper} onClick={(event)=>{
            props.changeTaskAttributes(props.Task);
        }}>
            <p
                className={s.caption}
                style={{'color':props.Task.status === 'completed' ? 'green': new Date(props.Task.endDate).getTime()<=new Date().getTime() ? 'red':'gray'}}
            >{props.Task.caption}</p>
            <p className={s.priority}>Приоритет: {getPriority(props.Task.priority)}</p>
            <p className={s.status}>Статус: {getStatus(props.Task.status)}</p>
            <p className={s.responsible}>Ответственный: {props.Task.responsible}</p>
            <p className={s.endDate}>Срок: до {props.Task.endDate}</p>
        </div>
    )
};

export default Task;