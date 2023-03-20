// export const compareDate = (todayDate, endDateSubscription) => {
// 	let returnDateBoolean = true
// 	const todayDateArr = todayDate.split('/')
// 	let todayDateYear = 0
// 	let todayDateMonth = 0
// 	let todayDateDay = 0
//
// 	const endDateSubscriptionArr = endDateSubscription.split('/')
// 	let endDateSubscriptionYear = 0
// 	let endDateSubscriptionMonth = 0
// 	let endDateSubscriptionDay = 0
//
// 	todayDateYear = Number((todayDateArr[2]))
// 	todayDateMonth = Number((todayDateArr[1]))
// 	todayDateDay = Number((todayDateArr[0]))
//
// 	endDateSubscriptionYear = Number((endDateSubscriptionArr[2]))
// 	endDateSubscriptionMonth = Number((endDateSubscriptionArr[1]))
// 	endDateSubscriptionDay = Number((endDateSubscriptionArr[0]))
//
// 	if (todayDateDay === endDateSubscriptionDay) {
// 		return false
// 	}
// 	return returnDateBoolean
// }