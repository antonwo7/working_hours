import React, {Component} from 'react'
import CloseIcon from "../common/icons/CloseIcon";
import Input from "../common/elements/Input";
import Button from "../common/elements/Button";
import {IAddUserModalState, IUser} from "../../types/users";
import {ICompany} from "../../types/companies";
import {connect} from "react-redux";
import {IState} from "../../types/main";
import {editCompanyAction} from "../../actions/companies";

const textareaClassname = "block w-full flex-1 rounded-none rounded-r-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3"

class CompanyModal extends Component<{ companyList: Array<ICompany>, closeHandler: Function, editCompanyAction: Function }, ICompany> {
    constructor(props: { companyList: Array<ICompany>, closeHandler: Function, editCompanyAction: Function }) {
        super(props)

        const company: ICompany = this.props.companyList[0]
        this.state = {
            name: company?.name ?? '',
            cif: company?.cif ?? '',
            code: company?.code ?? '',
            law_text: company?.law_text ?? ''
        }
    }

    save = () => {
        const company: ICompany = this.props.companyList[0]
        this.props.editCompanyAction({ ...this.state, id: company.id })
        this.props.closeHandler()
    }

    render() {
        return (
            <div id="company-modal" aria-hidden="true" className="flex items-center justify-center bg-white fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full">
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
                                    <Input type="text" value={this.state.cif} title="CIF" onChange={(value: string) => this.setState({cif: value}) } />
                                </div>
                                <div className="mb-4 flex">
                                    <Input type="text" value={this.state.code} title="Codigo" onChange={(value: string) => this.setState({code: value}) } />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label className="inline-flex items-center rounded-l-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 py-2 w-full">Texto de ley</label>
                                    <textarea cols={30} rows={10} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({law_text: e.target.value}) } className={textareaClassname}>
                                        {this.state.law_text}
                                    </textarea>
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

export default connect(
    (state: IState) => {
        return {
            companyList: state.companies.companyList
        }
    },
    {editCompanyAction}
)(CompanyModal);