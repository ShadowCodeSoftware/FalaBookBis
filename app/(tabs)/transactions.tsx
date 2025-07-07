import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TransactionService } from '@/services/transactions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { Transaction } from '@/types/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const transactionsData = await TransactionService.getMyTransactions();
      setTransactions(transactionsData);
    } catch (err) {
      setError('Erreur lors du chargement des transactions');
      console.error('Erreur chargement transactions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptTransaction = async (transactionId: string) => {
    try {
      await TransactionService.updateTransaction(transactionId, 'acceptee');
      loadTransactions();
    } catch (error) {
      console.error('Erreur acceptation transaction:', error);
    }
  };

  const handleRejectTransaction = async (transactionId: string) => {
    try {
      await TransactionService.updateTransaction(transactionId, 'refusee');
      loadTransactions();
    } catch (error) {
      console.error('Erreur refus transaction:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente':
        return '#F59E0B';
      case 'acceptee':
        return '#10B981';
      case 'refusee':
        return '#EF4444';
      case 'terminee':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_attente':
        return 'En attente';
      case 'acceptee':
        return 'Acceptée';
      case 'refusee':
        return 'Refusée';
      case 'terminee':
        return 'Terminée';
      default:
        return 'Inconnu';
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Mes échanges</Text>
        </View>
        
        {transactions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucune transaction pour le moment</Text>
          </View>
        ) : (
          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.statut) }]}>
                    <Text style={styles.statusText}>{getStatusText(transaction.statut)}</Text>
                  </View>
                  <Text style={styles.transactionDate}>
                    {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                  </Text>
                </View>
                
                <View style={styles.transactionContent}>
                  <View style={styles.bookInfo}>
                    <Image
                      source={{
                        uri: transaction.livre_propose?.image ||
                          'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200'
                      }}
                      style={styles.bookImage}
                    />
                    <View style={styles.bookDetails}>
                      <Text style={styles.bookTitle}>{transaction.livre_propose?.titre}</Text>
                      <Text style={styles.bookAuthor}>{transaction.livre_propose?.auteur}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.userInfo}>
                    <Text style={styles.userLabel}>
                      {transaction.utilisateur_emetteur?.nom} {transaction.utilisateur_emetteur?.prenom}
                    </Text>
                    <Text style={styles.userCity}>{transaction.utilisateur_emetteur?.ville}</Text>
                  </View>
                </View>
                
                {transaction.statut === 'en_attente' && (
                  <View style={styles.actionButtons}>
                    <Button
                      title="Accepter"
                      onPress={() => handleAcceptTransaction(transaction.id)}
                      variant="primary"
                    />
                    <Button
                      title="Refuser"
                      onPress={() => handleRejectTransaction(transaction.id)}
                      variant="danger"
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  transactionsList: {
    padding: 16,
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionContent: {
    marginBottom: 16,
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#6B7280',
  },
  userInfo: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  userLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  userCity: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
});