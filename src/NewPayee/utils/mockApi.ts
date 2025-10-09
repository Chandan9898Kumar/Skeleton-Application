export interface Payee {
  id: string;
  name: string;
  bank: string;
  account: string;
  type: 'bank' | 'mobile' | 'cpr';
}

const mockPayees: Payee[] = [
  {
    id: '1',
    name: 'Jawed Habib',
    bank: 'National Bank of Bahrain',
    account: 'BH46J87635543326547443',
    type: 'bank',
  },
  {
    id: '2',
    name: 'Hassan Al Noaimi',
    bank: 'Ahli United Bank',
    account: 'BH46J87635543326547333',
    type: 'bank',
  },
  {
    id: '3',
    name: 'Ahmed Al Zayani',
    bank: 'Bank of Bahrain and Kuwait',
    account: 'BH46J87635543326547111',
    type: 'bank',
  },
  {
    id: '4',
    name: 'Fatima Ali',
    bank: 'Gulf International Bank',
    account: 'BH46J87635543326547444',
    type: 'bank',
  },
  {
    id: '5',
    name: 'Fatima Ali',
    bank: 'Mobile',
    account: '+973 39123456',
    type: 'mobile',
  },
  {
    id: '6',
    name: 'Fatima Ali',
    bank: 'CPR',
    account: '787626198',
    type: 'cpr',
  },
  {
    id: '7',
    name: 'Fatima Ali',
    bank: 'Standard Chartered Bank',
    account: 'C-91044048',
    type: 'bank',
  },
  {
    id: '8',
    name: 'Hassan Al',
    bank: 'BBK - Retail Banking',
    account: 'Bonds 959498384889287633',
    type: 'bank',
  },
  {
    id: '9',
    name: 'Mohammed Ahmed',
    bank: 'Bahrain Islamic Bank',
    account: 'BH46J87635543326547888',
    type: 'bank',
  },
  {
    id: '10',
    name: 'Sara Abdullah',
    bank: 'Ithmaar Bank',
    account: 'BH46J87635543326547999',
    type: 'bank',
  },
  {
    id: '11',
    name: 'Khalid Hassan',
    bank: 'Al Salam Bank',
    account: 'BH46J87635543326547777',
    type: 'bank',
  },
  {
    id: '12',
    name: 'Mariam Ali',
    bank: 'Mobile',
    account: '+973 36547890',
    type: 'mobile',
  },
  {
    id: '13',
    name: 'Yousif Ahmed',
    bank: 'National Bank of Bahrain',
    account: 'BH46J87635543326547222',
    type: 'bank',
  },
  {
    id: '14',
    name: 'Noor Mohammed',
    bank: 'CPR',
    account: '901234567',
    type: 'cpr',
  },
  {
    id: '15',
    name: 'Ali Hassan',
    bank: 'HSBC Bank Middle East',
    account: 'BH46J87635543326547555',
    type: 'bank',
  },
];

export const mockFetchPayees = (): Promise<Payee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPayees);
    }, 1500); // Simulate API delay
  });
};
