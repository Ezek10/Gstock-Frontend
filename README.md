# React + Vite

Este template proporciona una configuración mínima para hacer funcionar React con Vite, con HMR y algunas reglas de ESLint.

Actualmente, dos plugins oficiales están disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): utiliza [Babel](https://babeljs.io/) para **Fast Refresh**.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): utiliza [SWC](https://swc.rs/) para **Fast Refresh**.

---

## **Transacciones**

### **Stock**
- [x] **Agregar Compra**
  - Mejora de funcionalidades:
    - Select
    - El proveedor deja de activar el carrito.
    - Producto, cantidad y precio unitario se comportan separados.
    - Las modificaciones al producto unitario afectan tanto el objeto a enviar como la visualización del **TOTAL**.
  - Manejo del selector después de agregar la lista de productos. *(BUG)*
- [x] **Venta**
  - Agregado campo **teléfono** (number).
  - Fix en la sección **IMEI** select.
  - Selects similares al **select de compra**.
  - Nuevo **select canal de venta**.
- [x] **Detalle**
  - Fix: observaciones que a veces se quedan pegadas.

---

### **Transacciones**
- **Venta**
  - [x] Guardar cambios.
  - [x] Eliminar transacción.
  - [x] Campos editables:
    - Cliente, teléfono, email.
    - Vendedor.
  - [x] Agregar canje funcional.
- **Tabla**
  - [x] Filtros funcionales.
- **Ambos**
  - [x] Cuando seleccionas una transacción, se cargan sus datos correctamente, pero al seleccionar otra del mismo tipo, los datos de la transacción anterior persisten. *(BUG Fix)*
- **Compra**
  - [x] Botones de **estado mutable**.
  - [x] Inputs reactivos.

---

### **Actualización General**
- [x] Tablas ahora cargan correctamente los productos y actualizan.

---

## **Otras Mejoras**
- [x] Diseño de select tipo **Mac** para todos. Default para Mac.
- [-] Parseo de números: evitar que coloque un **0 adelante**.
- [x] Eliminar transacciones de tipo **venta** y **compra**.
- [x] Botón de edición de transacción de compra: cambiar **estado** (`Disponible -> Reservado -> Fallado -> Roto`). Solo guarda cambios al **guardar**.
- [x] Mapeo de **tipo de pago**.

---

## **Update 5-12**
- [x] Los desplegables no están bien alineados.
- [x] La edición de transacción de compra tiene problemas con el carrito:
  - Al borrar productos, estos no desaparecen hasta agregar uno nuevo.
  - Al agregar 2 productos diferentes, a partir del segundo, el carrito se sobrescribe.

---

## **Actualización Responsive**
- [x] **Sección Stock**: tabla.
- [x] **Sección Stock - GroupDetail**: tabla.
- [ ] **Sección Transacciones**: tabla.
- [x] **Sección Stock - Venta**.
- [x] **Sección Stock - Compra**.
- [ ] **Sección Transferencias - Compra**.
- [ ] **Sección Transferencias - Venta**.
