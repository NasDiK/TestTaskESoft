import React from 'react';
import s from './AuthPage.module.css';

const Auth = (props) => {

    return (<div className={s.Content}>
        <div className={s.AuthWrapper}>
            <div className={s.AuthHeader}>
                <h2 className={'h2'}> Авторизация</h2>
            </div>
            <div className={s.InputContainer}>
                <input type="text" name="inputLogin" id="inputLogin" placeholder={'Введите логин...'}
                       className={'form-control mb-3'}/>
                <input type="password" name="inputPassword" id="inputPassword" placeholder={'Введите пароль...'}
                       className={'form-control mb-3'}/>
                <button className="btn btn-primary mb-3" onClick={()=>props.state.changeLogged()}>Войти</button>
            </div>
        </div>
    </div>)
}

export default Auth;