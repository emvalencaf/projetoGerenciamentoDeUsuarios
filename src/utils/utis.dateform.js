export class Utils{

    static dateFormat(date){

        if(!date instanceof Date) date = Date.parse(date)

        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
    }
}