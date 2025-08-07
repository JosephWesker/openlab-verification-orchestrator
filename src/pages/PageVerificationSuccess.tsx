import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PageVerificationSuccess = () => {
  const [searchParams] = useSearchParams();
  const [returnToUrl, setReturnToUrl] = useState('#');

  useEffect(() => {
    // 1. Obtiene el parámetro 'state' de la URL
    const state = searchParams.get('state');

    if (state) {
      try {
        // 2. Si existe, decodifica el 'state' para obtener el objeto original
        const decodedState = JSON.parse(atob(decodeURIComponent(state)));
        if (decodedState.returnTo) {
          setReturnToUrl(decodedState.returnTo);
        }
      } catch (e) {
        console.error("Error al decodificar el estado de la URL", e);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">¡Verificación exitosa!</h1>
        <p className="mb-4">Serás redirigido a la aplicación en un momento.</p>
        <p className="text-sm text-gray-500">
          Si no eres redirigido, haz clic aquí:
          <a href={returnToUrl} className="underline text-blue-600">
            Ir a la aplicación
          </a>
        </p>
      </div>
    </div>
  );
};

export default PageVerificationSuccess;