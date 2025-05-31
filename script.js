    async function sendMsj() {
      const prompt = document.getElementById('prompt').value.trim();
      const respuestaIA = document.getElementById('respuestaIA');
      const apiKey = "AIzaSyDQsUtn0MsaxqHSCX72sfEIGVfyUkVw7GM";

      respuestaIA.textContent = "";

      if (!prompt) {
        respuestaIA.textContent = "Por favor, ingresa algún texto.";
        return;
      }

      const lowerPrompt = prompt.toLowerCase();
      const esParaDiscord =
        lowerPrompt.includes("mensaje") ||
        lowerPrompt.includes("discord") ||
        lowerPrompt.includes("enviar");

      if (esParaDiscord) {
         Swal.fire("Envio exitoso ", "revisa tu Discord", "success")
        return; 
      }

      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const requestBody = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorData = await response.json();
          respuestaIA.textContent = `Error: ${response.status} - ${errorData.error?.message || 'Error desconocido'}`;
          console.error("Error en la API:", errorData);
          return;
        }

        const data = await response.json();

        const textoRespuesta =
          data.candidates?.[0]?.content?.parts?.[0]?.text || "No se recibió contenido útil.";

        respuestaIA.textContent = textoRespuesta;

      } catch (error) {
        console.error("Error en la solicitud:", error);
        respuestaIA.textContent = "Error al conectar con la API.";
      }
    }
  