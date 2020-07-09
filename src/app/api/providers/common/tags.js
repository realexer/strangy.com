const TagKind = {
	info: 'info',
	interest: 'interest',
	location: 'location',
	// AGE: 'AGE',
	other: 'other'
};

const isTagKindSupported = (kind) =>
{
	return Object.keys(TagKind).includes(kind);
};

const TagKindLabels =
{
	[TagKind.info]: 'Info',
	[TagKind.interest]: 'Interest',
	[TagKind.location]: 'Location',
	// [TagKind.AGE]: 'Age',
	[TagKind.other]: 'Other',
};
export {TagKindLabels, TagKind, isTagKindSupported};