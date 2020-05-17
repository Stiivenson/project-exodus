import React, { Component} from 'react';

import {Home_Menu} from './Home-Menu';
import {Home_MapsList} from './Home-MapsList';
import {Home_FormAddMap} from './Home-FormAddMap';

import { connect } from 'react-redux';
import { getMaps } from '../../actions/homeAction';

class Home extends Component{
    state = {
        showFormAddMap: false,
        typeOfNewMap: ''
    }

    // Get User Maps from DB
    componentDidMount(){
        this.props.getMaps();
    }

    // Open & close Form to create new Map
    openFormAddMap = (type) => {
        this.setState({
            showFormAddMap: true,
            typeOfNewMap: type
        });
    }   
    closeFormAddMap = () => {
        this.setState({showFormAddMap: false});
    } 

    render() {
        return (
            <div className='home-container'>
                <Home_FormAddMap 
                    showFormAddMap={this.state.showFormAddMap}
                    closeFormAddMap={this.closeFormAddMap}/>
                <Home_Menu/>
                <Home_MapsList 
                    PublicMaps={this.props.PublicMaps}
                    PrivateMaps={this.props.PrivateMaps}

                    openFormAddMap={this.openFormAddMap} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    PublicMaps: state.userMaps.PublicMaps,
    PrivateMaps: state.userMaps.PrivateMaps
});

export default connect(mapStateToProps,{ getMaps })(Home);