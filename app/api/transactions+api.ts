const mockTransactions = [
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
        data: mockTransactions,
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { livre_propose_id, livre_souhaite_id, utilisateur_recepteur_id } = body;

    if (!livre_propose_id || !utilisateur_recepteur_id) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Données manquantes',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const newTransaction = {
      id: (mockTransactions.length + 1).toString(),
      livre_propose_id,
      livre_souhaite_id,
      utilisateur_emetteur_id: '1', // Utilisateur connecté fictif
      utilisateur_recepteur_id,
      statut: 'en_attente',
      date_echange: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockTransactions.push(newTransaction);

    return new Response(
      JSON.stringify({
        success: true,
        data: newTransaction,
        message: 'Transaction créée avec succès',
      }),
      {
        status: 201,
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