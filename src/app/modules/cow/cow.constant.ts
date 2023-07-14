// default names of location
export const location: string[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

// default names for breed
export const breed: string[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

// category if the cow gives milk, meat or both
export const category: string[] = ['Dairy', 'Beef', 'DualPurpose'];

// status of the cow
export const label: string[] = ['for sale', 'sold out'];

// for searching assistance
export const cowSearchableFields: string[] = [
  'name',
  'location',
  'category',
  'breed',
];

// for filteration assistance
export const cowFilterableField: string[] = [
  'searchTerm',
  'name',
  'price',
  'minPrice',
  'maxPrice',
  'location',
  'category',
  'breed',
  'seller',
];
