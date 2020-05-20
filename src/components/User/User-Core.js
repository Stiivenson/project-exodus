import React, { Component, Fragment} from 'react';

import { connect } from 'react-redux';
import { register, login } from "../../actions/authAction";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";


class User extends Component{
    state = {
        selectedAuthForm: 'login'
    }

    selectAuthForm = (form) => {
        this.setState({ selectedAuthForm: form });
    }

    sendLoginForm = (mail, password) => {
        this.props.login(mail, password);
    }

    render() {
        return (
            <Fragment>
                 {(() => {
                    switch (this.state.selectedAuthForm) {
                        case 'login':
                            return <LoginForm 
                                        selectAuthForm={this.selectAuthForm}
                                        sendLoginForm={this.sendLoginForm} />;

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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register, login})(User);