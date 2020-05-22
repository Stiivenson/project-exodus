import React, { Component} from 'react';

import io from "socket.io-client";

import {Home_Menu} from './Home-Menu';
import {Home_MapsList} from './Home-MapsList';
import {Home_MapsListRecent} from './Home-MapsListRecent';
import {Home_MapsListTrash} from './Home-MapsListTrash';
import {Home_FormAddMap} from './Home-FormAddMap';

import { connect } from 'react-redux';
import { loadUser } from "../../actions/authAction";
import { createMap, deleteMap } from '../../actions/homeAction';


let socket;
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            showFormAddMap: false,
    
            selectedMenuSection: 'maps'
        }
    }  
   
    componentDidMount() {
        if(this.props.token){
            this.props.loadUser();
            
            socket = io.connect("http://localhost:5000", {query: {token: this.props.token}});
            console.log(socket); 

            socket.on('SERVER:SEND_MAP_DATA', (data) => {
                console.log(data);
                
            });

            //socket.emit('CLIENT:GET_MAP_DATA', id);
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

                                PublicMaps={this.props.publicMaps}
                                PrivateMaps={this.props.privateMaps}

                                openFormAddMap={this.openFormAddMap}
                                deleteMap={this.deleteMap}  />;

                        case 'recent':
                            return <Home_MapsListRecent 
                                RecentMaps={this.props.recentMaps} />;

                        case 'trash':
                            return <Home_MapsListTrash 
                                TrashMaps={this.props.trashMaps} />;

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

    user: state.user_data.user,

    privateMaps: state.user_data.privateMaps,
    publicMaps: state.user_data.publicMaps,
    recentMaps: state.user_data.recentMaps,
    trashMaps: state.user_data.trashMaps
});

export default connect(mapStateToProps,{ loadUser, createMap, deleteMap })(Home);