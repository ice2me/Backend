export const compareArrays = (array1, array2) => {
	array1 = array1.sort()
	array2 = array2.sort()
	return (
		array1.length === array2.length &&
		array1.every((value, index) => value === array2[index])
	);
}
