// Mock API for bank accounts and payees

export interface BankAccount {
  id: string;
  type: 'savings' | 'credit' | 'esaver' | 'credit-card' | 'current';
  accountName: string;
  accountNumber: string;
  balance: number;
  currency: string;
  icon: string;
}

export interface Payee {
  id: string;
  name: string;
  bankName: string;
  accountNumber: string;
  bankLogo: string;
}

// Generate mock bank accounts
const generateMockAccounts = (): BankAccount[] => {
  return [
    {
      id: 'ACC001',
      type: 'savings',
      accountName: 'Premium Savings',
      accountNumber: '****-****-****-4782',
      balance: 45678.90,
      currency: 'USD',
      icon: '💰'
    },
    {
      id: 'ACC002',
      type: 'current',
      accountName: 'Current Account',
      accountNumber: '****-****-****-3421',
      balance: 12890.50,
      currency: 'USD',
      icon: '🏦'
    },
    {
      id: 'ACC003',
      type: 'credit-card',
      accountName: 'Platinum Credit Card',
      accountNumber: '****-****-****-7856',
      balance: 8500.00,
      currency: 'USD',
      icon: '💳'
    },
    {
      id: 'ACC004',
      type: 'esaver',
      accountName: 'E-Saver Account',
      accountNumber: '****-****-****-9102',
      balance: 67234.75,
      currency: 'USD',
      icon: '📈'
    },
    {
      id: 'ACC005',
      type: 'credit',
      accountName: 'Personal Loan',
      accountNumber: '****-****-****-5643',
      balance: -15000.00,
      currency: 'USD',
      icon: '💵'
    }
  ];
};

// Generate mock payees
const generateMockPayees = (count: number): Payee[] => {
  const payees: Payee[] = [
    {
      id: 'PAY001',
      name: 'John Anderson',
      bankName: 'Chase Bank',
      accountNumber: '****-****-****-1234',
      bankLogo: '🏦'
    },
    {
      id: 'PAY002',
      name: 'Sarah Williams',
      bankName: 'Bank of America',
      accountNumber: '****-****-****-5678',
      bankLogo: '🏛️'
    },
    {
      id: 'PAY003',
      name: 'Michael Brown',
      bankName: 'Wells Fargo',
      accountNumber: '****-****-****-9012',
      bankLogo: '🏢'
    },
    {
      id: 'PAY004',
      name: 'Emily Davis',
      bankName: 'Citibank',
      accountNumber: '****-****-****-3456',
      bankLogo: '🏦'
    },
    {
      id: 'PAY005',
      name: 'David Miller',
      bankName: 'US Bank',
      accountNumber: '****-****-****-7890',
      bankLogo: '🏛️'
    },
    {
      id: 'PAY006',
      name: 'Jennifer Wilson',
      bankName: 'PNC Bank',
      accountNumber: '****-****-****-2345',
      bankLogo: '🏢'
    },
    {
      id: 'PAY007',
      name: 'Robert Taylor',
      bankName: 'Capital One',
      accountNumber: '****-****-****-6789',
      bankLogo: '🏦'
    },
    {
      id: 'PAY008',
      name: 'Jessica Martinez',
      bankName: 'TD Bank',
      accountNumber: '****-****-****-0123',
      bankLogo: '🏛️'
    }
  ];

  // Generate more if needed
  const result = [...payees];
  for (let i = payees.length; i < count; i++) {
    result.push({
      id: `PAY${String(i + 1).padStart(3, '0')}`,
      name: `Payee ${i + 1}`,
      bankName: `Bank ${Math.floor(Math.random() * 5) + 1}`,
      accountNumber: `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`,
      bankLogo: ['🏦', '🏛️', '🏢'][Math.floor(Math.random() * 3)]
    });
  }

  return result;
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API endpoints
export const mockBankApi = {
  async fetchAccounts(): Promise<BankAccount[]> {
    await delay(400);
    return generateMockAccounts();
  },

  async fetchPayees(limit: number = 50): Promise<Payee[]> {
    await delay(500);
    return generateMockPayees(limit);
  },

  async processTransfer(transferData: {
    fromAccount: BankAccount;
    toPayee: Payee;
    amount: number;
    purpose: string;
    description?: string;
  }): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    await delay(1500); // Simulate API processing time
    
    // Simulate 90% success rate
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      return {
        success: true,
        transactionId: `TXN${Date.now()}`
      };
    } else {
      return {
        success: false,
        error: 'Insufficient funds or network error. Please try again.'
      };
    }
  }
};

export default mockBankApi;
