
const YEAR = 'year';
const MONTH = 'month';
const DAY = 'day';
const HOUR = 'hour';
const MINUTE = 'minute';
const SECOND = 'second';
const MILLISECOND = 'millisecond';

const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

var date_utils = {
    parse(date, date_separator = '-', time_separator = /[.:]/) {
        if (date instanceof Date) {
            return date;
        }
        if (typeof date === 'string') {
            let date_parts, time_parts;
            const parts = date.split(' ');

            date_parts = parts[0]
                .split(date_separator)
                .map(val => parseInt(val, 10));
            time_parts = parts[1] && parts[1].split(time_separator);

            // month is 0 indexed
            date_parts[1] = date_parts[1] - 1;

            let vals = date_parts;

            if (time_parts && time_parts.length) {
                if (time_parts.length == 4) {
                    time_parts[3] = '0.' + time_parts[3];
                    time_parts[3] = parseFloat(time_parts[3]) * 1000;
                }
                vals = vals.concat(time_parts);
            }

            return new Date(...vals);
        }
    },

    to_string(date, with_time = false) {
        if (!(date instanceof Date)) {
            throw new TypeError('Invalid argument type');
        }
        const vals = this.get_date_values(date).map((val, i) => {
            if (i === 1) {
                // add 1 for month
                val = val + 1;
            }

            if (i === 6) {
                return padStart(val + '', 3, '0');
            }

            return padStart(val + '', 2, '0');
        });
        const date_string = `${vals[0]}-${vals[1]}-${vals[2]}`;
        const time_string = `${vals[3]}:${vals[4]}:${vals[5]}.${vals[6]}`;

        return date_string + (with_time ? ' ' + time_string : '');
    },

    format(date, format_string = 'YYYY-MM-DD HH:mm:ss.SSS') {
        const values = this.get_date_values(date).map(d => padStart(d, 2, 0));
        const format_map = {
            YYYY: values[0],
            MM: padStart(+values[1] + 1, 2, 0),
            DD: values[2],
            HH: values[3],
            mm: values[4],
            ss: values[5],
            SSS:values[6],
            D: values[2],
            MMMM: month_names[+values[1]],
            MMM: month_names[+values[1]]
        };

        let str = format_string;
        const formatted_values = [];

        Object.keys(format_map)
            .sort((a, b) => b.length - a.length) // big string first
            .forEach(key => {
                if (str.includes(key)) {
                    str = str.replace(key, `$${formatted_values.length}`);
                    formatted_values.push(format_map[key]);
                }
            });

        formatted_values.forEach((value, i) => {
            str = str.replace(`$${i}`, value);
        });

        return str;
    },

    diff(date_a, date_b, scale = DAY) {
        let milliseconds, seconds, hours, minutes, days, months, years;

        milliseconds = date_a - date_b;
        seconds = milliseconds / 1000;
        minutes = seconds / 60;
        hours = minutes / 60;
        days = hours / 24;
        months = days / 30;
        years = months / 12;

        if (!scale.endsWith('s')) {
            scale += 's';
        }

        return Math.floor(
            {
                milliseconds,
                seconds,
                minutes,
                hours,
                days,
                months,
                years
            }[scale]
        );
    },

    today() {
        const vals = this.get_date_values(new Date()).slice(0, 3);
        return new Date(...vals);
    },

    now() {
        return new Date();
    },

    add(date, qty, scale) {
        qty = parseInt(qty, 10);
        const vals = [
            date.getFullYear() + (scale === YEAR ? qty : 0),
            date.getMonth() + (scale === MONTH ? qty : 0),
            date.getDate() + (scale === DAY ? qty : 0),
            date.getHours() + (scale === HOUR ? qty : 0),
            date.getMinutes() + (scale === MINUTE ? qty : 0),
            date.getSeconds() + (scale === SECOND ? qty : 0),
            date.getMilliseconds() + (scale === MILLISECOND ? qty : 0)
        ];
        return new Date(...vals);
    },

    start_of(date, scale) {
        const scores = {
            [YEAR]: 6,
            [MONTH]: 5,
            [DAY]: 4,
            [HOUR]: 3,
            [MINUTE]: 2,
            [SECOND]: 1,
            [MILLISECOND]: 0
        };

        function should_reset(_scale) {
            const max_score = scores[scale];
            return scores[_scale] <= max_score;
        }

        const vals = [
            date.getFullYear(),
            should_reset(YEAR) ? 0 : date.getMonth(),
            should_reset(MONTH) ? 1 : date.getDate(),
            should_reset(DAY) ? 0 : date.getHours(),
            should_reset(HOUR) ? 0 : date.getMinutes(),
            should_reset(MINUTE) ? 0 : date.getSeconds(),
            should_reset(SECOND) ? 0 : date.getMilliseconds()
        ];

        return new Date(...vals);
    },

    clone(date) {
        return new Date(...this.get_date_values(date));
    },

    get_date_values(date) {
        return [
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ];
    },

    get_days_in_month(date) {
        const no_of_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        const month = date.getMonth();

        if (month !== 1) {
            return no_of_days[month];
        }

        // Feb
        const year = date.getFullYear();
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return 29;
        }
        return 28;
    }
};


