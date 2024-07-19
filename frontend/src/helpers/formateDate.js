import { formatDistanceToNowStrict } from 'date-fns';

const formatDate = (date) => {
    let result = formatDistanceToNowStrict(new Date(date), { addSuffix: true });
    return result;
};

export default formatDate;
