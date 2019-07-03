import moment from 'moment'
import { getColor } from './ColorTools'

export function displayAllEvent(allEvent, typeEvent) {
  eventDisplay = {}
  allEvent.map((event) => {
    var currentDayOfEvent = moment(new Date(event.Start))
    var eventLineHeight = 0
    var allDateOfEvent = [
      currentDayOfEvent.format('YYYY-MM-DD')
    ]

    while (!currentDayOfEvent.isSame(event.End, 'day')) {
      currentDayOfEvent.add(1, 'days')
      allDateOfEvent = [
        ...allDateOfEvent,
        currentDayOfEvent.format('YYYY-MM-DD')
      ]
    }

    var placeInCalendarFounded = false
    while(!placeInCalendarFounded) {
      for (var i = 0; i < allDateOfEvent.length; i++) {
        if (allDateOfEvent[i] in eventDisplay
            && eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] !== undefined
            && eventDisplay[allDateOfEvent[i]].periods[eventLineHeight].color !== 'transparent') {
          eventLineHeight++
          break
        }
        if (i === allDateOfEvent.length - 1) {
          placeInCalendarFounded = true
        }
      }
    }

    allDateOfEvent.map(date => {
      if (!(date in eventDisplay)) {
        eventDisplay[date] = {
          periods: []
        }
      }
    })

    for (var i = 0; i < allDateOfEvent.length; i++) {
      if (event.Start.isSame(event.End, 'day')) {
        eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: true, endingDay: true, color: event.IsPublic ? event.specificColor === undefined ? typeEvent.find((item) => item.Id === event.TypeId).Color : getColor(event.specificColor) : 'black' }
      } else if (moment(allDateOfEvent[i]).isSame(event.Start, 'day')) {
        eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: true, endingDay: false, color: event.IsPublic ? event.specificColor === undefined ? typeEvent.find((item) => item.Id === event.TypeId).Color : getColor(event.specificColor) : 'black' }
      } else if (moment(allDateOfEvent[i]).isSame(event.End, 'day')) {
        eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: false, endingDay: true, color: event.IsPublic ? event.specificColor === undefined ? typeEvent.find((item) => item.Id === event.TypeId).Color : getColor(event.specificColor) : 'black' }
      } else {
        eventDisplay[allDateOfEvent[i]].periods[eventLineHeight] = { startingDay: false, endingDay: false, color: event.IsPublic ? event.specificColor === undefined ? typeEvent.find((item) => item.Id === event.TypeId).Color : getColor(event.specificColor) : 'black' }
      }
    }

    allDateOfEvent.map(date => {
      for (var i = 0; i < eventLineHeight; i++) {
        if (eventDisplay[date].periods[i] === undefined) {
          eventDisplay[date].periods[i] = { color: 'transparent' }
        }
      }
    })
  })

  return eventDisplay
}
