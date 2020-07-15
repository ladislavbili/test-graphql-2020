import moment from 'moment';

export const afterNow = (unix) => {
	return unix > moment().unix()
}

export const toSelArr = (arr,index = 'title')=> arr.map((item)=>{return {...item,value:item.id,label:item[index]}})
