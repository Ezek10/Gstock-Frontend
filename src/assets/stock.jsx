const stock = {
  detail: "string",
  result: {
    page_number: 0,
    page_size: 0,
    total_pages: 0,
    total_record: 0,
    content: [
      {
        id: 0,
        name: "Iphone 15",
        list_price: 1000,
        stocks: [
          {
            id: 0,
            serial_id: "0000",
            color: "negro",
            battery_percent: 100,
            state: "Disponible",
            buy_price: 1500,
            supplier: {
              id: 0,
              name: "Marcos",
              color: "#B43210"
            },
            observations: "string"
          },
          {
            id: 1,
            serial_id: "0001",
            color: "negro",
            battery_percent: 90,
            state: "Disponible",
            buy_price: 1400,
            supplier: {
              id: 0,
              name: "Marcos",
              color: "#B43210"
            },
            observations: "string"
          },
          {
            id: 2,
            serial_id: "0002",
            color: "rojo",
            battery_percent: 90,
            state: "fallado",
            buy_price: 900,
            supplier: {
              id: 1,
              name: "Eze",
              color: "#B65489"
            },
            observations: "string"
          }
        ]
      },
      {
        id: 1,
        name: "Iphone 16",
        list_price: 2000,
        stocks: [
          {
            id: 0,
            serial_id: "0003",
            color: "blanco",
            battery_percent: 100,
            state: "disponible",
            buy_price: 0,
            supplier: {
              id: 1,
              name: "Eze",
              color: "#B65489"
            },
            observations: "string"
          }
        ]
      },
      {
        id: 2,
        name: "Iphone 16 Plus",
        list_price: 2100,
        stocks: [
          {
            id: 0,
            serial_id: "0004",
            color: "blanco",
            battery_percent: 100,
            state: "Disponible",
            buy_price: 0,
            supplier: {
              id: 1,
              name: "Eze",
              color: "#B65489"
            },
            observations: "string"
          }
        ]
      },
      {
        id: 3,
        name: "Iphone 15 plus",
        list_price: 1600,
        stocks: [
          {
            id: 0,
            serial_id: "0005",
            color: "azul",
            battery_percent: 100,
            state: "Disponible",
            buy_price: 0,
            supplier: {
              id: 0,
              name: "string",
              color: "#B43210"
            },
            observations: "string"
          }
        ]
      }
    ]
  }
}

export default stock;