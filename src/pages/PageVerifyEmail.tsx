import { useEffect, useState } from "react";

const PageVerifyEmail = () => {
  const [userEmail, setUserEmail] = useState("");
  const [returnTo, setReturnTo] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserEmail(params.get("userEmail") || "");
    setReturnTo(params.get("returnTo") || "");
    setClientId(params.get("clientId") || "");
    setClientName(params.get("clientName") || "");
  }, []);

  const handleResendVerification = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Llama a tu backend que tiene acceso al Management API
      const response = await fetch(`${process.env.VITE_BACKEND_URL}/api/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userEmail,
          clientId
        }),
      });

      if (!response.ok) throw new Error("Error al reenviar el correo");

      setSuccessMessage("Correo de verificación reenviado.");
    } catch (err) {
      if (err instanceof Error) {
        console.log("err.message", err.message);
      }
      setErrorMessage("No se pudo reenviar el correo. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    const domain = process.env.VITE_AUTH0_DOMAIN;
    // const clientId = process.env.VITE_AUTH0_CLIENT_ID;
    const returnToUrl = encodeURIComponent(returnTo || window.location.origin);

    window.location.href = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${returnToUrl}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold mb-4">
        Verifica tu correo electrónico
      </h1>
      <p className="mb-2">
        Para acceder a <strong>{clientName}</strong>, debes verificar tu correo:
      </p>
      <p className="mb-6 text-blue-500 font-medium">{userEmail}</p>

      {successMessage && (
        <p className="text-green-600 mb-2">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}

      <button
        onClick={handleResendVerification}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Reenviar correo de verificación"}
      </button>

      <button
        onClick={handleLogout}
        className="text-sm text-gray-500 underline"
      >
        Iniciar sesión con otra cuenta
      </button>
    </div>
  );
};

export default PageVerifyEmail;
