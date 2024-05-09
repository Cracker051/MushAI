export function isDateBeforeTodayForOneWeek(dateString) {
	const today = new Date();

	const oneWeekAgo = new Date(today);
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	const inputDate = new Date(dateString);

	if (inputDate < today && inputDate >= oneWeekAgo) {
		return true;
	} else {
		return false;
	}
}
