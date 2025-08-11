import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Lottie from "react-lottie-player";
import arrowAnimation from "@/animations/completed-successfully.json";

const PageVerificationSuccess = () => {
  const [searchParams] = useSearchParams();
  // const [redirectOnVerify, setRedirectOnVerify] = useState("");
  const [returnToUrl, setReturnToUrl] = useState("");
  const [returnToUrlVerified, setReturnToUrlVerified] = useState("");

  // Este useEffect redirige automáticamente cuando returnToUrl cambia a no vacío
  useEffect(() => {
    // console.log("returnToUrl", returnToUrl);
    if (returnToUrlVerified !== "") {
      // Opcional: esperar 2 segundos antes de redirigir para mostrar mensaje o animación
      const timer = setTimeout(() => {
        // window.location.href = returnToUrlVerified;
      }, 3000);

      // Cleanup si el componente se desmonta antes del timeout
      return () => clearTimeout(timer);
    }
  }, [returnToUrlVerified]);

  useEffect(() => {
    const returnTo = searchParams.get("returnTo");
    const clientId = searchParams.get("clientId");
    const applicationMetadata = searchParams.get("applicationMetadata");
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    if ((returnTo || applicationMetadata) && clientId) {
      if (applicationMetadata) {
        console.log("applicationMetadata", applicationMetadata);
        const decodedredirectOnVerify = JSON.parse(
          atob(decodeURIComponent(applicationMetadata))
        );
        if (decodedredirectOnVerify.redirect_on_verify) {
          console.log(
            "redirect_on_verify",
            decodedredirectOnVerify.redirect_on_verify
          );

          setReturnToUrl(decodedredirectOnVerify.redirect_on_verify);
        }
      } else if (returnTo) {
        console.log(returnTo, returnTo);
        setReturnToUrl(returnTo);
      } else {
        return;
      }

      fetch(`${VITE_BACKEND_URL}/api/validate-return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnTo: returnToUrl, clientId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setReturnToUrlVerified(data.safeUrl);
          } else {
            console.error("ReturnTo no válido");
          }
        });
    }
  }, [searchParams]);

  const handleRedirect = () => {
    window.location.href = returnToUrlVerified;
  };

  // useEffect(() => {
  //   const returnTo = searchParams.get("returnTo");
  //   const clientId = searchParams.get("clientId");

  //   if (returnTo) {
  //     setReturnToUrl(returnTo);
  //   }
  // }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Lottie
          play
          animationData={arrowAnimation}
          style={{ width: "50%", height: "50%" }}
        />
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          ¡Verificación exitosa!
        </h1>
        <p>reurnTo: {returnToUrlVerified}</p>

        {returnToUrlVerified !== "" ? (
          <div>
            <p className="">Serás redirigido a la aplicación en un momento.</p>
            <p className="text-sm text-gray-500">
              Si no eres redirigido, haz clic aquí:
              <button
                onClick={handleRedirect}
                className="m-0 text-[#404659] font-light text-sm cursor-pointer px-4 py-2 rounded-md transition duration-200 ease-in-out hover:text-[var(--color-secondary)] disabled:text-white"
              >
                Ir a la aplicación
              </button>
            </p>
          </div>
        ) : (
          <div>
            <p className="">Ya puedes iniciar sesión en tu aplicación</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageVerificationSuccess;
