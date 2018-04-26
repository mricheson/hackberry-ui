import React from 'react';
import EmployeeName from './EmployeeName'
import ClockInTime from './ClockInTime'


function rowStyle(employee, jobCodes) {
    return '';
}

export default ({ employee, jobCodes }) => (
    <tr key={employee.user.id + employee.clockInTime} className={rowStyle(employee, jobCodes)}>
        <td><EmployeeName lastName={employee.user.last_name} firstName={employee.user.first_name} /></td>
        <td><ClockInTime time={employee.clockInTime} /></td>
        <td>
            {employee.exceptions ? employee.exceptions.map(e => (<div key={e.id}>
                <div>{jobCodes[e.jobcode_id].name}{e.start ? `@${new Date(e.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}{e.notes ? ` : ${e.notes}` : ''}</div>
            </div>)) : ""}
        </td>

    </tr>
);