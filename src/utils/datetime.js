export const nowdate = new Date();
export const year = nowdate.getFullYear();
export const month = nowdate.getMonth()+1;
export const LengthMonth = (month.toString().length < 2 ? '0'+ month : month);
export const date = nowdate.getDate();
export const LengthDate = (date.toString().length < 2 ? '0'+ date : date);
export const hours = nowdate.getHours();
export const LenghtHours = (hours.toString().length < 2 ? '0'+ hours : hours);
export const min = nowdate.getMinutes();
export const LengthMin = (min.toString().length < 2 ? '0'+ min : min);
export const sec = nowdate.getSeconds();
export const LengthSec = (sec.toString().length < 2 ? '0'+ sec : sec);
export const day = nowdate.getDay();
export const day_text = () => {
    if (day === 0) {
        return '일'
    } else if (day === 1) {
        return '월'
    } else if (day === 2) {
        return '화'
    } else if (day === 3) {
        return '수'
    } else if (day === 4) {
        return '목'
    } else if (day === 5) {
        return '금'
    } else if (day === 6) {
        return '토'
    }
};