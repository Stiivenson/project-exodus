import React, { useState }  from 'react';


export const RegisterForm = (props) => {

    const [storeInput, setStoreInput] = useState(
        {
            name: '',
            mail: '',
            password: ''
        }
    );

    const onSwitchForm = () => {
        props.selectAuthForm('login');
    }

    const SubmitForm = () => {
        console.log('s');
        
    }

    return(
        <div className='form-container'>
            <form className='form'>
                <div className='form__body-container'>
                    <div className='form__input-wrapper'>
                        <input className='form__input' type="text" required value={storeInput.name} onChange={(e) => setStoreInput({...storeInput, name: e.target.value})}
                            placeholder=' ' required/>
                        <label>Имя</label>
                    </div>
                    <div className='form__input-wrapper'>
                        <input className='form__input' type="email" required value={storeInput.mail} onChange={(e) => setStoreInput({...storeInput, mail: e.target.value})}
                            placeholder=' ' required/>
                        <label>Почта</label>
                    </div>
                    <div className='form__input-wrapper'>
                        <input className='form__input' type="password" required value={storeInput.password} onChange={(e) => setStoreInput({...storeInput, password: e.target.value})}
                            placeholder=' ' required/>
                        <label>Пароль</label>
                    </div>
                </div>
                <button className='form__button' onSubmit={SubmitForm}>Зарегистрироваться</button>
                <div className='form__info'>
                        Уже есть аккаунт?
                        <span className='form__info-link' onClick={onSwitchForm}>Войти</span>
                </div>
            </form>
        </div>
    );
}