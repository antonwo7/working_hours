import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginAction} from "../../actions/auth"
import Logo from "./Logo"
import LoadingIcon from "./icons/LoadingIcon"
import classNames from "classnames"
import CloseIcon from "./icons/CloseIcon"
import {ILoginDispatchProps, ILoginProps, ILoginState} from "../../types/auth"
import {IState} from "../../types/main";

class Login extends Component<ILoginProps & ILoginDispatchProps, ILoginState> {

    constructor(props: ILoginProps & ILoginDispatchProps) {
        super(props)

        this.state = {
            username: '',
            password: '',
            loading: false,
            submitEnable: false,
        }
    }

    checkSubmitEnable(): boolean {
        return !!this.state.username && !!this.state.password
    }

    inputChange(value: string, field: keyof ILoginState): void {
        this.setState({...this.state, [field]: value})
    }

    async onSubmit(): Promise<void> {
        this.setState({loading: true})

        if (!this.state.username || !this.state.password) {
            return
        }

        setTimeout((): void => {
            this.props.loginAction(this.state.username, this.state.password, () => {
                this.setState({loading: false})
            })
        }, 1400)
    }

    render() {
        const submitEnable: boolean = this.checkSubmitEnable()

        return (
            <section className="h-full gradient-form bg-gray-200">
                <div className="container p-10 h-full mx-auto">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 mx-auto">
                        <div className="w-full">
                            <div className="block bg-white shadow-lg rounded-lg">
                                <div className="lg:flex lg:flex-wrap g-0 justify-center">
                                    <div className="lg:w-6/12 px-4 md:px-0">
                                        <div className="md:p-12 md:mx-6">
                                            <div className="text-center">
                                                <Logo/>
                                                <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">ILusiaK</h4>
                                            </div>
                                            <form>
                                                <p className="mb-4">Please login to your account</p>
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Username"
                                                        value={this.state.username}
                                                        onChange={e => this.inputChange(e.target.value, 'username')}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Password"
                                                        value={this.state.password}
                                                        onChange={e => this.inputChange(e.target.value, 'password')}
                                                    />
                                                </div>
                                                <div className="text-center pt-1 mb-4 pb-1">
                                                    <button
                                                        className={
                                                            classNames('inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:outline-none focus:ring-0 transition duration-150 ease-in-out',
                                                                {'opacity-60': !submitEnable})
                                                        }
                                                        type="button"
                                                        onClick={() => this.onSubmit()}
                                                        disabled={!submitEnable}
                                                    >
                                                        {this.state.loading && <LoadingIcon/>}
                                                        Log in
                                                    </button>

                                                </div>
                                                {this.props.errorShown && (
                                                    <div
                                                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                                        role="alert">
                                                        <strong className="font-bold">Error de autorizacion!</strong>
                                                        <span className="block sm:inline ml-2">Verifica correo y contraseña</span>
                                                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                                            <CloseIcon/>
                                                        </span>
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(
    (state: IState) => {
        return {
            isLogged: state.auth.isLogged,
            errorShown: state.auth.errorShown
        }
    },
    { loginAction }
)(Login);