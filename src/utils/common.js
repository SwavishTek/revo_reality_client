import moment from "moment";


export const dateFormate = (date, format = "DD/MM/YYYY") => {
    let a = !!date ? moment(date).format(format) : 'N/A';
    return a;
}