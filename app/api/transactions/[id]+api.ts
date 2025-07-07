export async function PUT(request: Request, { id }: { id: string }) {
  try {
    const body = await request.json();
    const { statut } = body;

    if (!statut) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Statut requis',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Simuler la mise à jour de la transaction
    const updatedTransaction = {
      id,
      statut,
      updated_at: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify({
        success: true,
        data: updatedTransaction,
        message: 'Transaction mise à jour avec succès',
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