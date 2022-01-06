function execCommandCopy(text: string) {
    const input = document.createElement('input') as HTMLInputElement;
    document.body.appendChild(input);
    input.value = text;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

function numToKMB(num: number) {
    let result: any = num;

    if(num < 1000){
        result = num;
    }
    else if (num >= 1000 && num < 1000000) {
        result = parseInt(String(num / 1000)) + 'K'
    }
    else if (num >= 1000000 && num < 1000000000) {
        result = parseInt(String(num / 1000000)) + 'M'
    }
    else if (num >= 1000000000 && num < 1000000000000) {
        result = parseInt(String(num / 1000000000))+ 'B'
    }
    else if(num >= 1000000000000 ){
        result = parseInt(String(num / 1000000000000))+ 'T'
    }
    return result;
}

export default class StringHelper {
    static msToMinuteSecond(ms: number): string {
        // const hour = Math.floor(ms / 3600000 );
        const hourRest = ms % 3600000;

        const minute = Math.floor(hourRest / 60000);
        const minuteRest = hourRest % 60000;

        const second = Math.floor(minuteRest / 1000);


        return `${StringHelper.leadingZeros(minute, 2)}:${StringHelper.leadingZeros(second, 2)}`;
    }

    static leadingZeros(num: number | string, digits: number): string {
        let zero = '';
        const n: string = num.toString();

        if (n.length < digits) {
            for (let i = 0; i < digits - n.length; i++) {
                zero += '0';
            }
        }
        return zero + n;
    };

    static addComma(num: number): string {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    static replaceAll(str: string, searchStr: string, replaceStr: string): string {

        return str.split(searchStr).join(replaceStr);
    }



}

class UrlHelper {

    static addParameter(url: string, name: string, value: string) {
        if (url.indexOf('?') > -1) {
            return `${url}&${name}=${value}`;
        }
        else {
            return `${url}?${name}=${value}`;
        }
    }

    static getParameterByName(name: string) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search || location.href);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
}
function randomString( count : number = 11 ) {
    let str = Math.random().toString(36).substr(2,11);
    while( str.length < count ) {
        str += Math.random().toString(36).substr(2,11);
    }
    return str.substr( 0, count );
}
export {
    randomString,
    numToKMB,
    execCommandCopy,
    StringHelper,
    UrlHelper,

}