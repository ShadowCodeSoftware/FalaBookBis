export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation simple
    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email et mot de passe requis',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Simuler l'authentification
    const user = {
      id: '1',
      nom: 'Dupont',
      prenom: 'Jean',
      email: email,
      ville: 'Paris',
      photo_profil: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const token = `fake-jwt-token-${Date.now()}`;

    return new Response(
      JSON.stringify({
        success: true,
        data: { user, token },
        message: 'Connexion réussie',
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