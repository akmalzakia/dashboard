export const statusVariantClasses = {
	unresolved: 'border-unresolved text-unresolved',
	resolved: 'border-resolved text-resolved',
	open: 'border-open text-open',
	onHold: 'border-onhold text-onhold',
};

export function formatDate(timestamp: number) {
	const now = Date.now();
	const rel = now - timestamp;

	const secondDifference = Math.floor(rel / 1000);
	const minuteDifference = Math.floor(secondDifference / 60);
	const hourDifference = Math.floor(minuteDifference / 60);
	const dateDifference = Math.floor(hourDifference / 24);
	const monthDifference = Math.floor(dateDifference / 30);
	const yearDifference = Math.floor(monthDifference / 12);
	if (yearDifference) {
		return `${yearDifference > 1 ? yearDifference + 'years' : 'a year'} ago`;
	} else if (monthDifference) {
		return `${
			monthDifference > 1 ? monthDifference + ' months' : 'a month'
		} ago`;
	} else if (dateDifference) {
		return `${
			dateDifference > 1 ? dateDifference + ' days ago' : 'yesterday'
		}`;
	} else if (hourDifference) {
		return `${
			hourDifference > 1 ? `${hourDifference} hours` : 'an hour'
		} ago`;
	} else if (minuteDifference) {
		return `${
			minuteDifference > 1 ? `${minuteDifference} minutes` : 'a minute'
		} ago`;
	} else {
		return 'a few seconds ago';
	}
}
