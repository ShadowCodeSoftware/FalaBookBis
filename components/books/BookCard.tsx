import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Book } from '@/types/api';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

export function BookCard({ book, onPress }: BookCardProps) {
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

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: book.image || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.titre}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.auteur}
        </Text>
        <View style={styles.footer}>
          <View style={[styles.stateTag, { backgroundColor: getStateColor(book.etat) }]}>
            <Text style={styles.stateText}>{getStateText(book.etat)}</Text>
          </View>
          <Text style={styles.city}>{book.user?.ville}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stateTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  city: {
    fontSize: 12,
    color: '#6B7280',
  },
});