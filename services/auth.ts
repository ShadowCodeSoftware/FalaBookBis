import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '@/utils/api';
import { AuthResponse, User } from '@/types/api';

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    // Données factices pour le développement
    if (email === 'mfeegeorges@gmail.com' && password === 'password') {
      const fakeUser: User = {
        id: '1',
        nom: 'Georges',
        prenom: 'Mfee',
        email: 'mfeegeorges@gmail.com',
        ville: 'Paris',
        photo_profil: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const fakeResponse: AuthResponse = {
        user: fakeUser,
        token: 'fake_token_123456',
      };

      // Stocker les données factices
      await AsyncStorage.setItem('auth_token', fakeResponse.token);
      await AsyncStorage.setItem('user_data', JSON.stringify(fakeResponse.user));
      
      return fakeResponse;
    }

    // Pour les autres emails/mots de passe, simuler une erreur
    throw new Error('Email ou mot de passe incorrect');
  }

  static async register(userData: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    ville: string;
  }): Promise<AuthResponse> {
    // Données factices pour le développement
    const fakeUser: User = {
      id: Date.now().toString(), // Générer un ID unique
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      ville: userData.ville,
      photo_profil: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const fakeResponse: AuthResponse = {
      user: fakeUser,
      token: `fake_token_${Date.now()}`,
    };

    // Stocker les données factices
    await AsyncStorage.setItem('auth_token', fakeResponse.token);
    await AsyncStorage.setItem('user_data', JSON.stringify(fakeResponse.user));
    
    return fakeResponse;
  }

  static async logout(): Promise<void> {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_data');
  }

  static async getStoredUser(): Promise<User | null> {
    const userData = await AsyncStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  static async getStoredToken(): Promise<string | null> {
    return await AsyncStorage.getItem('auth_token');
  }

  static async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('auth_token');
    return !!token;
  }
}