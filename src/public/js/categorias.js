const obtenerCategorias = async () => {
    try {
        const response = await fetch('/api/categorias');
        if (!response.ok) throw new Error('Error al obtener las categorías');
        const categorias = await response.json();
        const tbodyCategoria = $('#tbody-categoria');
        tbodyCategoria.innerHTML = '';
        categorias.forEach((categoria) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${categoria.idcategoria}</td>
            <td>${categoria.nombre}</td>
            <td>${categoria.descripcion}</td>
            <td>
                <button class="btn btn-sm btn-editar" onclick="editarCategoria(${categoria.idcategoria})" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm btn-eliminar" onclick="eliminarCategoria(${categoria.idcategoria})" title="Eliminar">
                    <i class="bi bi-trash"></i>
                </button>
            </td>`;
            tbodyCategoria.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        alertError(error.message);
    }
};

const editarCategoria = async (id) => {
    try {
        const response = await fetch(`/api/categoria/${id}`);
        if (!response.ok) throw new Error('Error al obtener la categoría');
        const categoria = await response.json();
        
        if (categoria) {
            $('#nombre').value = categoria[0].nombre;
            $('#descripcion').value = categoria[0].descripcion;
            openModalCategoria(id, 'Editar Categoría', 'Actualizar', actualizarCategoria);
        }
    } catch (error) {
        console.error('Error al obtener categoría:', error);
        alertError(error.message);
    }
};

const actualizarCategoria = async (id) => {
    const nombre = $('#nombre').value;
    const descripcion = $('#descripcion').value;
    try {
        const response = await fetch('/api/categoria/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, descripcion, id }),
        });

        const result = await response.json();
        showSuccessModal(result.message);
        obtenerCategorias();
        resetModalCategoria();
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        alertError('Error al actualizar la categoría.');
    }
};

const guardarCategoria = async () => {
    const nombre = $('#nombre').value;
    const descripcion = $('#descripcion').value;

    try {
        const response = await fetch('/api/categoria/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, descripcion }),
        });

        const result = await response.json();
        showSuccessModal(result.message);
        obtenerCategorias();
        resetModalCategoria();
    } catch (error) {
        console.error('Error al guardar categoría:', error);
        alertError('Error al guardar la categoría.');
    }
};


const eliminarCategoria = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
        try {
            const response = await fetch(`/api/categoria/delete/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            showSuccessModal(result.message);
            obtenerCategorias();
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            alertError('Error al eliminar la categoría.');
        }
    }
};

const resetModalCategoria = () => {
    $('#categoriaForm').reset();
    const modal = $('#categoriaModal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    $('#categoriaModalLabel').textContent = 'Agregar Categoría';
    const saveButton = $('#saveCategoria');
    saveButton.textContent = 'Guardar';
    saveButton.onclick = guardarCategoria;
};

const openModalCategoria = (id, labelText, buttonText, saveFunction) => {
    $('#categoriaModalLabel').textContent = labelText;
    const saveButton = $('#saveCategoria');
    saveButton.textContent = buttonText;
    saveButton.onclick = () => saveFunction(id);
    const modal = new bootstrap.Modal($('#categoriaModal'));
    modal.show();
};

