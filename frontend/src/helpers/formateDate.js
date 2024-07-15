import { formatDistanceToNow } from 'date-fns';

const formatDate = (date) => {
    let result = formatDistanceToNow(new Date(date), { addSuffix: true });
   
    if (result.startsWith('about ')) {
        result = result.slice(6); 
    }
    return result;
}

export default formatDate;
