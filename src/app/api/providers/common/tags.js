const TagKind = {
	INFO: 'INFO',
	INTEREST: 'INTEREST',
	LOCATION: 'LOCATION',
	// AGE: 'AGE',
	OTHER: 'OTHER'
};

const isTagKindSupported = (kind) =>
{
	return Object.keys(TagKind).includes(kind);
};

const TagKindLabels =
{
	[TagKind.INFO]: 'Info',
	[TagKind.INTEREST]: 'Interest',
	[TagKind.LOCATION]: 'Location',
	// [TagKind.AGE]: 'Age',
	[TagKind.OTHER]: 'Other',
};
export {TagKindLabels, TagKind, isTagKindSupported};