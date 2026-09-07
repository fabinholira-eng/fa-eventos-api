const token = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    return Response.json({
      ok: true,
      mensagem: "API F&A Eventos funcionando no Deno",
    });
  }

  if (url.pathname === "/teste-token") {
    const resposta = await fetch(
      "https://api.mercadopago.com/v1/payment_methods",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    const texto = await resposta.text();

    return Response.json({
      ok: resposta.ok,
      status: resposta.status,
      statusText: resposta.statusText,
      resposta: texto.slice(0, 500),
    });
  }

  return new Response("Rota não encontrada", { status: 404 });
});
