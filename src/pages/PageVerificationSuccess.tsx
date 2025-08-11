import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Lottie from "react-lottie-player";
import arrowAnimation from "@/animations/completed-successfully.json";

const PageVerificationSuccess = () => {
  const [searchParams] = useSearchParams();
  // const [returnToUrl, setReturnToUrl] = useState("#");
  const [returnToUrl, setReturnToUrl] = useState("");

  // Este useEffect redirige automáticamente cuando returnToUrl cambia a no vacío
  useEffect(() => {
    if (returnToUrl !== "") {
      // Opcional: esperar 2 segundos antes de redirigir para mostrar mensaje o animación
      const timer = setTimeout(() => {
        // window.location.href = returnToUrl;
      }, 3000);

      // Cleanup si el componente se desmonta antes del timeout
      return () => clearTimeout(timer);
    }
  }, [returnToUrl]);

  const handleRedirect = () => {
    // const domain = VITE_AUTH0_DOMAIN;
    // const clientId = process.env.VITE_AUTH0_CLIENT_ID;
    // const returnToUrl = encodeURIComponent(returnTo || window.location.origin);

    // console.log();
    window.location.href = returnToUrl;
  };

  useEffect(() => {
    const returnTo = searchParams.get("returnTo");

    if (returnTo) {
      setReturnToUrl(returnTo);
    }

    // 1. Obtiene el parámetro 'state' de la URL
    // const state = searchParams.get("state");

    // if (state) {
    //   try {
    //     // 2. Si existe, decodifica el 'state' para obtener el objeto original
    //     const decodedState = JSON.parse(atob(decodeURIComponent(state)));
    //     if (decodedState.returnTo) {
    //       // setReturnToUrl(decodedState.returnTo);
    //       setReturnToUrl(decodedState.returnTo);
    //     }
    //   } catch (e) {
    //     console.error("Error al decodificar el estado de la URL", e);
    //   }
    // }
  }, [searchParams]);

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

        {returnToUrl !== "" ? (
          <div>
            <p className="">Serás redirigido a la aplicación en un momento.</p>
            <p className="text-sm text-gray-500">
              Si no eres redirigido, haz clic aquí:
              <button
                onClick={handleRedirect}
                className="m-0 text-[#404659] font-light text-sm cursor-pointer px-4 py-2 rounded-md transition duration-200 ease-in-out hover:text-[var(--color-secondary)] disabled:text-white"
              >
                Ir a la aplicación {returnToUrl}
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
