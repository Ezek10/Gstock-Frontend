# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Transacciones --> 
[x] - Stock -> Agregar compra -> Mejora de funcionalidades.
    - Select 
    - Proveedor deja de activar el carrito
    - Producto, cantidad, precio unitario se comportan separados
    - Modificaciones al producto unitario como tal, afecta el objeto a enviar y también la visual del TOTAL.
    
[] - Stock -> Agregar Compra -> Manejo del selector una vez agregada la lista de productos(BUG)
[] - Seleccionas una transaccion ya creada
[] - Se mostraban los valores por default y no
[] - los pasados por props
[] - Input de transacciones, muestra los valores normal
[] - Canal de venta editable (HAcer editable)
[] - Vendedor hacer editable
[] - Value sin cursor pointer y el accionar donde corresponda
[] - Validar con figma los textos y diseño 
[] - Select diseño tipo mac para todos. Y para mac default.
[] - Precio de venta a la hora de targetear un imei, mostrar esto, en el caso de no tener toma el precio general.
[] - Parseo de numeros evitar que coloque el 0 adelante.
[] - Eliminar transacciones tipo venta y tipo compra. ATENTO A ESTO.
[] - Boton de edicion de transaccion de compra, cambiar el estado. Disponible-reservado-fallado-roto. Dispatchea solamente al guardar.
[] - Checkeo y modal para cuando se edite algo del sidebar
[] - Mapeo de tipo de Pago al i18n