import React, { Component, Fragment} from 'react';

import { connect } from 'react-redux';

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

class User extends Component{
    state = {
        selectedAuthForm: 'login'
    }

    selectAuthForm = (form) => {
        this.setState({ selectedAuthForm: form });
    }

    render() {
        return (
            <Fragment>
                 {(() => {
                    switch (this.state.selectedAuthForm) {
                        case 'login':
                            return <LoginForm 
                                        selectAuthForm={this.selectAuthForm} />;

                        case 'register':
                            return <RegisterForm 
                                        selectAuthForm={this.selectAuthForm} />;

                    default:
                        return null;
                    }
                })()}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, null)(User);