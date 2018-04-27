import React from 'react';

function styleTime(attendanceCodes) {
    if(attendanceCodes.includes('LATE'))
        return 'table-danger';

        if(attendanceCodes.includes('EARLY'))
        return 'table-success';

        return '';

}

function timeTip(codes){
    if(codes)
        return codes;
}

export default ({ time, codes }) => (
    <div>
        {time
            ?
            <div className={styleTime(codes)} data-tip={timeTip(codes)}>
                {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            :
            <div>Absent</div>}
    </div>
);