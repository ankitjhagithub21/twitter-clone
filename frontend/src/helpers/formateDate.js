import { formatDistanceToNow } from 'date-fns';

const formatDate = (date) => {
    let result = formatDistanceToNow(new Date(date), { addSuffix: true });
   
   return result
}

export default formatDate;
