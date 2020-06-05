import React, { useState }  from 'react';


export const RegisterForm = (props) => {

    const [storeInput, setStoreInput] = useState(
        {
            name: '',
            email: '',
            password: ''
        }
    );

    const onSwitchForm = () => {
        props.selectAuthForm('login');
    }

    const SubmitForm = (e) => {
        e.preventDefault();
        props.sendRegisterForm(storeInput);        
    }

    return(
        <div className='form-container'>
            <form className='form' onSubmit={SubmitForm}>
                <div className='form__body-container'>
                    <div className='form__input-wrapper'>
                        <input className='form__input' type="text" required value={storeInput.name} onChange={(e) => setStoreInput({...storeInput, name: e.target.value})}
                            placeholder=' ' required/>
                        <label>Имя</label>
                    </div>
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
                <button className='form__button'>Зарегистрироваться</button>
                <div className='form__info'>
                        Уже есть аккаунт?
                        <span className='form__info-link' onClick={onSwitchForm}>Войти</span>
                </div>
            </form>
        </div>
    );
}