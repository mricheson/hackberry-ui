import React from 'react';

function isEarlyPunch(start) {
    let punchInHour = new Date(start).getHours();
    return (punchInHour < 5 && punchInHour > 0) ? 'earlyPunch' : null;
}

export default ({ time }) => (
    <div>
        {time
            ?
            <div className={isEarlyPunch(time)}>
                {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            :
            <div>Absent</div>}
    </div>
);