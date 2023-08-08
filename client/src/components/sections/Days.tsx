import React, {Component} from 'react'
import {connect} from "react-redux";
import {IState} from "../../types/main";
import LightCloseIcon from "../common/icons/LightCloseIcon";
import EditIcon from "../common/icons/EditIcon";
import Button from "../common/elements/Button";
import SectionLoading from "../common/SectionLoading";
import {IDay} from "../../types/days";
import {addDayAction, removeDayAction} from "../../actions/days";
import {dateFormat, getDates, getMonthNameList} from "../../functions/days";
import Select from "../common/elements/Select";
import classNames from "classnames";

const closeButton = {
    className: "text-sm focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { width: '20px' }
}
const editButton = {
    className: "text-sm focus:outline-none text-white bg-green-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-1 py-1 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    style: { width: '20px' }
}

const th = {
    className: "border-b dark:border-slate-600 font-medium px-2 pt-3 pb-3 text-slate-800 dark:text-slate-200 text-left bg-gray-300"
}

const td = {
    className: "border-b border-slate-100 dark:border-slate-700 px-2 pt-2 pb-2 text-slate-500 dark:text-slate-400"
}

const table = {
    classNames: "border-collapse table-fixed w-full text-sm mt-3"
}

const headerNames = ['Dia', 'Total horas', 'Horas comp.', 'Horas extras', 'Horas a com', 'Entrada', 'Salida', 'Entrada', 'Salida', 'Firma']

class Days extends Component<{ dayList: Array<IDay>, addDayAction: Function, removeDayAction: Function }, { loading: boolean, month: number, monthNames: {[key: number]: string}, dateList: Array<{ date: string, weekend: boolean }> }> {
    constructor(props: { dayList: Array<IDay>, addDayAction: Function, removeDayAction: Function }) {
        super(props)

        const currentMonth = (new Date()).getMonth()
        const dateList = this.getDateList(currentMonth)

        this.state = {
            loading: false,
            month: currentMonth,
            monthNames: this.getMonthOptions(),
            dateList: dateList
        }
    }

    getDateList(monthNumber: number) {
        return getDates(monthNumber)
    }

    getMonthOptions() {
        const monthNameOptions: {[key: number]: string} = {}
        getMonthNameList().forEach((monthName, index) => monthNameOptions[index] = monthName)
        return monthNameOptions
    }

    addDay = (dayString: string) => {
        this.props.addDayAction(dayString)
    }

    removeDay = (id: number) => {
        this.props.removeDayAction(id)
    }

    changeMonth(monthNumber: number) {
        this.setState({ dateList: this.getDateList(monthNumber) })
    }

    checkDate(dateString: string): number | null {
        const found = this.props.dayList.filter(day => String(day.date) === dateString)
        if (found.length === 0) return null

        return found[0]['id'] ? found[0]['id'] : null
    }

    render() {

        return (
            <>
                {this.state.loading && <SectionLoading opacity={true} />}
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <Select options={this.state.monthNames} onChange={(value: number) => this.changeMonth(value)} />
                        <table className="border-collapse table-fixed w-full text-sm mt-3">
                            <thead>
                                <tr>
                                    {headerNames.map((name, i) => <th key={i} {...th}>{name}</th>)}
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800">
                                {this.state.dateList && this.state.dateList.map((date: { date: string, weekend: boolean }, index: number) => {

                                    const values = [date.date, '8h', '', '', '', '8:00', '14:00', '16:00', '18:00']
                                    const signedDayId = this.checkDate(date.date)

                                    return (
                                        <tr className={ classNames("hover:bg-blue-200", {'bg-gray-200': date.weekend}) } key={index}>
                                            {values.map((value, i) => <td key={i} className={td.className}>{value}</td>)}
                                            <td className={td.className}>
                                                {!date.weekend && (
                                                    signedDayId ? (<>
                                                        <button type="button" { ...closeButton } onClick={() => this.removeDay(signedDayId)}><LightCloseIcon width={3} height={3}/></button>
                                                        <span>Firmado</span>
                                                    </>) : (
                                                        <button type="button" { ...editButton } onClick={() => this.addDay(date.date)}><EditIcon width={3} height={3}/></button>
                                                    )
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default connect((state: IState) => {
    return {
        dayList: state.days.dayList
    }
}, { removeDayAction, addDayAction })
(Days)