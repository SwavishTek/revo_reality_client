import moment from "moment";


export const dateFormate = (date) => {
    let a = moment(date).format("DD/MM/YYYY");
    return a;
}