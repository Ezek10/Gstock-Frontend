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
    
[x] - Stock -> Agregar Compra -> Manejo del selector una vez agregada la lista de productos(BUG)
[x] - Stock -> Venta -> Campo tel number
[x] - Stock -> Venta -> Fix Seccion IMEI select
[x] - Stock -> Venta -> Selects similares al select de compra
[x] - Stock -> Venta -> Select Canal de venta

[x] - Transacciones -> VENTA -> Guardar Cambios
[x] - Transacciones -> VENTA -> Eliminar transaccion
[x] - Transacciones -> VENTA -> Campo editable Cliente, telefono, email
[x] - Transacciones -> VENTA -> Campo editable Vendedor
[x] - Transacciones -> VENTA -> Agregar canje funcional
[] - Transacciones -> COMPRA -> Botones de Estado mutables
[x] - UPDATE GENERAL -> Tablas ahora cargan de manera correcta el producto y actualizan

[] - Transacciones -> Input de transacciones, muestra los valores normal
[] - Transacciones -> Canal de venta editable (HAcer editable)
[] - Transacciones -> Vendedor hacer editable
[] - Transacciones ->Boton Value sin cursor pointer y el accionar donde corresponda
[] - Validar con figma los textos y diseño 
[] - Select diseño tipo mac para todos. Y para mac default.
[] - Precio de venta a la hora de targetear un imei, mostrar esto, en el caso de no tener toma el precio general.
[] - Parseo de numeros evitar que coloque el 0 adelante.
[x] - Eliminar transacciones tipo venta y tipo compra.
[x] - Boton de edicion de transaccion de compra, cambiar el estado. Disponible-reservado-fallado-roto. Dispatchea solamente al guardar.
[] - Transacción - Compra Guardar Cambios BUG.
[] - Checkeo y modal para cuando se edite algo del sidebar
[x] - Mapeo de tipo de Pago