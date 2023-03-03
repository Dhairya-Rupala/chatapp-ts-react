export function getMessageCreationDetails() {
    const date = new Date();
    
    const hours = date.getHours() % 12 || 12
    const minutes = date.getMinutes()
    const meridiem = date.getHours()>=12?"PM":"AM"
    const timestamp = hours + ":" + minutes + " " + meridiem
    
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear()
    const creationDate = day + "/" + month + "/" + year;
    return {timestamp,creationDate}
}