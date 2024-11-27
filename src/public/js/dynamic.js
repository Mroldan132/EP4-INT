
document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = $$(".menu-link");
  const contentContainer = $("#dynamic-content");

  menuLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.getAttribute("data-target");
      if (!$(`#script-${target}`)) {
        const script = document.createElement('script');
        script.src = `/js/${target}.js`;
        script.id = `script-${target}`;
        script.onload = () => {
          console.log(`${target}.js cargado correctamente.`);
        };
        document.body.appendChild(script);
      }

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
        .then(response => {
          switch (target) {
            case 'categorias':
              obtenerCategorias();
              break;
            case 'meseros':
              obtenerMeseros();
              break;
          }
        })
        .catch(error => {
          contentContainer.innerHTML = `<p>Error al cargar el contenido: ${error.message}</p>`;
        });
    });
  });

});
