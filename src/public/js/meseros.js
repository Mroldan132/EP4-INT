const obtenerMeseros = async () => {
    try {
        const response = await fetch('/api/meseros');
        if (!response.ok) throw new Error('Error al obtener los meseros');
        const meseros = await response.json();
        const tbodyMeseros = $('#tbody-mesero');
        tbodyMeseros.innerHTML = '';
        meseros.forEach((mesero) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${mesero.idmesero}</td>
            <td>${mesero.nombre}</td>
            <td>${mesero.email}</td>
            <td>${mesero.telefono}</td>
            <td>
                <button class="btn btn-sm btn-editar" onclick="editarMesero(${mesero.idmesero})" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm btn-eliminar" onclick="eliminarMesero(${mesero.idmesero})" title="Eliminar">
                    <i class="bi bi-trash"></i>
                </button>
            </td>`;
            tbodyMeseros.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los meseros:', error);
        alertError(error.message);
    }
};

const editarMesero = async (id) => {
    try {
        const response = await fetch(`/api/mesero/${id}`);
        if (!response.ok) throw new Error('Error al obtener el mesero');
        const mesero = await response.json();
        if (mesero) {
            $('#nombre').value = mesero[0].nombre;
            $('#telefono').value = mesero[0].telefono;
            $('#email').value = mesero[0].email;
            openModalMesero(id, 'Editar Mesero', 'Actualizar', actualizarMesero);
        }
    } catch (error) {
        console.error('Error al obtener el mesero:', error);
        alertError(error.message);
    }
};

const actualizarMesero = async (id) => {
    const nombre = $('#nombre').value;
    const telefono = $('#telefono').value;
    const email = $('#email').value;
    try {
        const response = await fetch('/api/mesero/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id,nombre,email,telefono }),
        });

        const result = await response.json();
        showSuccessModal(result.message);
        obtenerMeseros();
        resetModalMesero();
    } catch (error) {
        console.error('Error al actualizar el mesero:', error);
        alertError('Error al actualizar el mesero.');
    }
};

const guardarMesero = async () => {
    const nombre = $('#nombre').value;
    const telefono = $('#telefono').value;
    const email = $('#email').value;

    try {
        const response = await fetch('/api/mesero/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, telefono,email }),
        });

        const result = await response.json();
        showSuccessModal(result.message);
        obtenerMeseros();
        resetModalMesero();
    } catch (error) {
        console.error('Error al guardar el mesero:', error);
        alertError('Error al guardar la mesero.');
    }
};


const eliminarMesero = async (id) => {
    if (confirm('¿Estás seguro de eliminar este mesero?')) {
        try {
            const response = await fetch(`/api/mesero/delete/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            showSuccessModal(result.message);
            obtenerMeseros();
        } catch (error) {
            console.error('Error al eliminar el mesero:', error);
            alertError('Error al eliminar el mesero.');
        }
    }
};

const resetModalMesero = () => {
    $('#meseroForm').reset();
    const modal = $('#meseroModal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    $('#meseroModalLabel').textContent = 'Agregar Categoría';
    const saveButton = $('#saveMesero');
    saveButton.textContent = 'Guardar';
    saveButton.onclick = guardarMesero;
};

const openModalMesero = (id, labelText, buttonText, saveFunction) => {
    $('#meseroModalLabel').textContent = labelText;
    const saveButton = $('#saveMesero');
    saveButton.textContent = buttonText;
    saveButton.onclick = () => saveFunction(id);
    const modal = new bootstrap.Modal($('#meseroModal'));
    modal.show();
};


