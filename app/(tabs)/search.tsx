import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { BookService } from '@/services/books';
import { BookList } from '@/components/books/BookList';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Book, Genre } from '@/types/api';

export default function Search() {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length > 0) {
        searchBooks();
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedGenre]);

  const loadGenres = async () => {
    try {
      const genresData = await BookService.getGenres();
      setGenres(genresData);
    } catch (error) {
      console.error('Erreur chargement genres:', error);
    }
  };

  const searchBooks = async () => {
    try {
      setIsLoading(true);
      const booksData = await BookService.getBooks({
        search: searchQuery,
        genre: selectedGenre,
      });
      setBooks(booksData);
    } catch (error) {
      console.error('Erreur recherche livres:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookPress = (book: Book) => {
    router.push(`/book/${book.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Recherche</Text>
          
          <Input
            placeholder="Rechercher un livre, un auteur..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            fullWidth
          />
        </View>
        
        {isLoading && <LoadingSpinner />}
        
        {!isLoading && books.length > 0 && (
          <BookList
            books={books}
            onBookPress={handleBookPress}
          />
        )}
        
        {!isLoading && searchQuery.length > 0 && books.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>Aucun livre trouvé</Text>
          </View>
        )}
        
        {!isLoading && searchQuery.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              Tapez votre recherche pour voir les résultats
            </Text>
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
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noResultsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});