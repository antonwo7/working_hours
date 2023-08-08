import React, {Component} from 'react'
import {connect} from "react-redux";
import {IState} from "../../types/main";
import {IAddUserModalState, IUser, IUserProps, IUsersState} from "../../types/users";
import {addUserAction, editUserAction, removeUserAction} from "../../actions/users";
import LightCloseIcon from "../common/icons/LightCloseIcon";
import EditIcon from "../common/icons/EditIcon";
import Button from "../common/elements/Button";
import SectionLoading from "../common/SectionLoading";
import AddUserModal from "../modals/AddUserModal";

const closeButton = {
    className: "text-sm focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { position: 'absolute', top: '0', transform: 'translateY(-50%) translateX(-50%)', left: '0', width: '20px' } as React.CSSProperties
}
const editButton = {
    className: "text-sm focus:outline-none text-white bg-green-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { position: 'absolute', top: '0', transform: 'translateY(-50%) translateX(-50%)', left: '100%', width: '20px' } as React.CSSProperties
}

class Users extends Component<IUserProps, { loading: boolean, adding: boolean, editing: boolean, editingUser: IUser | null }> {
    constructor(props: IUserProps) {
        super(props);
        this.state = {
            loading: false,
            adding: false,
            editing: false,
            editingUser: null
        }
    }

    closeAddingModal = () => this.setState({ adding: false, editing: false, editingUser: null })
    showAddingModal = () => this.setState({ adding: true })
    showEditingModal = (user: IUser) => this.setState({ editing: true, editingUser: user })

    addUser = (userData: IAddUserModalState) => {
        this.props.addUserAction(userData, this.closeAddingModal)
    }

    editUser = (userData: IAddUserModalState) => {
        this.props.editUserAction && this.props.editUserAction(userData, this.closeAddingModal)
    }

    removeUser = (id: number) => {
        this.props.removeUserAction(id)
    }



    render() {

        return (
            <>
                {this.state.loading && <SectionLoading opacity={true} />}
                {this.state.adding && <AddUserModal addHandler={this.addUser} closeHandler={this.closeAddingModal} />}
                {this.state.editing && <AddUserModal addHandler={this.addUser} editHandler={this.editUser} closeHandler={this.closeAddingModal} user={this.state.editingUser} />}
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        {this.props.userList && this.props.userList.map((user, index) => (
                            <div className="mb-6 flex flex-row bg-gray-200 rounded flex items-center relative p-3 min-w-[32rem] max-w-[100%]" key={user.id}>
                                <div className="mr-4">
                                    <span>{user.name}</span>
                                </div>
                                <button type="button" { ...closeButton } onClick={() => this.removeUser(user.id)}><LightCloseIcon width={3} height={3}/></button>
                                <button type="button" { ...editButton } onClick={() => this.showEditingModal(user)}><EditIcon width={3} height={3}/></button>
                            </div>

                        ))}

                        <div className="flex justify-between">
                            <Button type="button" label="Agregar" onClick={() => this.showAddingModal()} />
                        </div>
                    </div>
                    {/*<div className="mb-4 flex items-end">*/}
                    {/*    <Button type="button" label="Guardar" onClick={} loading={this.state.saveLoading} />*/}
                    {/*</div>*/}
                </div>
            </>
        )
    }
}

export default connect((state: IState) => {
    return {
        userList: state.users.userList
    }
}, { removeUserAction, addUserAction, editUserAction })
(Users)