export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  ville: string;
  photo_profil?: string;
  created_at: string;
  updated_at: string;
}

export interface Genre {
  id: string;
  nom: string;
}

export interface Book {
  id: string;
  titre: string;
  auteur: string;
  description: string;
  image?: string;
  etat: 'neuf' | 'bon' | 'use';
  genre_id: string;
  user_id: string;
  genre?: Genre;
  user?: User;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  livre_propose_id: string;
  livre_souhaite_id?: string;
  utilisateur_emetteur_id: string;
  utilisateur_recepteur_id: string;
  statut: 'en_attente' | 'acceptee' | 'refusee' | 'terminee';
  date_echange?: string;
  livre_propose?: Book;
  livre_souhaite?: Book;
  utilisateur_emetteur?: User;
  utilisateur_recepteur?: User;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}