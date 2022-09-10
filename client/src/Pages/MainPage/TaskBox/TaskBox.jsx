import React from 'react';
import s from './TaskBox.module.css';

const Task = (props)=>{
    return(
        <div className={s.wrapper}>
            <p className={s.caption}>Заголовок</p>
            <p className={s.priority}>Приоритет</p>
            <p className={s.responsible}><b>Ответственный:</b> NasDiK</p>
            <p className={s.status}>Статус: Ok</p>
            <p className={s.endDate}>до 25.09.2022</p>
        </div>
    )
};

export default Task;