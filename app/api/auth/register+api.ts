export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, prenom, email, password, ville } = body;

    // Validation simple
    if (!nom || !prenom || !email || !password || !ville) {
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

    // Simuler la création d'utilisateur
    const user = {
      id: Date.now().toString(),
      nom,
      prenom,
      email,
      ville,
      photo_profil: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const token = `fake-jwt-token-${Date.now()}`;

    return new Response(
      JSON.stringify({
        success: true,
        data: { user, token },
        message: 'Inscription réussie',
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