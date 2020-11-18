import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const outcome = this.transactions.filter(e => e.type === 'outcome')
      .reduce((acumulador, balance) => acumulador + balance.value, 0);
    const income = this.transactions.filter(e => e.type === 'income')
      .reduce((acumulador, balance) => acumulador + balance.value, 0);

    return {
      income: income,
      outcome: outcome,
      total: income - outcome
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
