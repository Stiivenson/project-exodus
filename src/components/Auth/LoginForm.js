import React, { useState }  from 'react';


export const LoginForm = (props) => {

    const [storeInput, setStoreInput] = useState(
        {
            email: '',
            password: ''
        }
    );

    const onSwitchForm = () => {
        props.selectAuthForm('register');
    }

    const SubmitForm = (e) => {
        e.preventDefault();
        props.sendLoginForm(storeInput);    
    }

    return(
        <div className='form-container'>
            <form className='form' onSubmit={SubmitForm}>
                <div className='form__body-container'>
                    <div className='form__input-wrapper'>
                        <input className='form__input' type="email" required value={storeInput.email} onChange={(e) => setStoreInput({...storeInput, email: e.target.value})}
                            placeholder=' ' required/>
                        <label>Почта</label>
                    </div>
                    <div className='form__input-wrapper'>
                        <input className='form__input' type="password" required value={storeInput.password} onChange={(e) => setStoreInput({...storeInput, password: e.target.value})}
                            placeholder=' ' required/>
                        <label>Пароль</label>
                    </div>
                </div>
                <button className='form__button'>Вход</button>
                <div className='form__info'>
                        Не зарегистрированы?
                        <span className='form__info-link' onClick={onSwitchForm}>Создать аккаунт</span>
                </div>
            </form>
        </div>
    );
}