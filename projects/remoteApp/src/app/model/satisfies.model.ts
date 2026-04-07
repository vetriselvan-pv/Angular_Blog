export type DetailsKey = 'name' | 'phone' | 'age';

export type Details = Record<DetailsKey, string | number>;

const personalDetails: Details = {
  name: 'vetriselvan',
  age: 29,
  phone: '9876543210',
};

console.log(personalDetails.age);

const statisfiedPersonalData = {
  name: 'vetriselvan',
  age: 29,
  phone: '9876543210',
} satisfies Details;

console.log(statisfiedPersonalData.age.toLocaleString());
