import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AccountsGrid } from '../../components/AccountsGrid';
import type { BankAccount } from '../../api/mockBankApi';

const screen = {
  getByText: (text: string | RegExp) => {
    const container = document.body;
    const elements = Array.from(container.querySelectorAll('*'));
    return elements.find(el => {
      const content = el.textContent || '';
      return typeof text === 'string' ? content.includes(text) : text.test(content);
    }) as HTMLElement;
  }
};

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AccountsGrid', () => {
  const mockAccounts: BankAccount[] = [
    {
      id: '1',
      accountNumber: '****1234',
      accountName: 'Primary Savings',
      type: 'savings',
      balance: 5000,
      currency: 'USD',
      icon: '💰'
    },
    {
      id: '2',
      accountNumber: '****5678',
      accountName: 'Current Account',
      type: 'current',
      balance: 3000,
      currency: 'USD',
      icon: '💳'
    }
  ];

  const mockOnAccountSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeletons when loading', () => {
    render(
      <BrowserRouter>
        <AccountsGrid
          accounts={[]}
          isLoading={true}
          accountsError={null}
          onAccountSelect={mockOnAccountSelect}
          onRetry={vi.fn()}
        />
      </BrowserRouter>
    );

    const skeletons = document.querySelectorAll('.account-card-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders accounts when loaded', () => {
    render(
      <BrowserRouter>
        <AccountsGrid
          accounts={mockAccounts}
          isLoading={false}
          accountsError={null}
          onAccountSelect={mockOnAccountSelect}
          onRetry={vi.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Primary Savings')).toBeTruthy();
    expect(screen.getByText('Current Account')).toBeTruthy();
  });

  it('renders error state with retry button', () => {
    const onRetry = vi.fn();
    
    render(
      <BrowserRouter>
        <AccountsGrid
          accounts={[]}
          isLoading={false}
          accountsError="Network error"
          onAccountSelect={mockOnAccountSelect}
          onRetry={onRetry}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Unable to Load Accounts')).toBeTruthy();
    expect(screen.getByText('Try Again')).toBeTruthy();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const onRetry = vi.fn();
    
    render(
      <BrowserRouter>
        <AccountsGrid
          accounts={[]}
          isLoading={false}
          accountsError="Network error"
          onAccountSelect={mockOnAccountSelect}
          onRetry={onRetry}
        />
      </BrowserRouter>
    );

    const retryButton = screen.getByText('Try Again');
    await userEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('calls onAccountSelect when account is clicked', async () => {
    render(
      <BrowserRouter>
        <AccountsGrid
          accounts={mockAccounts}
          isLoading={false}
          accountsError={null}
          onAccountSelect={mockOnAccountSelect}
          onRetry={vi.fn()}
        />
      </BrowserRouter>
    );

    const accountCard = screen.getByText('Primary Savings').closest('.account-card');
    if (accountCard) {
      await userEvent.click(accountCard);
    }

    expect(mockOnAccountSelect).toHaveBeenCalledWith(mockAccounts[0]);
  });

  it('renders empty state when no accounts', () => {
    render(
      <BrowserRouter>
        <AccountsGrid
          accounts={[]}
          isLoading={false}
          accountsError={null}
          onAccountSelect={mockOnAccountSelect}
          onRetry={vi.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('No Accounts Found')).toBeTruthy();
  });

  it('displays account balance correctly formatted', () => {
    render(
      <BrowserRouter>
        <AccountsGrid
          accounts={mockAccounts}
          isLoading={false}
          accountsError={null}
          onAccountSelect={mockOnAccountSelect}
          onRetry={vi.fn()}
        />
      </BrowserRouter>
    );

    expect(screen.getByText(/5,000.00/)).toBeTruthy();
  });
});
