/**
 * @param {Date} date 
 */
export default function parseYear(date){
    // Year can be FY, SY or TY
    // FY begins after May of the joining year

    const year = date.getFullYear();
    const month = date.getMonth();

    const yearDiff = year - Date.now().getFullYear();
    if( month < 4){
        yearDiff--;
    }

    switch( yearDiff ){
        case 1:
            return "FY";
        case 2:
            return "SY";
        case 3: 
            return "TY";
        default:
            return null;
    }
}