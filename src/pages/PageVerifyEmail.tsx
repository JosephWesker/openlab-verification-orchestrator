import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

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
    setUserEmail(params.get("userEmail") || "");
    setReturnTo(params.get("returnTo") || "");
    setClientId(params.get("clientId") || "");
    setClientName(params.get("clientName") || "");
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
      setErrorMessage("No se pudo reenviar el correo. Intenta más tarde.");
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4 max-w-md">
      <Typography className="text-3xl font-semibold">
        Verifica tu correo electrónico
      </Typography>
      <p className="">
        Para acceder a <strong>{clientName}</strong>, debes verificar tu correo:
      </p>
      <p className="text-blue-(--var(--color-primary)) font-medium">{userEmail}</p>

      {successMessage && (
        <p className="text-green-600">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      {/* <button
        onClick={handleResendVerification}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Reenviar correo de verificación"}
      </button> */}

      <Button
        onClick={handleResendVerification}
        className="m-0 gap-2 flex items-center bg-[#3d7bff] disabled:text-white"
        variant="contained"
        // loadingPosition="end"
        // loading={isAplying || loading}
        disabled={loading}
        // startIcon={<StarsRoundedIcon />}
      >
        {/* <StarsRoundedIcon /> */}
        {loading ? "Enviando" : "Reenviar correo de verificación"}
        {loading || (loading && <CircularProgress size={16} color="inherit" />)}
      </Button>

      <Button
        onClick={handleLogout}
        variant="contained"
        className="m-0 text-[#404659] bg-[#DCE2F9] disabled:text-white"
      >
        Iniciar sesión con otra cuenta
      </Button>
    </div>
  );
};

export default PageVerifyEmail;
