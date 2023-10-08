export const organizeSearchAndFilter = <T extends Record<string, unknown>>(
  searchAndFilter: T,
  searchableFields: string[],
  filterableFields: string[]
) => {
  const { search, ...filters } = searchAndFilter;
  filterableFields.pop();

  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: searchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filters).length) {
    andConditions.push({
      AND: Object.keys(filters).map((field) => ({
        [field]: {
          equals: searchAndFilter[field],
        },
      })),
    });
  }
  return andConditions.length ? { AND: andConditions } : {};
};
