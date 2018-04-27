import React from 'react'
import EmployeeAttendance from './EmployeeAttendance'
import ReactTooltip from 'react-tooltip';

function getMinutesLate(date) {
    if (!date)
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

    return 'Late';
}

export default ({ loading, attendanceReport }) =>
    (
        !loading ? (<div>
            <table className="table table-responsive table-sm table-hover">
                <thead>
                    <tr>
                        <th >Employee</th>
                        <th className="text-right">Start Time</th>
                        <th className="text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceReport.timesheets.map(employee => (<EmployeeAttendance employee={employee} jobCodes={attendanceReport.jobcodes} />))}
                    {/* {attendanceReport.timesheets.map(employee => (
                    <tr key={employee.user.id + employee.clockInTime}>
                        <td>{employee.user.last_name}, {employee.user.first_name}</td>
                        <td className={(new Date(employee.clockInTime).getHours() < 5 && new Date(employee.clockInTime).getHours() > 1) ? 'earlyPunch' : 'normal'}>
                            {employee.clockInTime ? new Date(employee.clockInTime).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'}) : ''}</td>
                        <td>
                            {interpretMinutesLate(getMinutesLate(employee.clockInTime))}
                        </td>
                        <td>
                            {employee.exceptions ? employee.exceptions.map(e => (<div key={e.id}>
                                <div>{attendanceReport.jobcodes[e.jobcode_id].name}{e.start? `@${new Date(e.start).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'})}` : ''}{e.notes ? ` : ${e.notes}` : ''}</div>
                            </div>)) : ""}
                        </td>

                    </tr>
                ))} */}
                </tbody>
            </table>
            <ReactTooltip /></div>)
            :
            <div />
    );