import React, { Component} from 'react';

import {Home_Menu} from './Home-Menu';
import {Home_MapsList} from './Home-MapsList';
import {Home_MapsListRecent} from './Home-MapsListRecent';
import {Home_MapsListTrash} from './Home-MapsListTrash';
import {Home_FormAddMap} from './Home-FormAddMap';

import { connect } from 'react-redux';
import { createMap } from '../../actions/homeAction';

class Home extends Component{
    state = {
        showFormAddMap: false,

        selectedMenuSection: 'maps'
    }

    // Select Menu section
    selectMenuSection = (menu) => {
        this.setState({ selectedMenuSection: menu });        
    }

    // Open & close Form to create new Map
    openFormAddMap = () => {
        this.setState({
            showFormAddMap: true
        });
    }   
    closeFormAddMap = () => {
        this.setState({showFormAddMap: false});
    } 

    // Create new Map
    createNewMap = (title) => {
        this.props.createMap(title);
    }

    // Delete Map
    deleteMap = (id) => {
        this.props.deleteMap(id);
    }


    render() {
        return (
            <div className='home-container'>
                <Home_FormAddMap 
                    showFormAddMap={this.state.showFormAddMap}
                    closeFormAddMap={this.closeFormAddMap}
                    
                    createNewMap={this.createNewMap}/>
                <Home_Menu selectMenuSection={this.selectMenuSection} />

                {(() => {
                    switch (this.state.selectedMenuSection) {
                        case 'maps':
                            return <Home_MapsList 
                                History={this.props.history}

                                PublicMaps={this.props.publicMaps}
                                PrivateMaps={this.props.privateMaps}

                                deleteMap={this.deleteMap}

                                openFormAddMap={this.openFormAddMap} />;

                        case 'recent':
                            return <Home_MapsListRecent 
                                RecentMaps={this.props.recentMaps} />;

                        case 'trash':
                            return <Home_MapsListTrash 
                                TrashMaps={this.props.trashMaps}

                                openFormAddMap={this.openFormAddMap} />;

                    default:
                        return null;
                    }
                })()}
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    privateMaps: state.user_data.privateMaps,
    publicMaps: state.user_data.publicMaps,
    recentMaps: state.user_data.recentMaps,
    trashMaps: state.user_data.trashMaps
});

export default connect(mapStateToProps,{ createMap })(Home);