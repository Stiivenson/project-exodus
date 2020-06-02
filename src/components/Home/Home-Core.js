import React, { Component} from 'react';

import {Home_Menu} from './Home-Menu';
import {Home_MapsList} from './Home-MapsList';
import {Home_MapsListRecent} from './Home-MapsListRecent';
import {Home_MapsListTrash} from './Home-MapsListTrash';
import {Home_FormAddMap} from './Home-FormAddMap';

import { connect } from 'react-redux';
import { loadUser } from "../../actions/authAction";
import { createMap, deleteMap, updateRecentMap, loadTrashMaps, putToTrash } from '../../actions/homeAction';
import { loadMapId } from '../../actions/mapAction';


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            showFormAddMap: false,
    
            selectedMenuSection: 'maps'
        }  
    }  
   
    componentDidMount() {
        if(!this.props.dataLoaded){
            this.props.loadUser();
        }        
    }
    

    // Select Menu section
    selectMenuSection = (menu) => {
        this.setState({ selectedMenuSection: menu });        
    }

    // Open & close Form to create new Map
    openFormAddMap = () => {
        this.setState({ showFormAddMap: true });
    }   
    closeFormAddMap = () => {
        this.setState({ showFormAddMap: false });
    } 


    // Create new Map
    createNewMap = (title) => {
        this.props.createMap(this.props.user.id, title);
    }

    loadTrashMaps = () => {
        this.props.loadTrashMaps();
    }

    // Delete Map
    putToTrash = (id) => {
        this.props.putToTrash(id);
    }

    deleteMap = (id) => {
        this.props.deleteMap(id);
    }

    getMapId = (id) => {
        this.props.loadMapId(id)
        this.props.updateRecentMap(id);
    }

    render() {
        return (
            <div className='home-container'>
                <Home_FormAddMap 

                    showFormAddMap={this.state.showFormAddMap}
                    closeFormAddMap={this.closeFormAddMap}
                    
                    createNewMap={this.createNewMap}/>

                <Home_Menu 
                    selectMenuSection={this.selectMenuSection} 
                    loadTrashMaps={this.loadTrashMaps}
                />

                {(() => {
                    switch (this.state.selectedMenuSection) {
                        case 'maps':
                            return <Home_MapsList
                                
                                history={this.props.history}
                                PublicMaps={this.props.publicMaps}
                                PrivateMaps={this.props.privateMaps}

                                openFormAddMap={this.openFormAddMap}
                                putToTrash={this.putToTrash}
                                getMapId={this.getMapId}  />;

                        case 'recent':
                            return <Home_MapsListRecent 
                                history={this.props.history}
                                RecentMaps={this.props.recentMaps}

                                getMapId={this.getMapId} />;

                        case 'trash':
                            return <Home_MapsListTrash 
                                TrashMaps={this.props.trashMaps}
                                deleteMap={this.deleteMap}
                                />;

                    default:
                        return null;
                    }
                })()}
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    dataLoaded: state.auth.dataLoaded,

    user: state.user_data.user,

    privateMaps: state.user_data.privateMaps,
    publicMaps: state.user_data.publicMaps,
    recentMaps: state.user_data.recentMaps,
    trashMaps: state.user_data.trashMaps
});

export default connect(mapStateToProps,{ loadUser, createMap, deleteMap, updateRecentMap, loadTrashMaps, putToTrash, loadMapId })(Home);