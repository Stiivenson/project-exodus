import React, { Component} from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from '../actions/authAction';

class Navbar extends Component{
    constructor(props) {
        super(props);

        this.state={
            title: '',
            opened: false,

            toggleUserIcon: false
        }
    }

    onSignOut = () => {
        this.props.logout();
    }

    toggleUserIconMenu = () => {
        this.setState({toggleUserIcon: !this.state.toggleUserIcon});
    }

    onNavButtonClick = (e) => {
        // let cl = e.target.classList[1];
        // if(cl && cl !== "--main-menu"){
        //     this.setState({
        //         title: cl,
        //         opened: true
        //     });  
        // }                  
    }

    render(){
        let boxClass = ["navbar-response-box"];
        if (this.state.opened){
            boxClass.push('opened');
        }

        let userIconMenu = ["main-navbar__user-btns"];
        if (this.state.toggleUserIcon){
            userIconMenu.push('--opened');
        }

        return(
            <>
            <div className='main-navbar' onClick={this.onNavButtonClick}>
                <div className='main-navbar__buttons --left'>
                    <Link to="/" className='main-navbar__button --main-menu' ></Link>
                    <div className='main-navbar__button --maps-list' ></div>
                </div>
                <div className='main-navbar__breadcrums'>
                    { this.props.mapTitle === '' ? null : 
                        <Link to='/map-editor'>
                            {this.props.mapTitle}
                        </Link>                        
                    }
                    {
                        (this.props.mapTitle == '' || this.props.docTitle == '') ? null :
                        <div className='breadcrums-separator'> / </div>
                    }
                    {
                        this.props.docTitle === '' ? null : 
                        <Link to='/text-editor'>
                            {this.props.docTitle}
                        </Link>
                    }
                </div>
                <div className='main-navbar__buttons --right'>
                    {/* <div className='main-navbar__button --search'></div>
                    <div className='main-navbar__button --folder' ></div>
                    <div className='main-navbar__button --question'></div> */}
                    <div className='main-navbar__button --user' onClick={this.toggleUserIconMenu}></div>
                </div>
                <div className={userIconMenu.join(' ')}>
                    <div className='user-btns__button'>Профиль</div>
                    <div className='separator'/>
                    <div className='user-btns__button' onClick={this.onSignOut}>Выйти</div>             
                </div>
            </div>
            <div className={boxClass.join(' ')}>
                <h3>{this.state.title}</h3>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {  
    return {
      mapTitle: state.map_data.map.title,
      docTitle: state.text_editor.document.title
    }
}

export default connect(mapStateToProps, {logout})(Navbar);