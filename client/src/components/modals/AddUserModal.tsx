import React, {Component} from 'react'
import CloseIcon from "../common/icons/CloseIcon";
import Input from "../common/elements/Input";
import Button from "../common/elements/Button";
import {IAddUserModalState, IUser} from "../../types/users";

class AddUserModal extends Component<{addHandler: Function, closeHandler: Function, editHandler?: Function, user?: IUser | null}, IAddUserModalState> {
    constructor(props: {addHandler: Function, closeHandler: Function, editHandler?: Function, user?: IUser}) {
        super(props);

        const user = this.props.user
        this.state = {
            name: user?.name ?? '',
            username: user?.username ?? '',
            password: '',
            nif: user?.nif ?? '',
            naf: user?.naf ?? '',
            contract_code: user?.contract_code ?? '',
            date: user?.date ?? ''
        }
    }

    save = () => {
        if (this.props.user && this.props.user.id && this.props.editHandler) {
            this.props.editHandler({ ...this.state, id: this.props.user.id })
        } else {
            this.props.addHandler({ ...this.state })
        }
    }

    render() {
        return (
            <div id="authentication-modal" aria-hidden="true" className="flex items-center justify-center bg-white fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" onClick={() => this.props.closeHandler()} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <CloseIcon />
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <form className="space-y-6" action="#">
                                <div className="mb-4 flex">
                                    <Input type="text" value={this.state.name} title="Nombre" onChange={(value: string) => this.setState({name: value}) } />
                                </div>
                                <div className="mb-4 flex">
                                    <Input type="text" value={this.state.username} title="Nombre de usuario" onChange={(value: string) => this.setState({username: value}) } />
                                </div>
                                <div className="mb-4 flex">
                                    <Input type="text" value={this.state.password} title="Contraseña" onChange={(value: string) => this.setState({password: value}) } />
                                </div>
                                <div className="mb-4 flex">
                                    <Input type="text" value={this.state.nif} title="NIF" onChange={(value: string) => this.setState({nif: value}) } />
                                </div>
                                <div className="mb-4 flex">
                                    <Input type="text" value={this.state.naf} title="NAF" onChange={(value: string) => this.setState({naf: value}) } />
                                </div>
                                <div className="mb-4 flex">
                                    <Input type="date" value={this.state.date} title="Fecha de alta" onChange={(value: string) => this.setState({date: value}) } />
                                </div>
                                <div className="mb-4 flex">
                                    <Input type="text" value={this.state.contract_code} title="Numero de contrato" onChange={(value: string) => this.setState({contract_code: value}) } />
                                </div>
                                <div className="">
                                    <Button type="button" label="Guardar" onClick={() => this.save()} />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddUserModal