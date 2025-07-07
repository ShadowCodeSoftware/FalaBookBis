const mockMyBooks = [
  {
    id: '1',
    titre: 'Le Petit Prince',
    auteur: 'Antoine de Saint-Exupéry',
    description: 'Un conte philosophique et poétique sous l\'apparence d\'un conte pour enfants.',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
    etat: 'bon',
    genre_id: '1',
    user_id: '1',
    genre: { id: '1', nom: 'Littérature' },
    user: { id: '1', nom: 'Dupont', prenom: 'Jean', email: 'jean@example.com', ville: 'Paris' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify({
        success: true,
        data: mockMyBooks,
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