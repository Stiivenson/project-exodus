import React, { Component} from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { logout } from '../../actions/authAction';
import { findMaps, dropMaps, findDocsGlobal, loadDocData } from '../../actions/searchAction';
import { addRecentMap } from '../../actions/homeAction';
import { loadMapId } from '../../actions/mapAction';


class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state={
            title: '',
            opened: false,

            toggleMapIcon: false,
            searchMapInput: '',

            toggleSearchIcon: false,
            searchDocsInput: '',
            toggleSearchFilter: false,

            toggleUserIcon: false
        }
    }

    
    // Toggle Map icon
    toggleMapIconMenu = () => {        
        this.setState({toggleMapIcon: !this.state.toggleMapIcon});
    }
    handleSearchMapChange = (value) => {
        this.props.findMaps(value); // Send req to Server
        this.setState({ searchMapInput:  value});
    }
    openMapEditor = (id) => {
        if( id !== this.props.mapId) {
            this.props.loadMapId(id);
            this.props.addRecentMap(id);
            this.resetMapIconMenu();
        }        
        this.props.history.push('/map-editor');    
    }
    resetMapIconMenu = () => {
        this.setState({ toggleMapIcon: false, searchMapInput: '' });
        this.props.dropMaps();
    }


    // Toggle Search icon
    toggleSearchIconMenu = () => {        
        this.setState({toggleSearchIcon: !this.state.toggleSearchIcon});
    }
    handleSearchDocChange = (value) => {
        this.props.findDocsGlobal(value); // Send req to Server
        this.setState({ searchDocsInput:  value});
    }
    openTextEditor = (id) => {
        if( id !== this.props.docId) {
            this.props.loadDocData(id);
            this.resetSearchIconMenu();
        }        
        this.props.history.push('/text-editor');    
    }
    resetSearchIconMenu = () => {
        this.setState({ toggleSearchIcon: false, searchDocsInput: '' });
        //this.props.dropMaps();
    }


    // Toggle User icon
    toggleUserIconMenu = () => {
        this.setState({toggleUserIcon: !this.state.toggleUserIcon});
    }
    onSignOut = () => {
        this.props.logout();
    }

    render() {       
        const { match, location, history } = this.props; 
        const searchedMaps = this.props.searchedMaps;
        const searchedDocs = this.props.searchedDocs;
          
        let mapIcon = ["main-navbar__maps-search-window"];
        if (this.state.toggleMapIcon){  
            mapIcon.push('--opened');
        }

        let searchIcon = ["main-navbar__docs-search-window"];
        if (this.state.toggleSearchIcon){  
            searchIcon.push('--opened');
        }
        let searchFilter = ["location-filter"];
        if (this.state.toggleSearchFilter){  
            searchFilter.push('--opened');
        }

        let userIcon = ["main-navbar__user-btns"];
        if (this.state.toggleUserIcon){
            userIcon.push('--opened');
        }

        return(
            <>
            <div className='main-navbar'>

                <div className='main-navbar__buttons --left'>
                    <Link to="/" className='main-navbar__button --main-menu' onClick={() => {  this.resetMapIconMenu(); this.setState({ toggleUserIcon: false }); }}></Link>
                    <div className='main-navbar__button --maps-list' onClick={this.toggleMapIconMenu} />                    
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
                    <div className='main-navbar__button --search' onClick={this.toggleSearchIconMenu} />
                    <div className='main-navbar__button --user' onClick={this.toggleUserIconMenu}></div>
                </div>

                <div className={mapIcon.join(' ')}>
                    <form>
                        <input type='text' placeholder='Введите название карты...' value={this.state.searchMapInput} onChange={(e) => this.handleSearchMapChange(e.target.value)}/>
                    </form>
                    
                    <div className='maps-search-window__maps-list'>
                        {
                            searchedMaps.length > 0 ?
                            searchedMaps.map(({_id, title}) => (
                                 <div key={_id} onClick={() => { this.openMapEditor(_id); }}>{title}</div>
                            )) : null
                        }
                    </div>
                </div>

                <div className={searchIcon.join(' ')}>
                    <form>
                        <input type='text' placeholder='Введите название записи...' value={this.state.searchDocsInput} onChange={(e) => this.handleSearchDocChange(e.target.value)}/>
                        
                        <div className='icon-filter' onClick={() => { this.setState({ toggleSearchFilter: !this.state.toggleSearchFilter }) }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip30)">
                            <path d="M19.2863 0H0.715172C0.320676 0 0.00088501 0.319791 0.00088501 0.714287V4.28564C0.000926862 4.48804 0.0868489 4.68093 0.237307 4.81636L7.14363 11.032V19.2854C7.14347 19.6799 7.46309 19.9998 7.85759 20C7.96854 20 8.07798 19.9743 8.17721 19.9247L12.4629 17.7818C12.705 17.6609 12.858 17.4133 12.8578 17.1426V11.032L19.7642 4.81779C19.915 4.68206 20.001 4.48858 20.0006 4.28564V0.714287C20.0006 0.319791 19.6808 0 19.2863 0ZM18.572 3.96777L11.6657 10.182C11.5149 10.3177 11.4289 10.5112 11.4293 10.7141V16.7011L8.57217 18.1297V10.7141C8.57212 10.5117 8.4862 10.3188 8.33574 10.1834L1.42942 3.96777V1.42853H18.572V3.96777Z" fill="black"/>
                            </g>
                            <defs>
                            <clipPath id="clip30">
                            <rect width="20" height="20" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </div>

                        <div className={searchFilter.join(' ')}>
                            <div className='active'> Глобально </div>
                            <div> Локально </div>
                        </div>
                        
                    </form>
                    
                    <div className='maps-search-window__maps-list'>
                        {
                            searchedDocs.length > 0 ?
                            searchedDocs.map(({_id, title}) => (
                                 <div key={_id} onClick={() => { this.openTextEditor(_id); }}>{title}</div>
                            )) : null
                        }
                    </div>
                </div>

                <div className={userIcon.join(' ')}>
                    <div className='user-btns__button'>Профиль</div>
                    <div className='separator'/>
                    <div className='user-btns__button' onClick={this.onSignOut}>Выйти</div>             
                </div>

            </div>
            </>
        );
    }
}

const mapStateToProps = state => {  
    return {
        mapId: state.map_data.map.id,
        mapTitle: state.map_data.map.title,
        docId: state.text_editor.document.id,
        docTitle: state.text_editor.document.title,

        searchedMaps: state.search.maps,
        searchedDocs: state.search.docs
    }
}

const NavbarWithRouter = withRouter(Navbar);

export default connect(mapStateToProps, { logout, findMaps, dropMaps, loadMapId, addRecentMap, findDocsGlobal, loadDocData })(NavbarWithRouter);