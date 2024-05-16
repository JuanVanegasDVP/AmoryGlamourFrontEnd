
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../assets/css/switch.css"
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

function Usuario() {


    {/*validacion*/ }
    const [errorMessages, setErrorMessages] = useState({
        tipoIdentificacionUsuario: '',
        numIdentificacionUsuario: '',
        nombreUsuario: '',
        apellidoUsuario: '',
        fechaNacimientoUsuario: '',
        emailUsuario: '',
        direccionUsuario: '',
        celularUsuario: '',
        idRol: '',
    });

    const resetErrorMessages = () => {
        setErrorMessages({
            tipoIdentificacionUsuario: '',
            numIdentificacionUsuario: '',
            nombreUsuario: '',
            apellidoUsuario: '',
            fechaNacimientoUsuario: '',
            emailUsuario: '',
            direccionUsuario: '',
            celularUsuario: '',
            idRol: '',
        });
    };

    const validarCampos = () => {
        const errors = {};
        let hasErrors = false;

        if (!nuevoUsuario.tipoIdentificacionUsuario) {
            errors.tipoIdentificacionUsuario = 'Campo requerido';
            hasErrors = true;
        }

        if (!nuevoUsuario.numIdentificacionUsuario) {
            errors.numIdentificacionUsuario = 'Campo requerido';
            hasErrors = true;
        } else if (!/^\d+$/.test(nuevoUsuario.numIdentificacionUsuario)) {
            errors.numIdentificacionUsuario = 'Debe ser un número';
            hasErrors = true;
        }

        if (!nuevoUsuario.nombreUsuario) {
            errors.nombreUsuario = 'Campo requerido';
            hasErrors = true;
        }

        if (!nuevoUsuario.apellidoUsuario) {
            errors.apellidoUsuario = 'Campo requerido';
            hasErrors = true;
        }

        if (!nuevoUsuario.fechaNacimientoUsuario) {
            errors.fechaNacimientoUsuario = 'Campo requerido';
            hasErrors = true;
        }

        if (!nuevoUsuario.emailUsuario) {
            errors.emailUsuario = 'Campo requerido';
            hasErrors = true;
        } else if (!/\S+@\S+\.\S+/.test(nuevoUsuario.emailUsuario)) {
            errors.emailUsuario = 'Formato de correo electrónico inválido';
            hasErrors = true;
        }

        if (!nuevoUsuario.direccionUsuario) {
            errors.direccionUsuario = 'Campo requerido';
            hasErrors = true;
        }

        if (!nuevoUsuario.celularUsuario) {
            errors.celularUsuario = 'Campo requerido';
            hasErrors = true;
        } else if (!/^\d+$/.test(nuevoUsuario.celularUsuario)) {
            errors.celularUsuario = 'Debe ser un número';
            hasErrors = true;
        }

        if (!nuevoUsuario.idRol) {
            errors.idRol = 'Campo requerido';
            hasErrors = true;
        }

        setErrorMessages(errors);
        return !hasErrors;
    };


    const [data, setData] = useState([]);
    const [isLoadingUsuarios, setIsLoadingUsuarios] = useState(true);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        tipoIdentificacionUsuario: '',
        numIdentificacionUsuario: '',
        nombreUsuario: '',
        apellidoUsuario: '',
        fechaNacimientoUsuario: '',
        emailUsuario: '',
        direccionUsuario: '',
        celularUsuario: '',
        idRol: '',
        estado: true
    });
    const [modalCrearOpen, setModalCrearOpen] = useState(false);
    const [modalEditarOpen, setModalEditarOpen] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    const handleChangeNuevoUsuario = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitCrearUsuario = async () => {
        try {

            resetErrorMessages();
            if (!validarCampos()) {
                return;
            }

            const response = await axios.post('http://localhost:3001/api/usuarios/crearUsuarios', nuevoUsuario);
            console.log('Usuario creado:', response.data);
            setData(prevData => [...prevData, response.data]);
            setModalCrearOpen(false);
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    const actualizarUsuario = async () => {
        try {
            if (!usuarioEditando || !usuarioEditando.idUsuario) {
                throw new Error("El usuario o su ID no están definidos");
            }
            const response = await axios.put(`http://localhost:3001/api/usuarios/actualizarUsuarios?id=${usuarioEditando.idUsuario}`, usuarioEditando);
            console.log('Usuario editado:', response.data);
            const newData = data.map(user => user.idUsuario === usuarioEditando.idUsuario ? usuarioEditando : user);
            setData(newData);
            setModalEditarOpen(false);

            Swal.fire({
                title: "Éxito!",
                text: "El usuario se ha actualizado correctamente.",
                icon: "success",
            });

        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            Swal.fire({
                title: "Error!",
                text: "Ocurrió un error al actualizar el usuario.",
                icon: "error",
            });
        }
    };

    const toggleUserState = idUsuario => {

        axios.put(`http://localhost:3001/api/Usuarios/cambiarEstadoUsuarios?id=${idUsuario}`)
            .then(response => {
                console.log('Respuesta de la API:', response.data);
            })
            .catch(error => {
                console.error('Error al cambiar el estado del usuario:', error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/usuarios/obtenerUsuarios');
                setData(response.data);
                setIsLoadingUsuarios(false);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                setIsLoadingUsuarios(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="Content content">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="search-container">
                                <InputGroup className="no-border">
                                    <Button color="primary" onClick={() => setModalCrearOpen(true)}>Crear Usuario</Button>
                                    <Input style={{ marginLeft: 500 }} placeholder="Buscar..." />
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                            <i className="nc-icon nc-zoom-split" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>

                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead className="text-primary">
                                <tr>
                                    <th>Tipo</th>
                                    <th>Número</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Fecha Nacimiento</th>
                                    <th>Email</th>
                                    <th>Dirección</th>
                                    <th>Celular</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((usuario) => (
                                    <tr key={usuario.idUsuario}>
                                        <td>{usuario.tipoIdentificacionUsuario}</td>
                                        <td>{usuario.numIdentificacionUsuario}</td>
                                        <td>{usuario.nombreUsuario}</td>
                                        <td>{usuario.apellidoUsuario}</td>
                                        <td>{new Date(usuario.fechaNacimientoUsuario).toLocaleString("es")}</td>
                                        <td>{usuario.emailUsuario}</td>
                                        <td>{usuario.direccionUsuario}</td>
                                        <td>{usuario.celularUsuario}</td>
                                        <td>{usuario.idRol}</td>
                                        <td>

                                            <label class="switch">
                                                <input type="checkbox" defaultChecked={usuario.estado} onChange={() => toggleUserState(usuario.idUsuario)}/>
                                                <div class="slider"></div>
                                                <div class="slider-card">
                                                    <div class="slider-card-face slider-card-front"></div>
                                                    <div class="slider-card-face slider-card-back"></div>
                                                </div>
                                            </label>
                                        </td>
                                        <td>
                                            <Button color="warning" onClick={() => {
                                                setUsuarioEditando(usuario);
                                                setModalEditarOpen(true);
                                            }} style={{ display: 'flex', alignItems: 'center' }}>
                                                <i className="nc-icon nc-ruler-pencil" style={{ marginRight: '5px' }} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
            <Modal isOpen={modalCrearOpen} toggle={() => setModalCrearOpen(false)}>
                <ModalHeader toggle={() => setModalCrearOpen(false)}>Crear Usuario</ModalHeader>
                <ModalBody>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Tipo de Identificación</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="tipoIdentificacionUsuario" value={nuevoUsuario.tipoIdentificacionUsuario} onChange={handleChangeNuevoUsuario} />
                        {errorMessages.tipoIdentificacionUsuario && <span className="text-danger">{errorMessages.tipoIdentificacionUsuario}</span>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Número de Identificación</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="numIdentificacionUsuario" value={nuevoUsuario.numIdentificacionUsuario} onChange={handleChangeNuevoUsuario} />
                        {errorMessages.numIdentificacionUsuario && <span className="text-danger">{errorMessages.numIdentificacionUsuario}</span>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Nombre</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="nombreUsuario" value={nuevoUsuario.nombreUsuario} onChange={handleChangeNuevoUsuario} />
                        {errorMessages.nombreUsuario && <span className="text-danger">{errorMessages.nombreUsuario}</span>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Apellido</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="apellidoUsuario" value={nuevoUsuario.apellidoUsuario} onChange={handleChangeNuevoUsuario} />
                        {errorMessages.apellidoUsuario && <span className="text-danger">{errorMessages.apellidoUsuario}</span>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Fecha de Nacimiento</InputGroupText>
                        </InputGroupAddon>
                        <Input type="date" name="fechaNacimientoUsuario" value={nuevoUsuario.fechaNacimientoUsuario} onChange={handleChangeNuevoUsuario} />
                        {errorMessages.fechaNacimientoUsuario && <span className="text-danger">{errorMessages.fechaNacimientoUsuario}</span>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Email</InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="emailUsuario" value={nuevoUsuario.emailUsuario} onChange={handleChangeNuevoUsuario} />
                        {errorMessages.emailUsuario && <span className="text-danger">{errorMessages.emailUsuario}</span>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Dirección</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="direccionUsuario" value={nuevoUsuario.direccionUsuario} onChange={handleChangeNuevoUsuario} />
                        {errorMessages.direccionUsuario && <span className="text-danger">{errorMessages.direccionUsuario}</span>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Celular</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="celularUsuario" value={nuevoUsuario.celularUsuario} onChange={handleChangeNuevoUsuario} />
                        {errorMessages.celularUsuario && <span className="text-danger">{errorMessages.celularUsuario}</span>}
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Rol</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="idRol" value={nuevoUsuario.idRol} onChange={handleChangeNuevoUsuario} />
                        {errorMessages.idRol && <span className="text-danger">{errorMessages.idRol}</span>}
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmitCrearUsuario}>Crear</Button>{' '}
                    <Button color="secondary" onClick={() => setModalCrearOpen(false)}>Cancelar</Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalEditarOpen} toggle={() => setModalEditarOpen(false)}>
                <ModalHeader toggle={() => setModalEditarOpen(false)}>Editar Usuario</ModalHeader>
                <ModalBody>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Tipo de Identificación</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="tipoIdentificacionUsuario" value={usuarioEditando?.tipoIdentificacionUsuario} onChange={(e) => setUsuarioEditando(prevUser => ({ ...prevUser, tipoIdentificacionUsuario: e.target.value }))} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Número de Identificación</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="numIdentificacionUsuario" value={usuarioEditando?.numIdentificacionUsuario} onChange={(e) => setUsuarioEditando(prevUser => ({ ...prevUser, numIdentificacionUsuario: e.target.value }))} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Nombre</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="nombreUsuario" value={usuarioEditando?.nombreUsuario} onChange={(e) => setUsuarioEditando(prevUser => ({ ...prevUser, nombreUsuario: e.target.value }))} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Apellido</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="apellidoUsuario" value={usuarioEditando?.apellidoUsuario} onChange={(e) => setUsuarioEditando(prevUser => ({ ...prevUser, apellidoUsuario: e.target.value }))} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Fecha de Nacimiento</InputGroupText>
                        </InputGroupAddon>
                        <Input type="date" name="fechaNacimientoUsuario" value={usuarioEditando?.fechaNacimientoUsuario} onChange={(e) => setUsuarioEditando(prevUser => ({ ...prevUser, fechaNacimientoUsuario: e.target.value }))} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Email</InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="emailUsuario" value={usuarioEditando?.emailUsuario} onChange={(e) => setUsuarioEditando(prevUser => ({ ...prevUser, emailUsuario: e.target.value }))} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Dirección</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="direccionUsuario" value={usuarioEditando?.direccionUsuario} onChange={(e) => setUsuarioEditando(prevUser => ({ ...prevUser, direccionUsuario: e.target.value }))} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Celular</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="celularUsuario" value={usuarioEditando?.celularUsuario} onChange={(e) => setUsuarioEditando(prevUser => ({ ...prevUser, celularUsuario: e.target.value }))} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Rol</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="idRol" value={usuarioEditando?.idRol} onChange={(e) => setUsuarioEditando(prevUser => ({ ...prevUser, idRol: e.target.value }))} />
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={actualizarUsuario}>Guardar Cambios</Button>{' '}
                    <Button color="secondary" onClick={() => setModalEditarOpen(false)}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default Usuario;
