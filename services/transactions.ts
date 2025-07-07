import { apiClient } from '@/utils/api';
import { Transaction } from '@/types/api';

export class TransactionService {
  static async getTransactions(): Promise<Transaction[]> {
    const response = await apiClient.get<Transaction[]>('/api/transactions');
    return response.data;
  }

  static async getMyTransactions(): Promise<Transaction[]> {
    const response = await apiClient.get<Transaction[]>('/api/my-transactions');
    return response.data;
  }

  static async createTransaction(transactionData: {
    livre_propose_id: string;
    livre_souhaite_id?: string;
    utilisateur_recepteur_id: string;
  }): Promise<Transaction> {
    const response = await apiClient.post<Transaction>('/api/transactions', transactionData);
    return response.data;
  }

  static async updateTransaction(id: string, statut: 'acceptee' | 'refusee'): Promise<Transaction> {
    const response = await apiClient.put<Transaction>(`/api/transactions/${id}`, { statut });
    return response.data;
  }
}