import React from 'react';
import s from './Modal.module.css';

const Modal = (props)=>{
    return(
        <div className={props.active ? `${s.modal} ${s.active}`:`${s.modal}`} onClick={()=>props.setActive(false)}>
            <div className={s.modal__wrapper} onClick={(event)=>event.stopPropagation()}>
                <p className={s.close_button} onClick={()=>props.setActive(false)}>❌</p>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;