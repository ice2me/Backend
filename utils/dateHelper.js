export const dateStr = (date, num) => {
	const day = new Date(date);
	const mmStr = String(new Date(day).getMonth() + num).padStart(2, "0")
	const dd = String(new Date(day).getDate()).padStart(2, "0")
	const yyyy = String(new Date(day).getFullYear())

	return `${dd}/${mmStr}/${yyyy}`
}