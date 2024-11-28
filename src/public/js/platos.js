
const obtenerPlatos = async () => {
    try {
        const response = await fetch('/api/platos');
        if (!response.ok) throw new Error('Error al obtener los platos');
        const platos = await response.json();
        const tbodyPlatos = $('#tbody-plato');
        tbodyPlatos.innerHTML = '';
        platos.forEach((platos) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${platos.idplato}</td>
            <td>${platos.Plato}</td>
            <td>${platos.ingredientes}</td>
            <td>${platos.Categoria}</td>
            <td>${platos.precio}</td>
            <td>
                <button class="btn btn-sm btn-editar" onclick="editarPlato(${platos.idplato})" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm btn-eliminar" onclick="eliminarPlato(${platos.idplato})" title="Eliminar">
                    <i class="bi bi-trash"></i>
                </button>
            </td>`;
            tbodyPlatos.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los platos:', error);
        alertError(error.message);
    }
};
const llenarCategorias = async () => {
    try {
        const response = await fetch('api/categorias');
        const categorias = await response.json();
        const selectCategorias = $('#categoria');
        let opciones = '';
        categorias.forEach(categoria => {
            opciones += `<option value="${categoria.idcategoria}">${categoria.nombre}</option>`;
        });
        selectCategorias.innerHTML = opciones;
    } catch (error) {
        console.error('Error al obtener las categorias', error);
    }
}

const editarPlato = async (id) => {
    try {
        const response = await fetch(`/api/plato/${id}`);
        if (!response.ok) throw new Error('Error al obtener el plato');
        const plato = await response.json();
        if (plato) {
            $('#nombre').value = plato.Plato;
            $('#ingredientes').value = plato.ingredientes;
            $('#precio').value = plato.precio;
            $('#categoria').value = plato.codigoCategoria;
            $('#preview').src = plato.imagen;
            $('#preview').style.display = 'block'

            openModalPlato(id, 'Editar Plato', 'Actualizar', actualizarPlato);
        }
    } catch (error) {
        console.error('Error al obtener el plato:', error);
        alertError(error.message);
    }
};

const actualizarPlato = async (id) => {
    const nombre = $('#nombre').value;
    const ingredientes = $('#ingredientes').value;
    const precio = $('#precio').value;
    const categoria = $('#categoria').value;
    let imagen = null;
    if($('#imagen').files.lengh != 0){

        imagen = $('#imagen').files[0];
    }
    const flgImagen =  $('#imagen').dataset.edito
    const formData = new FormData();
    formData.append('id', id);
    formData.append('nombre', nombre);
    formData.append('ingredientes', ingredientes);
    formData.append('precio', precio);
    formData.append('categoria', categoria);
    formData.append('imagen', imagen);
    formData.append('flgImagen', flgImagen);


    try {
        const response = await fetch('/api/plato/update', {
            method: 'PUT',
            body: formData,
        });

        const result = await response.json();

        showSuccessModal(result.message);
        obtenerPlatos();
        resetModalPlato();

    } catch (error) {
        console.error('Error al actualizar el plato:', error);
        alertError('Error al actualizar el plato.');
    }
};

const guardarPlato = async () => {
    const nombre = $('#nombre').value;
    const ingredientes = $('#ingredientes').value;
    const precio = $('#precio').value;
    const categoria = $('#categoria').value;
    let imagen = null;
    if($('#imagen').files.lengh > 0){

        imagen = $('#imagen').files[0];
    }
    const flgImagen =  $('#imagen').dataset.edito;
    
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('ingredientes', ingredientes);
    formData.append('precio', precio);
    formData.append('categoria', categoria);
    formData.append('imagen', imagen);
    formData.append('flgImagen', flgImagen);


    try {
        const response = await fetch('/api/plato/add', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        showSuccessModal(result.message);
        obtenerPlatos();
        resetModalPlato();
    } catch (error) {
        console.error('Error al guardar el plato:', error);
        alertError('Error al guardar la plato.');
    }
};


const eliminarPlato = async (id) => {
    if (confirm('¿Estás seguro de eliminar este plato?')) {
        try {
            const response = await fetch(`/api/plato/delete/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            showSuccessModal(result.message);
            obtenerPlatos();
        } catch (error) {
            console.error('Error al eliminar el plato:', error);
            alertError('Error al eliminar el plato.');
        }
    }
}


const resetModalPlato = () => {
    $('#platoForm').reset();
    const modal = $('#platoModal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    const preview = $('#preview');
    preview.src = '';
    preview.style.display = 'none';
    $('#imagen').value = '';
    $('#imagen').dataset.edito = 'N';
    $('#platoModalLabel').textContent = 'Agregar Plato';
    const saveButton = $('#savePlato');
    saveButton.textContent = 'Guardar';
    saveButton.onclick = guardarPlato;
};

const openModalPlato = (id, labelText, buttonText, saveFunction) => {
    $('#platoModalLabel').textContent = labelText;
    const saveButton = $('#savePlato');
    saveButton.textContent = buttonText;
    saveButton.onclick = () => saveFunction(id);
    const modal = new bootstrap.Modal($('#platoModal'));
    modal.show();
};

//Eventos para mostrar la imagen en el formulario
$('#imagen').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const preview = $('#preview');
    const inputImagen = $('#imagen');
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            inputImagen.dataset.edito = 'S';
        };

        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
});

