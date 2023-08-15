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
import classNames from "classnames";
import ChooseMonthsModal from "../modals/ChooseMonthsModal";
import DownloadIcon from "../common/icons/DownloadIcon";
import {generateReportAction} from "../../actions/common";
import {fileDownload} from "../../functions/common";

const closeButton = {
    className: "text-sm focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { width: '20px' }
}
const editButton = {
    className: "text-sm focus:outline-none text-white bg-green-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { width: '20px' }
}

const generateButton = {
    className: "text-sm focus:outline-none text-white bg-blue-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { width: '20px' }
}

const th = {
    className: "border-b dark:border-slate-600 font-medium px-2 pt-3 pb-3 text-slate-800 dark:text-slate-200 text-left bg-gray-300"
}

const td = {
    className: "border-b border-slate-300 dark:border-slate-700 px-2 pt-2 pb-2 text-slate-500 dark:text-slate-400"
}

const table = {
    classNames: "border-collapse table-fixed w-full text-sm mt-3"
}

const headerNames = ['Nombre', 'Usario', 'NIF', 'NAF', '']


class Users extends Component<IUserProps, { loading: boolean, adding: boolean, editing: boolean, editingUser: IUser | null, monthsChoosing: boolean, reportingUser: number | null }> {
    constructor(props: IUserProps) {
        super(props);
        this.state = {
            loading: false,
            adding: false,
            editing: false,
            editingUser: null,
            monthsChoosing: false,
            reportingUser: null
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

    generatePDF = (months: Array<number>, callback: Function) => {
        this.setState({ monthsChoosing: true })
        if (!this.state.reportingUser) return;

        this.props.generateReportAction(months, this.state.reportingUser, (reportUrl: string) => {
            fileDownload(reportUrl)
            callback && callback()
        } )
    }

    generate = (id: number) => {
        this.setState({ monthsChoosing: true, reportingUser: id })
    }

    closeGenerate = () => {
        this.setState({ monthsChoosing: false  })
    }

    render() {

        return (
            <>
                {this.state.loading && <SectionLoading opacity={true} />}
                {this.state.monthsChoosing && this.state.reportingUser && <ChooseMonthsModal userId={this.state.reportingUser} executeHandle={this.generatePDF} closeHandle={this.closeGenerate} />}
                {this.state.adding && <AddUserModal addHandler={this.addUser} closeHandler={this.closeAddingModal} />}
                {this.state.editing && <AddUserModal addHandler={this.addUser} editHandler={this.editUser} closeHandler={this.closeAddingModal} user={this.state.editingUser} />}
                <div className="flex flex-row justify-between">

                    <table className="border-collapse table-fixed w-full text-sm mt-3 mb-6">
                        <thead>
                        <tr>
                            {headerNames.map((name, i) => <th key={i} {...th}>{name}</th>)}
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800">
                        {this.props.userList && this.props.userList.map((user, index) => {
                            const values = [user.name, user.username, user.nif, user.naf]
                            return (
                                <tr className="hover:bg-blue-200" key={index}>
                                    {values.map((value, i) => <td key={i} className={td.className}>{value}</td>)}
                                    <td className={td.className}>
                                        <button type="button" { ...editButton } onClick={() => this.showEditingModal(user)}><EditIcon width={3} height={3}/></button>
                                        <button type="button" { ...closeButton } onClick={() => this.removeUser(user.id)}><LightCloseIcon width={3} height={3}/></button>
                                        <button type="button" { ...generateButton } onClick={() => this.generate(user.id)}><DownloadIcon width={3} height={3}/></button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between">
                    <Button type="button" label="Agregar" onClick={() => this.showAddingModal()} />
                </div>
            </>
        )
    }
}

export default connect((state: IState) => {
    return {
        userList: state.users.userList
    }
}, { removeUserAction, addUserAction, editUserAction, generateReportAction })
(Users)