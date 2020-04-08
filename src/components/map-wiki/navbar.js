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
        this.setState({
            title: cl,
            opened: true
        });            
    }

    render(){
        let boxClass = ["navbar-response-box"];
        if (this.state.opened){
            boxClass.push('opened');
        }

        return(
            <>
            <div className='main-navbar'>
                <div className='main-navbar__buttons --left'>
                    <div className='main-navbar__button --main-menu' onClick={this.onNavButtonClick}></div>
                    <div className='main-navbar__button --maps-list' onClick={this.onNavButtonClick}></div>
                </div>
                <div className='main-navbar__buttons --center'>
                    MindProject
                </div>
                <div className='main-navbar__buttons --right'>
                    <div className='main-navbar__button --search' onClick={this.onNavButtonClick}></div>
                    <div className='main-navbar__button --folder' onClick={this.onNavButtonClick}></div>
                    <div className='main-navbar__button --question' onClick={this.onNavButtonClick}></div>
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