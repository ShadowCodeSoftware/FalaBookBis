import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    ville: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!form.nom || !form.prenom || !form.email || !form.password || !form.ville) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    try {
      await register(form);
      // La navigation sera gérée automatiquement par le contexte d'authentification
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#374151" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.title}>Inscription</Text>
        
        <View style={styles.form}>
          <Input
            label="Nom"
            value={form.nom}
            onChangeText={(value) => updateForm('nom', value)}
            placeholder="Votre nom"
            fullWidth
          />
          
          <Input
            label="Prénom"
            value={form.prenom}
            onChangeText={(value) => updateForm('prenom', value)}
            placeholder="Votre prénom"
            fullWidth
          />
          
          <Input
            label="Email"
            value={form.email}
            onChangeText={(value) => updateForm('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="votre@email.com"
            fullWidth
          />
          
          <Input
            label="Ville"
            value={form.ville}
            onChangeText={(value) => updateForm('ville', value)}
            placeholder="Votre ville"
            fullWidth
          />
          
          <Input
            label="Mot de passe"
            value={form.password}
            onChangeText={(value) => updateForm('password', value)}
            secureTextEntry
            placeholder="••••••••"
            fullWidth
          />
          
          <Button
            title="S'inscrire"
            onPress={handleRegister}
            loading={isLoading}
            fullWidth
          />
        </View>
        
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Text style={styles.linkText}>
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  linkContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  linkText: {
    color: '#3B82F6',
    fontSize: 16,
  },
});