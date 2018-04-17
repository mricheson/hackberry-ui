import React from 'react'

function getMinutesLate(date) {
    if(!date)
    return null;
    

    let startTime = new Date(date);
     date = new Date(date);
    startTime.setHours(7);
    startTime.setMinutes(30);
    startTime.setSeconds(0);
    startTime.setMilliseconds(0);

    return (date - startTime) / (60 * 1000);
}

function interpretMinutesLate(late) {
    if (!late)
        return 'Absent'

    if (late <= 0)
        return

    return late;
}

export default ({ value }) =>
    (
        <table>
            <thead>
                <tr>
                    <th>Employee</th>
                    <th>Start Time</th>
                    <th>Lateness</th>
                </tr>
            </thead>
            <tbody>
                {value.map(employee => (
                    <tr>
                        <td>{employee.user.last_name}, {employee.user.first_name}</td>
                        <td>{employee.clockInTime ? new Date(employee.clockInTime).toLocaleTimeString() : ''}</td>
                        <td>
                            {interpretMinutesLate(getMinutesLate(employee.clockInTime))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );