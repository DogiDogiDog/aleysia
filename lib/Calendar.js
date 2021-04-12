dateFNS = require("date-fns")

let date = new Date()
dayOff = new Array()

/** List of day off */
dayOff.push(dateFNS.parseISO(date.getFullYear() + "01-01"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "04-05"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "05-01"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "05-08"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "05-13"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "05-24"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "07-14"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "08-15"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "11-01"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "11-11"))
dayOff.push(dateFNS.parseISO(date.getFullYear() + "12-25"))

let activeDayOff = new Array()

businessCalendar = new Array()

function businessDays() {
    for (let i = 1; i < 9; i++) {
        let res = dateFNS.differenceInBusinessDays(
            dateFNS.parseISO(date.getFullYear() + "-0" + (i + 1) + "-01"),
            dateFNS.parseISO(date.getFullYear() + "-0" + i + "-01")
        )
        businessCalendar.push({
            i,
            res
        })
    }

    res = dateFNS.differenceInBusinessDays(
        dateFNS.parseISO(date.getFullYear() + "-" + 10 + "-01"),
        dateFNS.parseISO(date.getFullYear() + "-0" + 9 + "-01")
    )
    businessCalendar.push({
        i: 9,
        res
    })

    for (let i = 10; i < 12; i++) {
        let res = dateFNS.differenceInBusinessDays(
            dateFNS.parseISO(date.getFullYear() + "-" + (i + 1) + "-01"),
            dateFNS.parseISO(date.getFullYear() + "-" + i + "-01")
        )
        businessCalendar.push({
            i,
            res
        })
    }

    res = dateFNS.differenceInBusinessDays(
        dateFNS.parseISO((date.getFullYear() + 1) + "-0" + 1 + "-01"),
        dateFNS.parseISO(date.getFullYear() + "-" + 12 + "-01")
    )
    businessCalendar.push({
        i: 12,
        res
    })

    return businessCalendar
}

function checkDayOff() {
    for (let i = 0; i < dayOff.length; i++) {
        if (!dateFNS.isWeekend(dayOff[i])) activeDayOff.push(dayOff[i])
    }
    return activeDayOff
}

function getBusinessCalendar() {
    let calendar = businessDays()
    let activeDayOff = checkDayOff()

    activeDayOff.forEach(element => {
        calendar[dateFNS.getMonth(element)].res = calendar[dateFNS.getMonth(element)].res - 1
    })
    return calendar
}

module.exports = {
    getBusinessCalendar
}