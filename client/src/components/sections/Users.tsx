import React, {Component} from 'react'
import {connect} from "react-redux";
import {IState} from "../../types/main";
import {IUser, IUserProps, IUsersState} from "../../types/users";
import {removeUserAction} from "../../actions/users";

const closeButton = {
    className: "text-sm focus:outline-none text-white bg-green-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { position: 'absolute', top: '-5px', left: '-5px', width: '25px' }
}
const editButton = {
    class: "text-sm focus:outline-none text-white bg-green-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { position: 'absolute', top: 'calc(100% - 20px)', left: 'calc(100% - 20px)', width: '25px' }
}

class Users extends Component<IUserProps> {
    constructor(props: IUserProps) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">

                        {this.props.userList && this.props.userList.map((user, index) => (
                            <div className="mb-4 flex flex-row bg-gray-200 rounded flex items-center relative p-3" key={user.id}>
                                <div className="mr-4">
                                    <span>{index}</span>
                                </div>
                                <div className="mr-4">
                                    <span>{user.name}</span>
                                </div>
                                <div className="relative">
                                    <button type="button" { ...closeButton } onClick={}>
                                        <LightCloseIcon width="3" height="3"/>
                                    </button>

                                    <button style={editButtonStyle} type="button" className="text-sm focus:outline-none text-white bg-blue-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={() => this.onSetSign(index)}
                                    >
                                        <EditIcon width="3" height="3"/>
                                    </button>
                                </div>
                            </div>

                        ))}

                        <div className="mb-4 flex justify-between">
                            <Button type="button" label="Agregar" onClick={() => this.onAdd()} />
                        </div>
                    </div>
                    <div className="mb-4 flex items-end">
                        <Button type="button" label="Guardar" onClick={() => this.onSave()} loading={this.state.saveLoading} />
                    </div>
                </div>
            </>
        )
    }
}

export default connect((state: IState) => {
    return {
        userList: state.users.userList
    }
}, { removeUserAction })
(Users)