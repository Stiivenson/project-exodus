import React, { Component} from 'react';

import {Home_Menu} from './Home-Menu';
import {Home_MapsList} from './Home-MapsList';
import {Home_MapsListRecent} from './Home-MapsListRecent';
import {Home_MapsListTrash} from './Home-MapsListTrash';
import {Home_FormAddMap} from './Home-FormAddMap';

import { connect } from 'react-redux';
import { getMaps, createMap, deleteMap } from '../../actions/homeAction';

class Home extends Component{
    state = {
        showFormAddMap: false,

        selectedMenuSection: 'maps'
    }

    // Get User Maps from DB
    componentDidMount(){
        this.props.getMaps();
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
                                PublicMaps={this.props.PublicMaps}
                                PrivateMaps={this.props.PrivateMaps}

                                deleteMap={this.deleteMap}

                                openFormAddMap={this.openFormAddMap} />;

                        case 'recent':
                            return <Home_MapsListRecent 
                                PublicMaps={this.props.PublicMaps}
                                PrivateMaps={this.props.PrivateMaps}

                                openFormAddMap={this.openFormAddMap} />;

                        case 'trash':
                            return <Home_MapsListTrash 
                                PublicMaps={this.props.PublicMaps}
                                PrivateMaps={this.props.PrivateMaps}

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
    PublicMaps: state.userMaps.PublicMaps,
    PrivateMaps: state.userMaps.PrivateMaps
});

export default connect(mapStateToProps,{ getMaps, createMap, deleteMap })(Home);