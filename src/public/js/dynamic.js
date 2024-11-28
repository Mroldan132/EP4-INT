document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = $$(".menu-link");
  const contentContainer = $("#dynamic-content");

  menuLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.getAttribute("data-target");

      fetch(`/partials/${target}.html`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Contenido no encontrado");
          }
          return response.text();
        })
        .then(html => {
          contentContainer.innerHTML = html;
        })
        .then(() => {
          if (!$(`#script-${target}`)) { 
            return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = `/js/${target}.js`;
              script.id = `script-${target}`;
              script.onload = () => {
                console.log(`${target}.js cargado correctamente.`);
                resolve(); 
              };
              script.onerror = () => reject(new Error(`Error al cargar el script ${target}.js`));
              document.body.appendChild(script);
            });
          }
        })
        .then(() => {
          switch (target) {
            case 'categorias':
              obtenerCategorias();
              break;
            case 'meseros':
              obtenerMeseros();
              break;
            case 'platos':
              obtenerPlatos();
              llenarCategorias();
              break;
          }
        })
        .catch(error => {
          contentContainer.innerHTML = `<p>Error al cargar el contenido: ${error.message}</p>`;
        });
    });
  });
});
