import React, {useRef} from 'react';
import s from './AuthPage.module.css';

const Auth = (props) => {

    const loginRef = useRef('');
    const passwordRef = useRef('');

    return (<div className={s.Content}>
        <div className={s.AuthWrapper}>
            <div className={s.AuthHeader}>
                <h2 className={'h2'}> Авторизация</h2>
            </div>
            <div className={s.InputContainer}>
                <input type="text" name="inputLogin" id="inputLogin" ref={loginRef} placeholder={'Введите логин...'}
                       className={'form-control mb-3'}/>
                <input type="password" name="inputPassword" id="inputPassword" ref={passwordRef} placeholder={'Введите пароль...'}
                       className={'form-control mb-3'}/>
                <button className="btn btn-primary mb-3" onClick={()=>props.state.changeLogged({login:loginRef.current.value,password:passwordRef.current.value})}>Войти</button>
            </div>
        </div>
    </div>)
}

export default Auth;