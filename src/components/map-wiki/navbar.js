import React, { Component} from 'react';

class Navbar extends Component{
    constructor(props) {
        super(props);

        this.state={
            title: '',
            opened: false
        }

    }

    onNavButtonClick = (e) => {
        console.log(e.target);
        console.log(e.target.classList[1]);
        let cl = e.target.classList[1];
        if(cl){
            this.setState({
                title: cl,
                opened: true
            });  
        }
                  
    }

    render(){
        let boxClass = ["navbar-response-box"];
        if (this.state.opened){
            boxClass.push('opened');
        }

        return(
            <>
            <div className='main-navbar' onClick={this.onNavButtonClick}>
                <div className='main-navbar__buttons --left'>
                    <div className='main-navbar__button --main-menu' ></div>
                    <div className='main-navbar__button --maps-list' ></div>
                </div>
                <div className='main-navbar__buttons --center'>
                    MindProject
                </div>
                <div className='main-navbar__buttons --right'>
                    <div className='main-navbar__button --search'></div>
                    <div className='main-navbar__button --folder' ></div>
                    <div className='main-navbar__button --question'></div>
                </div>

            </div>
            <div className={boxClass.join(' ')}>
                <h3>{this.state.title}</h3>
            </div>
            </>
        );
    }
}

export default Navbar;