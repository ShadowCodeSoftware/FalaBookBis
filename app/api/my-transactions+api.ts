const mockMyTransactions = [
  {
    id: '1',
    livre_propose_id: '1',
    livre_souhaite_id: null,
    utilisateur_emetteur_id: '2',
    utilisateur_recepteur_id: '1',
    statut: 'en_attente',
    date_echange: null,
    livre_propose: {
      id: '1',
      titre: 'Le Petit Prince',
      auteur: 'Antoine de Saint-Exupéry',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    livre_souhaite: null,
    utilisateur_emetteur: {
      id: '2',
      nom: 'Martin',
      prenom: 'Marie',
      email: 'marie@example.com',
      ville: 'Lyon',
    },
    utilisateur_recepteur: {
      id: '1',
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean@example.com',
      ville: 'Paris',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify({
        success: true,
        data: mockMyTransactions,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Erreur serveur',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}