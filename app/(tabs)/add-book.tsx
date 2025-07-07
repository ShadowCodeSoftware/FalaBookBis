import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { BookService } from '@/services/books';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Genre } from '@/types/api';
import { Ionicons } from '@expo/vector-icons';

export default function AddBook() {
  const [form, setForm] = useState({
    titre: '',
    auteur: '',
    description: '',
    etat: 'bon' as 'neuf' | 'bon' | 'use',
    genre_id: '',
    image: '',
  });
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      const genresData = await BookService.getGenres();
      setGenres(genresData);
    } catch (error) {
      console.error('Erreur chargement genres:', error);
    }
  };

  const handleAddBook = async () => {
    if (!form.titre || !form.auteur || !form.description || !form.genre_id) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsLoading(true);
    try {
      await BookService.createBook(form);
      Alert.alert('Succès', 'Livre ajouté avec succès', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'ajout du livre');
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const selectImage = () => {
    // Placeholder pour la sélection d'image
    // En production, utiliser expo-image-picker
    Alert.alert('Fonctionnalité', 'Sélection d\'image à implémenter');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Ajouter un livre</Text>
        </View>
        
        <View style={styles.form}>
          <Input
            label="Titre *"
            value={form.titre}
            onChangeText={(value) => updateForm('titre', value)}
            placeholder="Titre du livre"
            fullWidth
          />
          
          <Input
            label="Auteur *"
            value={form.auteur}
            onChangeText={(value) => updateForm('auteur', value)}
            placeholder="Nom de l'auteur"
            fullWidth
          />
          
          <Input
            label="Description *"
            value={form.description}
            onChangeText={(value) => updateForm('description', value)}
            placeholder="Description du livre"
            multiline
            numberOfLines={4}
            fullWidth
          />
          
          <View style={styles.imageSection}>
            <Text style={styles.label}>Photo du livre</Text>
            <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="camera" size={32} color="#6B7280" />
                  <Text style={styles.imageButtonText}>Ajouter une photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.stateSection}>
            <Text style={styles.label}>État du livre *</Text>
            <View style={styles.stateButtons}>
              {[
                { value: 'neuf', label: 'Neuf' },
                { value: 'bon', label: 'Bon état' },
                { value: 'use', label: 'Usé' }
              ].map((state) => (
                <TouchableOpacity
                  key={state.value}
                  style={[
                    styles.stateButton,
                    form.etat === state.value && styles.stateButtonActive
                  ]}
                  onPress={() => updateForm('etat', state.value)}
                >
                  <Text style={[
                    styles.stateButtonText,
                    form.etat === state.value && styles.stateButtonTextActive
                  ]}>
                    {state.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.genreSection}>
            <Text style={styles.label}>Genre *</Text>
            <View style={styles.genreButtons}>
              {genres.map((genre) => (
                <TouchableOpacity
                  key={genre.id}
                  style={[
                    styles.genreButton,
                    form.genre_id === genre.id && styles.genreButtonActive
                  ]}
                  onPress={() => updateForm('genre_id', genre.id)}
                >
                  <Text style={[
                    styles.genreButtonText,
                    form.genre_id === genre.id && styles.genreButtonTextActive
                  ]}>
                    {genre.nom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <Button
            title="Ajouter le livre"
            onPress={handleAddBook}
            loading={isLoading}
            fullWidth
          />
        </View>
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
  form: {
    padding: 16,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  imageSection: {
    marginBottom: 16,
  },
  imageButton: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imageButtonText: {
    marginTop: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  selectedImage: {
    width: 150,
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  stateSection: {
    marginBottom: 16,
  },
  stateButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  stateButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  stateButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  stateButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  stateButtonTextActive: {
    color: '#FFFFFF',
  },
  genreSection: {
    marginBottom: 16,
  },
  genreButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  genreButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  genreButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  genreButtonTextActive: {
    color: '#FFFFFF',
  },
});