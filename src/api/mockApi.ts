// Mock API for bank account data

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  category: string;
}

export interface AccountData {
  accountNumber: string;
  balance: number;
  accountHolder: string;
  currency: string;
}

// Generate mock transactions
const generateMockTransactions = (count: number): Transaction[] => {
  const descriptions = [
    'Salary Deposit',
    'Grocery Store',
    'Online Shopping',
    'Restaurant',
    'Utility Bill',
    'Gas Station',
    'ATM Withdrawal',
    'Transfer from John Doe',
    'Subscription Payment',
    'Insurance Premium',
    'Coffee Shop',
    'Rent Payment',
    'Mobile Recharge',
    'Transfer to Jane Smith',
    'Medical Services',
    'Gym Membership',
    'Book Store',
    'Movie Tickets',
    'Freelance Income',
    'Refund'
  ];

  const categories = [
    'Income',
    'Food & Dining',
    'Shopping',
    'Bills & Utilities',
    'Transportation',
    'Healthcare',
    'Entertainment',
    'Transfer'
  ];

  const transactions: Transaction[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const isCredit = Math.random() > 0.6;
    const date = new Date(now.getTime() - i * 86400000 * Math.random() * 3);
    
    transactions.push({
      id: `TXN${String(i + 1).padStart(6, '0')}`,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      amount: parseFloat((Math.random() * 5000 + 10).toFixed(2)),
      type: isCredit ? 'credit' : 'debit',
      date: date.toISOString(),
      category: categories[Math.floor(Math.random() * categories.length)]
    });
  }

  return transactions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
export const mockApi = {
  async fetchAccountData(): Promise<AccountData> {
    await delay(300); // Simulate fast cached response
    
    return {
      accountNumber: '****-****-****-4782',
      balance: 45678.90,
      accountHolder: 'Alex Johnson',
      currency: 'USD'
    };
  },

  async fetchTransactions(limit: number = 100): Promise<Transaction[]> {
    await delay(500); // Simulate network delay
    
    return generateMockTransactions(limit);
  }
};

export default mockApi;
