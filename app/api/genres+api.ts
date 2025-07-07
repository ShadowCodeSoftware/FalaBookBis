const mockGenres = [
  { id: '1', nom: 'Littérature' },
  { id: '2', nom: 'Science-fiction' },
  { id: '3', nom: 'Fantasy' },
  { id: '4', nom: 'Thriller' },
  { id: '5', nom: 'Romance' },
  { id: '6', nom: 'Biographie' },
  { id: '7', nom: 'Histoire' },
  { id: '8', nom: 'Développement personnel' },
  { id: '9', nom: 'Cuisine' },
  { id: '10', nom: 'Voyage' },
];

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify({
        success: true,
        data: mockGenres,
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