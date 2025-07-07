const mockBooks = [
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
  {
    id: '2',
    titre: '1984',
    auteur: 'George Orwell',
    description: 'Un roman dystopique qui dépeint une société totalitaire.',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=600',
    etat: 'neuf',
    genre_id: '2',
    user_id: '2',
    genre: { id: '2', nom: 'Science-fiction' },
    user: { id: '2', nom: 'Martin', prenom: 'Marie', email: 'marie@example.com', ville: 'Lyon' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    titre: 'Harry Potter à l\'école des sorciers',
    auteur: 'J.K. Rowling',
    description: 'Le premier tome de la saga Harry Potter.',
    image: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=600',
    etat: 'use',
    genre_id: '3',
    user_id: '3',
    genre: { id: '3', nom: 'Fantasy' },
    user: { id: '3', nom: 'Bernard', prenom: 'Paul', email: 'paul@example.com', ville: 'Marseille' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const genre = url.searchParams.get('genre');
    const ville = url.searchParams.get('ville');
    const etat = url.searchParams.get('etat');

    let filteredBooks = [...mockBooks];

    if (search) {
      filteredBooks = filteredBooks.filter(book =>
        book.titre.toLowerCase().includes(search.toLowerCase()) ||
        book.auteur.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genre) {
      filteredBooks = filteredBooks.filter(book => book.genre_id === genre);
    }

    if (ville) {
      filteredBooks = filteredBooks.filter(book => book.user?.ville === ville);
    }

    if (etat) {
      filteredBooks = filteredBooks.filter(book => book.etat === etat);
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: filteredBooks,
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
    const { titre, auteur, description, etat, genre_id, image } = body;

    if (!titre || !auteur || !description || !etat || !genre_id) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Tous les champs sont obligatoires',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const newBook = {
      id: (mockBooks.length + 1).toString(),
      titre,
      auteur,
      description,
      image: image || 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      etat,
      genre_id,
      user_id: '1', // Utilisateur connecté fictif
      genre: { id: genre_id, nom: 'Genre' },
      user: { id: '1', nom: 'Dupont', prenom: 'Jean', email: 'jean@example.com', ville: 'Paris' },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockBooks.push(newBook);

    return new Response(
      JSON.stringify({
        success: true,
        data: newBook,
        message: 'Livre ajouté avec succès',
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