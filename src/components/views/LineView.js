import React from 'react'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Button} from 'react-bootstrap'


const LineView = props => {
    const lineName = parseInt(props.match.params.stopId, 10);
    const selectedLine = props.lines.find(line => line.name === lineName);
    const stopsInSelectedLine = selectedLine.stops.map(stop => stop.name);

    return (
        selectedLine ?
            <div>
                <h1> {lineName} </h1>
                <LinkContainer exact to="/lines">
                    <Button>
                        <i className="fa fa-arrow-left"/>
                    </Button>
                </LinkContainer>
                <h3>Departures lines:</h3>
                <ul>
                    {
                        selectedLine.stops.map(stop =>
                            (
                                <li key={stop.id}>
                                    {
                                        stop.name
                                    }
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
            :
            <div>Fetching data...</div>
    )

}

export default connect(
    state => ({
        lines: state.lines
    })
)(LineView)