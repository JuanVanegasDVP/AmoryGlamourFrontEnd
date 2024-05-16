import React from "react";
import Swal from "sweetalert2";
import axios from 'axios';

const BotonActualizar = ({ actualizarUsuario, usuarioEditando, data, setData, setModalEditarOpen }) => {
  const handleClick = async () => {
    actualizarUsuario(usuarioEditando, data, setData, setModalEditarOpen);
    try {
      await actualizarUsuario();
      mostrarAlerta();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      Swal.fire({
        title: "Error!",
        text: "Ocurrió un error al actualizar el usuario.",
        icon: "error",
      });
    }
  };

  const mostrarAlerta = () => {
    Swal.fire({
      title: "Actualizado!",
      text: "Se actualizó con éxito.",
      icon: "success",
    });
  };

  return (
    <button
      style={{ marginLeft: 1 }}
      className="btn btn-warning"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-pencil"
        viewBox="0 0 16 16"
      >
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
      </svg>
    </button>
  );
};

export default BotonActualizar;
