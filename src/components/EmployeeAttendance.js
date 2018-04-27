import React from 'react';
import EmployeeName from './EmployeeName';
import ClockInTime from './ClockInTime';
import _ from 'lodash';

function rowStyle(attendanceCodes) {
    console.log(attendanceCodes)

    if (attendanceCodes.includes('ABSENT')) {
        if (attendanceCodes.includes('VACATION') || attendanceCodes.includes('PERSONAL_DAY_APPROVED')) {
            return 'table-warning';
        }

        if (attendanceCodes.includes('SICK')) {
            return 'table-danger';
        }

        if (attendanceCodes.includes('CALLED_IN')) {
            return 'table-danger';
        }

        return 'bg-danger';
    }
}

function rowToolTip(attendanceCodes) {
    if (attendanceCodes.includes('ABSENT')) {
       return `${attendanceCodes}`;
    }
}

class EmployeeAttendance extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        let employee = this.props.employee;
        let jobCodes = this.props.jobCodes;

        return (
            <tr key={employee.user.id + employee.clockInTime} className={rowStyle(employee.attendanceCodes)} data-tip={rowToolTip(employee.attendanceCodes)}>
                <td className='py-0'><EmployeeName lastName={employee.user.last_name} firstName={employee.user.first_name} /></td>
                <td className='py-0 text-right'><ClockInTime time={employee.clockInTime} codes={employee.attendanceCodes} /></td>
                <td className='py-0'>
                    {employee.exceptions ? employee.exceptions.map(e => (<div key={e.id}>
                        <div>{jobCodes[e.jobcode_id].name}{e.start ? `@${new Date(e.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}{e.notes ? ` : ${e.notes}` : ''}</div>
                    </div>)) : ""}
                </td >
            </tr>
        )
    }
}

export default EmployeeAttendance;