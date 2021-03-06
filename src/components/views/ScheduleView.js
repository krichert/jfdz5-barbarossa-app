import React from 'react'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'

import '../menu-items/Schedules.css'

import {getStopSchedule} from '../_utlis/getStopSchedule'

const ScheduleView = props => {
    const stopId = parseInt(props.match.params.stopId, 10);
    const stopDetails = props.stops.find(stop => stop.id === stopId);
    const stopSchedule = getStopSchedule(props.lines, stopId)

    return (
        stopDetails ?
            <div className="main-panel menu-panel schedule-view">
                <h1> {stopDetails.name} </h1>
                <LinkContainer className="btn-back" exact to="/stops">
                    <Button>
                        <i className="fa fa-arrow-left"/>
                    </Button>
                </LinkContainer>
                <LinkContainer className="btn-exit" exact to="/">
                    <Button>
                        <i className="fa fa-times" />
                    </Button>
                </LinkContainer>
                <Table>
                    <thead>
                    <tr>
                        <th className="line-number_header">Line</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        stopSchedule.map(
                            line => (
                                <tr className="line-number-outter"key={line.name}>
                                    <td className="line-number"> {line.name} </td>
                                    {
                                        line.timeFromSelectedStop.map(
                                            (time, index) => (
                                                <td className="line-hour" key={index}>
                                                    {
                                                        time.hours + ':' + time.minutes
                                                    }
                                                </td>
                                            )
                                        )
                                    }
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </Table>
            </div>
            :
            <div className="main-panel menu-panel">
                Fetching data
            </div>

    )

}

export default connect(
    state => ({
        stops: state.stops,
        lines: state.lines
    })
)(ScheduleView)