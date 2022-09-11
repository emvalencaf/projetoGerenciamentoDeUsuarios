export class Utils{

    static dateFormat(date){
        console.log(date)
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
    }
}