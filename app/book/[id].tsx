import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookService } from '@/services/books';
import { TransactionService } from '@/services/transactions';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { Book } from '@/types/api';
import { Ionicons } from '@expo/vector-icons';

export default function BookDetails() {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { id } = route.params as { id: string };

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const bookData = await BookService.getBook(id as string);
      setBook(bookData);
    } catch (err) {
      setError('Erreur lors du chargement du livre');
      console.error('Erreur chargement livre:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProposeExchange = async () => {
    if (!book || !user) return;
    
    try {
      await TransactionService.createTransaction({
        livre_propose_id: book.id,
        utilisateur_recepteur_id: book.user_id,
      });
      Alert.alert('Succès', 'Proposition d\'échange envoyée !');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la proposition');
    }
  };

  const getStateColor = (etat: string) => {
    switch (etat) {
      case 'neuf':
        return '#10B981';
      case 'bon':
        return '#F59E0B';
      case 'use':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStateText = (etat: string) => {
    switch (etat) {
      case 'neuf':
        return 'Neuf';
      case 'bon':
        return 'Bon état';
      case 'use':
        return 'Usé';
      default:
        return 'État inconnu';
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !book) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Livre non trouvé'}</Text>
          <Button title="Retour" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const isOwner = user?.id === book.user_id;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Image
          source={{
            uri: book.image ||
              'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600'
          }}
          style={styles.bookImage}
        />
        
        <View style={styles.content}>
          <View style={styles.bookInfo}>
            <Text style={styles.title}>{book.titre}</Text>
            <Text style={styles.author}>{book.auteur}</Text>
            
            <View style={styles.metaInfo}>
              <View style={[styles.stateBadge, { backgroundColor: getStateColor(book.etat) }]}>
                <Text style={styles.stateText}>{getStateText(book.etat)}</Text>
              </View>
              <Text style={styles.genre}>{book.genre?.nom}</Text>
            </View>
            
            <Text style={styles.description}>{book.description}</Text>
          </View>
          
          <View style={styles.ownerInfo}>
            <Text style={styles.ownerTitle}>Propriétaire</Text>
            <View style={styles.ownerDetails}>
              <Image
                source={{
                  uri: book.user?.photo_profil ||
                    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200'
                }}
                style={styles.ownerImage}
              />
              <View style={styles.ownerText}>
                <Text style={styles.ownerName}>
                  {book.user?.prenom} {book.user?.nom}
                </Text>
                <Text style={styles.ownerCity}>{book.user?.ville}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {!isOwner && (
        <View style={styles.actions}>
          <Button
            title="Proposer un échange"
            onPress={handleProposeExchange}
            fullWidth
          />
          <Button
            title="Contacter"
            onPress={() => Alert.alert('Fonctionnalité', 'Messagerie à implémenter')}
            variant="secondary"
            fullWidth
          />
        </View>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  bookImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  bookInfo: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  stateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  genre: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  ownerInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ownerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  ownerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  ownerText: {
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  ownerCity: {
    fontSize: 14,
    color: '#6B7280',
  },
  actions: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 8,
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
    marginBottom: 16,
  },
});