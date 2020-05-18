import React from 'react';


export const LoginForm = (props) => {

    // const [storeInput, setStoreInput] = useState(
    //     {
    //         mail: '',
    //         password: ''
    //     }
    // );

    const saveForm = (e) => {
        e.preventDefault();

        props.createNewMap(storeInput);
        setStoreInput('');
        closeFormAddMap();
    }

    return(
        <div>
            Log in
        </div>
        // <div className='auth-form-container'>
        //     <div className='auth-form'>
        //         <div className='auth-form__body-container'>
        //             <div className='auth-form__input-wrapper'>
        //                 <input className='auth-form__input' type="text" value={storeInput.mail} onChange={(e) => setStoreInput(e.target.value)}
        //                     placeholder='' required/>
        //                 <label>Mail</label>
        //             </div>
        //             <div className='auth-form__input-wrapper'>
        //                 <input className='auth-form__input' type="text" value={storeInput.password} onChange={(e) => setStoreInput(e.target.value)}
        //                     placeholder='' required/>
        //                 <label>Password</label>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}