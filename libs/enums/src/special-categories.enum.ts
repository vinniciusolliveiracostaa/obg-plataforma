

export const SpecialCategoriesEnum = {
  INDIGENOUS: 'INDIGENOUS',
  RIVERSIDECOMUNITIES: 'RIVERSIDECOMUNITIES',
  BLACKPOPULATION: 'BLACKPOPULATION',
  QUILOMBOLA: 'QUILOMBOLA',
  PCD: 'PCD',
  OTHERTRADITIONALCOMMUNITIES: 'OTHERTRADITIONALCOMMUNITIES'
};

export type SpecialCategoriesType = (typeof SpecialCategoriesEnum)[keyof typeof SpecialCategoriesEnum]