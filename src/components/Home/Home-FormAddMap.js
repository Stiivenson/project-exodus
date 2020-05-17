import React, { useState } from 'react';


export const Home_FormAddMap = (props) => {

    const [storeInput, setStoreInput] = useState('');

    const saveForm = (e) => {
        e.preventDefault();

        props.createNewMap(storeInput);
        setStoreInput('');
        closeFormAddMap();
    }

    const closeFormAddMap = () => {
        props.closeFormAddMap();
    }

    let class_FormAddMap = ["modal-container"];
    if (props.showFormAddMap){
        class_FormAddMap.push('--show');
    }

    return(
        <div className={class_FormAddMap.join(' ')}>
          <form className='form' onSubmit={saveForm}>

            <div className='form__label-container'>
              <div className='form__label'>Create Map</div>
            </div>

            <div className='form__body-container'>
              <div className='form__input-wrapper'>
                <input className='form__input' type="text" value={storeInput} onChange={(e) => setStoreInput(e.target.value)}
                       placeholder=' ' required/>
                <label>Label</label>
              </div>
            </div>

            <div className='form__buttons-container'>
              <button className='form__button' type='submit'>Save</button>
              <button className='form__button' type='reset' onClick={closeFormAddMap}>Cancel</button>
            </div>
          </form>
        </div>
    );
}