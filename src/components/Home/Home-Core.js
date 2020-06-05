import React, { Component} from 'react';

import {Home_Menu} from './Home-Menu';
import {Home_MapsList} from './Home-MapsList';
import {Home_MapsListRecent} from './Home-MapsListRecent';
import {Home_MapsListTrash} from './Home-MapsListTrash';
import {Home_FormAddMap} from './Home-FormAddMap';

import { connect } from 'react-redux';
import { loadUser } from "../../actions/authAction";
import { loadMaps, createMap, deleteMap, loadRecentMaps, addRecentMap, loadTrashMaps, putToTrash, reviveMap } from '../../actions/homeAction';
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
        this.props.createMap(title);
    }

    
    loadMaps = () => {
        this.props.loadMaps();
    }
    
    loadRecentMaps = () => {
        this.props.loadRecentMaps();
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

    reviveMap = (id) => {
        this.props.reviveMap(id);
    }

    getMapId = (id) => {
        this.props.loadMapId(id)
        this.props.addRecentMap(id);
    }

    render() {
        return (
            <div className='home-container'>
                <Home_FormAddMap 

                    showFormAddMap={this.state.showFormAddMap}
                    closeFormAddMap={this.closeFormAddMap}
                    
                    createNewMap={this.createNewMap}
                />

                <Home_Menu 
                    selectMenuSection={this.selectMenuSection} 

                    loadMaps={this.loadMaps}
                    loadRecentMaps={this.loadRecentMaps}
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
                                body={this.reviveMap}
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
    dataLoaded: state.auth.dataLoaded,

    privateMaps: state.user_data.privateMaps,
    publicMaps: state.user_data.publicMaps,
    recentMaps: state.user_data.recentMaps,
    trashMaps: state.user_data.trashMaps
});

export default connect(mapStateToProps,{ loadMaps, loadUser, createMap, deleteMap, loadRecentMaps, addRecentMap, loadTrashMaps, putToTrash, loadMapId, reviveMap })(Home);