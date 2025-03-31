import Swal from 'sweetalert2';

//Muestra un mensaje de éxito
export const showSuccessMessage = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'Accept',
    confirmButtonColor: '#3085d6',
  });
};

//Muestra un mensaje de error
export const showErrorMessage = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'Accept',
    confirmButtonColor: '#d33',
  });
};

//Muestra un mensaje de advertencia
export const showWarningMessage = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    confirmButtonText: 'Accept',
    confirmButtonColor: '#f8bb86',
  });
};

//Muestra un mensaje de información
export const showInfoMessage = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonText: 'Accept',
    confirmButtonColor: '#3085d6',
  });
};

//Muestra un mensaje de confirmación
export const showConfirmMessage = (title, text, confirmButtonText = 'Sí', cancelButtonText = 'No') => {
  return Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  });
};

//Muestra un mensaje de carga
export const showLoadingMessage = (title = 'Loading...') => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

//Cierra cualquier alerta que esté abierta
export const closeAlert = () => {
  Swal.close();
};