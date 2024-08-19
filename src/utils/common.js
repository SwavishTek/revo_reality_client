import moment from "moment";


export const dateFormate = (date) => {
    let a = !!date ? moment(date).format("DD/MM/YYYY") : 'N/A';
    return a;
}