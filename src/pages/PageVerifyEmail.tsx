// import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { Box, Typography } from "@mui/material";

const PageVerifyEmail = () => {
  const [userEmail, setUserEmail] = useState("");
  const [returnTo, setReturnTo] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const VITE_AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserEmail(params.get("userEmail") || "undefined");
    setReturnTo(params.get("returnTo") || "");
    setClientId(params.get("clientId") || "");
    setClientName(params.get("clientName") || "undefined");
    setState(params.get("state") || "");
  }, []);

  const handleResendVerification = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Llama a tu backend que tiene acceso al Management API
      // const response = await fetch(`${process.env.VITE_BACKEND_URL}/api/resend-verification`, {
      const response = await fetch(
        `${VITE_BACKEND_URL}/api/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail,
            clientId,
            // returnTo,
            state,
          }),
        }
      );

      if (!response.ok) throw new Error("Error al reenviar el correo");

      setSuccessMessage("Correo de verificación reenviado.");
    } catch (err) {
      if (err instanceof Error) {
        console.log("err.message", err.message);
      }
      setErrorMessage("No fue posible reenviar el correo. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // const domain = VITE_AUTH0_DOMAIN;
    // const clientId = process.env.VITE_AUTH0_CLIENT_ID;
    const returnToUrl = encodeURIComponent(returnTo || window.location.origin);

    console.log();
    window.location.href = `https://${VITE_AUTH0_DOMAIN}/v2/logout?client_id=${clientId}&returnTo=${returnToUrl}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4 w-full">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-semibold text-[var(--color-primary)]">
          Verifica tu correo
        </p>
        <p className="font-light">
          Para acceder a {clientName} verifica el enlace que te hemos enviado a:
          <div className="font-semibold font-medium">{userEmail}</div>
        </p>
        {/* <p className="font-semibold font-medium">{userEmail}</p> */}
      </div>

      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-orange-600">{errorMessage}</p>}

      {/* <button
        onClick={handleResendVerification}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Reenviar correo de verificación"}
      </button> */}

      <button
        onClick={handleResendVerification}
        className="m-0 gap-2 flex items-center bg-[var(--color-primary)] text-white cursor-pointer px-4 py-2 rounded-md transition duration-200 ease-in-out hover:bg-[var(--color-secondary)] disabled:text-white"
        // variant="contained"
        // loadingPosition="end"
        // loading={isAplying || loading}
        disabled={loading}
        // startIcon={<StarsRoundedIcon />}
      >
        {/* <StarsRoundedIcon /> */}
        {loading ? "Enviando..." : "Reenviar correo de verificación"}
        {loading || (loading && <CircularProgress size={16} color="inherit" />)}
      </button>

      <button
        onClick={handleLogout}
        // variant="contained"
        className="m-0 text-[#404659] font-light text-sm cursor-pointer px-4 py-2 rounded-md transition duration-200 ease-in-out hover:text-[var(--color-secondary)] disabled:text-white"
      >
        Iniciar sesión con otra cuenta 
        {`https://${VITE_AUTH0_DOMAIN}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo || window.location.origin)}`}
      </button>
    </div>
  );
};

export default PageVerifyEmail;
