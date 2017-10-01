import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Button} from 'react-bootstrap'
import firebase from 'firebase'

import './AuthLog.css'
import UsersList from './menu-items/UsersList'
import UserRemoveModal from './views/UserRemoveModal'
import {toggleUserRemoveModal} from '../state/modals'

const AuthLog = ({children, user, modals, toggleUserRemoveModal}) => {
    return (
        <div>
            {
                user === null ?
                    children :
                    <div className="main-panel">
                        <h1>
                            You are logged in as <strong>{user.displayName}</strong>
                        </h1>

                        <LinkContainer exact to="/">
                            <Button className="btn-exit">
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </Button>
                        </LinkContainer>

                        <Button className="btn-custom" onClick={() => firebase.auth().signOut()}>
                            Sign Out
                        </Button>

                        <Button className="btn-custom" onClick={() => toggleUserRemoveModal(true)}>
                            Delete account
                        </Button>
                        <UsersList/>
                        {
                            modals.showRemoveModal ? <UserRemoveModal/> : null
                        }
                    </div>
            }
        </div>
    )
}

export default withRouter(connect(
    state => ({
        user: state.auth.user,
        modals: state.modals
    }),
    dispatch => ({
        toggleUserRemoveModal: boolean => dispatch(toggleUserRemoveModal(boolean)),
    })
)(AuthLog))