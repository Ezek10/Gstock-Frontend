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
[x] - Stock -> detalle -> A veces las observaciones se quedan pegadas

[x] - Transacciones -> VENTA -> Guardar Cambios
[x] - Transacciones -> VENTA -> Eliminar transaccion
[x] - Transacciones -> VENTA -> Campo editable Cliente, telefono, email
[x] - Transacciones -> VENTA -> Campo editable Vendedor
[x] - Transacciones -> VENTA -> Agregar canje funcional
[x] - Transacciones -> Tabla -> Filtros funcionales
[x] - Transacciones -> Ambos -> cuando seleccionas una transacción se cargan sus datos en la pantalla de edición, pero cuando seleccionas otra transacción del mismo tipo se quedan los datos de la transacción anterior
[x] - Transacciones -> COMPRA -> Botones de Estado mutables
[x] - Transacciones -> COMPRA -> Inputs reactivos
[x] - UPDATE GENERAL -> Tablas ahora cargan de manera correcta el producto y actualizan

[x] - Select diseño tipo mac para todos. Y para mac default.
[-] - Parseo de numeros evitar que coloque el 0 adelante.

[x] - Eliminar transacciones tipo venta y tipo compra.
[x] - Boton de edicion de transaccion de compra, cambiar el estado. Disponible-reservado-fallado-roto. Dispatchea solamente al guardar.
[x] - Mapeo de tipo de Pago

update - 5-12
[x] - los desplegables no están bien alineados
[x] - la edición de transacción de compra anda mal el carrito. A la hora de borrar productos no los borra hasta que le das a agregar un producto nuevo. Y cuando queres agregar 2 productos diferentes desde ese segundo producto se pisa todo el carrito


Update responsive:
[x] - Sección stock tabla
[] - Sección transacciones tabla
[] - Sección de stock - venta
[] - Sección de stock - compra
[] - Sección de transferencias - compra
[] - Sección de transferencias - venta