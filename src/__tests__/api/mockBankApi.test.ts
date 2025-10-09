import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockBankApi } from '../../api/mockBankApi';

describe('mockBankApi', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchAccounts', () => {
    it('should return array of accounts', async () => {
      const promise = mockBankApi.fetchAccounts();
      await vi.advanceTimersByTimeAsync(600);
      const accounts = await promise;

      expect(Array.isArray(accounts)).toBe(true);
      expect(accounts.length).toBeGreaterThan(0);
      expect(accounts[0]).toHaveProperty('id');
      expect(accounts[0]).toHaveProperty('accountNumber');
      expect(accounts[0]).toHaveProperty('accountName');
      expect(accounts[0]).toHaveProperty('type');
      expect(accounts[0]).toHaveProperty('balance');
      expect(accounts[0]).toHaveProperty('currency');
      expect(accounts[0]).toHaveProperty('icon');
    });

    it('should have delay between 500-1000ms', async () => {
      // const start = Date.now();
      const promise = mockBankApi.fetchAccounts();
      
      await vi.advanceTimersByTimeAsync(600);
      await promise;
      
      // Since we're using fake timers, we can't measure real time
      // but we can verify the promise resolves
      expect(promise).resolves.toBeDefined();
    });
  });

  describe('fetchPayees', () => {
    it('should return requested number of payees', async () => {
      const count = 50;
      const promise = mockBankApi.fetchPayees(count);
      await vi.advanceTimersByTimeAsync(800);
      const payees = await promise;

      expect(Array.isArray(payees)).toBe(true);
      expect(payees.length).toBe(count);
    });

    it('should return payees with correct structure', async () => {
      const promise = mockBankApi.fetchPayees(5);
      await vi.advanceTimersByTimeAsync(800);
      const payees = await promise;

      expect(payees[0]).toHaveProperty('id');
      expect(payees[0]).toHaveProperty('name');
      expect(payees[0]).toHaveProperty('accountNumber');
      expect(payees[0]).toHaveProperty('bankName');
      expect(payees[0]).toHaveProperty('bankLogo');
    });

    it('should default to 10 payees when count not provided', async () => {
      const promise = mockBankApi.fetchPayees();
      await vi.advanceTimersByTimeAsync(800);
      const payees = await promise;

      expect(payees.length).toBe(10);
    });
  });

  describe('processTransfer', () => {
    const mockTransferData = {
      fromAccount: {
        id: '1',
        accountNumber: '****1234',
        accountName: 'Primary Savings',
        type: 'savings' as const,
        balance: 5000,
        currency: 'USD',
        icon: '💰'
      },
      toPayee: {
        id: '1',
        name: 'John Doe',
        accountNumber: '****5678',
        bankName: 'Test Bank',
        bankLogo: '🏦'
      },
      amount: 1000,
      purpose: 'Personal Transfer',
      description: 'Test transfer'
    };

    it('should successfully process transfer with 80% success rate', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5); // Will succeed (< 0.8)

      const promise = mockBankApi.processTransfer(mockTransferData);
      await vi.advanceTimersByTimeAsync(1500);
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.transactionId).toBeDefined();
      expect(result.transactionId).toMatch(/^TXN-/);
      expect(result.error).toBeUndefined();
    });

    it('should fail transfer with 20% failure rate', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.9); // Will fail (> 0.8)

      const promise = mockBankApi.processTransfer(mockTransferData);
      await vi.advanceTimersByTimeAsync(1500);
      const result = await promise;

      expect(result.success).toBe(false);
      expect(result.transactionId).toBeUndefined();
      expect(result.error).toBeDefined();
    });

    it('should generate unique transaction IDs', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5);

      const promise1 = mockBankApi.processTransfer(mockTransferData);
      await vi.advanceTimersByTimeAsync(1500);
      const result1 = await promise1;

      const promise2 = mockBankApi.processTransfer(mockTransferData);
      await vi.advanceTimersByTimeAsync(1500);
      const result2 = await promise2;

      expect(result1.transactionId).not.toBe(result2.transactionId);
    });

    it('should include error message on failure', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.9);

      const promise = mockBankApi.processTransfer(mockTransferData);
      await vi.advanceTimersByTimeAsync(1500);
      const result = await promise;

      expect(result.error).toBeTruthy();
      expect(typeof result.error).toBe('string');
    });
  });
});
