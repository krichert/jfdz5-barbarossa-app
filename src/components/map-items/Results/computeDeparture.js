export const computeDeparture = foundLines => {

    return foundLines.map(
        line => ({
            ...line,
            startStop: {
                ...line.startStop,
                timeToArrival: line.dTimes.slice(0,line.startStop.index + 1).reduce((total, next) => total + next, 0)
            },
            endStop: {
                ...line.endStop,
                timeToArrival: line.dTimes.slice(0,line.endStop.index + 1).reduce((total, next) => total + next, 0)
            }
        })
    ).map(
        line => ({
            ...line,
            computedDepartures: line.departures.map(
                departure => ({
                    depFromStartStop: departure.hour * 3600 + departure.minutes * 60 + departure.seconds + line.startStop.timeToArrival,
                    depFromEndStop: departure.hour * 3600 + departure.minutes * 60 + departure.seconds + line.endStop.timeToArrival
                })
            )
        })
    )

}