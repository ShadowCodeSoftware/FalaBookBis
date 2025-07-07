import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Book } from '@/types/api';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
  onBookPress: (book: Book) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function BookList({ books, onBookPress, refreshing = false, onRefresh }: BookListProps) {
  const renderBook = ({ item }: { item: Book }) => (
    <BookCard book={item} onPress={() => onBookPress(item)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
});