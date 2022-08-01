import moment from "moment"


/**
 * Esta función prepara el formato de las fechas de los eventos para ser 
 * introducidos en el calendar de "react-big-calendar".
 * @function
 * @param {Array<Object>} events - Eventos a preparar.
 */
export const prepareEvents = (events) => {

    return events.map(
        e => ({
            ...e,
            start: moment( e.start ).toDate(),
            end: moment( e.end ).toDate()
        })
    )
}