function makeArray(w, h, val) {
    var arr = [];
    for(i = 0; i < h; i++) {
        arr[i] = [];
        for(j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
function padStart(str, targetLength, padString) {
    str = str + '';
    targetLength = targetLength >> 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (str.length > targetLength) {
        return String(str);
    } else {
        targetLength = targetLength - str.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(str);
    }
}


function arrangeTask(tasks,ifSlack) {
    var id_map=[];
    var e=makeArray(tasks.length,tasks.length,0);
    //get id map
    for(let i=0;i<tasks.length;i++)
        if (typeof tasks[i].id === 'string' || !tasks[i].id) {
        let dd=[];
        if (tasks[i].id) {
            dd = tasks[i].id
                .split(',')
                .map(d => d.trim())
                .filter(d => d);
        }
        id_map[parseInt(dd[0][5])]=i;
    }

    //dependencies
    for(let task of tasks)
            if (typeof task.dependencies === 'string' || !task.dependencies) {
            let deps = [];
            if (task.dependencies) {
                deps = task.dependencies
                    .split(',')
                    .map(d => d.trim())
                    .filter(d => d);
            }
            task.dependencies = deps;
        }
    for(let i=0;i<tasks.length;i++)
    {

        for(let d of tasks[i].dependencies)
        {
            let idx = parseInt(d[5], 10);
            e[i][id_map[idx]]=1;
        }
    }
    //duration
    for(let i =0;i<tasks.length;i++)
    {
        tasks[i].duration = date_utils.diff(date_utils.parse(tasks[i].end), date_utils.parse(tasks[i].start), 'hour');
    }

    for(let i=0;i<tasks.length;i++)
    {
        for(let j=0;j<tasks.length;j++)
        {
            if(e[i][j]==1) {
                if (Date.parse(tasks[i].start) < Date.parse(tasks[j].end)) {
                     let duration = date_utils.diff(date_utils.parse(tasks[j].start), date_utils.parse(tasks[j].end), 'hour');
                    tasks[j].end = date_utils.to_string(date_utils.add(date_utils.parse(tasks[i].start), -1, 'hour'));
                    tasks[j].start  = date_utils.to_string(date_utils.add(date_utils.parse(tasks[j].end), duration, 'hour'));
                                    i=0,j=0;
                }
            }
        }
    }
    //longest path
    let S = [],L=[], e_tmp = [];
    for(let i = 0; i < tasks.length; i++) {
        e_tmp[i] = [];
        for(let j = 0; j < tasks.length; j++) {
            e_tmp[i][j] = e[i][j];
        }
    }
    for(let i=0;i<tasks.length;i++)
    {
            let is_empty = true;
            for(let j=0;j<tasks.length;j++)
                if(e_tmp[j][i] == 1)
                {
                    is_empty = false;
                    break;
                }
            if(is_empty)
                S.push(i);

    }
    while(S.length>=1)
    {
        let n = S.pop();
        L.push(tasks[n]);
        for(let i=0; i<tasks.length;i++ )
        {
            if(e_tmp[n][i]==1)
            {
                e_tmp[n][i]=0;
                let is_empty =true;
                for(let j=0;j<tasks.length;j++)
                    if(e_tmp[j][i]==1)
                    {
                        is_empty = false;
                        break;
                    }
                if(is_empty)
                    S.push(i);
            }
        }
    }
    //remap!!!!!!!!!!!!!


        for(let i=0;i<tasks.length;i++)
        if (typeof L[i].id === 'string' || !L[i].id) {
        let dd=[];
        if (L[i].id) {
            dd = L[i].id
                .split(',')
                .map(d => d.trim())
                .filter(d => d);
        }
        id_map[parseInt(dd[0][5])]=i;
    }

    //remap dependencies!!!

    var e=makeArray(tasks.length,tasks.length,0);
    for(let i=0;i<tasks.length;i++)
    {

        for(let d of L[i].dependencies)
        {
            let idx = parseInt(d[5], 10);
            e[i][id_map[idx]]=1;
        }
    }

    var node_late = [], maxl;
    for(let i =0;i<tasks.length;i++)
    {
        node_late[i] = L[i].duration;
    }
    for(let i =0;i<tasks.length;i++)
    {
        var subtask = [];
        for(let j=0; j<tasks.length;j++)
            if(e[j][i] == 1)
            {
                subtask.push(j);
            }
        var max_sub;
        if(subtask.length!=0)
            max_sub = node_late[subtask[0]];
        for(let j=0;j<subtask.length;j++)
            if(node_late[subtask[j]]>max_sub) max_sub=node_late[subtask[j]];
        if(subtask.length!=0) {
            node_late[i] = node_late[i] + max_sub+24;
        }
    }
    maxl =L[0].duration;
    for(let i =0;i<tasks.length;i++)
        if(node_late[i]>maxl)
            maxl = node_late[i];
    var node_early =[];
    for(let i =0;i<tasks.length;i++)
    {
        node_early[i] = L[i].duration;
    }
    for(let i =tasks.length-1;i>=0;i--)
    {
        var subtask = [];
        for(let j=0; j<tasks.length;j++)
            if(e[i][j] == 1)
            {
                subtask.push(j);
            }
        var max_sub;
        if(subtask.length!=0)
            max_sub = node_early[subtask[0]];
        for(let j=0;j<subtask.length;j++)
            if(node_early[subtask[j]]>max_sub) max_sub=node_early[subtask[j]];
        if(subtask.length!=0){
            node_early[i]=node_early[i]+max_sub+24;
        }
    }
    var ddl = date_utils.now()// todo
    var early = [], late= [],slack=[];
    for(let i=0;i<tasks.length;i++)
    {
        late[i] = date_utils.add(ddl, -1*node_late[i], 'hour');
        early[i] = date_utils.add(ddl, -1*(maxl - node_early[i]+L[i].duration),'hour');
        slack = early[i];
        if(ifSlack)
            slack = date_utils.add(early[i], date_utils.diff(late[i], early[i])/2*24, 'hour');
        L[i].start = slack;
        // console.log(L[i].name);
        // console.log(date_utils.diff(late[i], early[i])/2/24*24);
        // console.log(late[i]);
        L[i].end = date_utils.add(L[i].start,L[i].duration, 'hour');
        // console.log(L[i].end);
        L[i].start = date_utils.to_string(L[i].start);
        L[i].end = date_utils.to_string(L[i].end);

    }
    L.sort(function(a, b){return (Date.parse(a.start) === Date.parse(b.start)?a.name[0] < b.name[0]:Date.parse(a.start) > Date.parse(b.start))});
    return L;
}