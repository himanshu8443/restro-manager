import pdfMake from "pdfmake/build/pdfmake";

pdfMake.fonts = {
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

function generateBillPDF(orderData: any) {
  // Format date
  const formattedDate = new Date(orderData.paymentDate).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  // Calculate table data
  const tableBody = [
    [
      { text: "Item", style: "tableHeader", bold: true },
      { text: "Quantity", style: "tableHeader", bold: true },
      { text: "Price", style: "tableHeader", bold: true },
      { text: "Total", style: "tableHeader", bold: true },
    ],
  ];

  orderData.products.forEach((product: any) => {
    const itemTotal = product.productId.price * product.quantity;
    tableBody.push([
      product.productId.name,
      product.quantity.toString(),
      `₹${product.productId.price}`,
      `₹${itemTotal}`,
    ]);
  });

  // Define the document definition
  const docDefinition: any = {
    content: [
      {
        text: "RESTAURANT NAME",
        style: "header",
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      {
        text: "Tax Invoice",
        style: "subheader",
        alignment: "center",
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          {
            width: "*",
            text: [
              { text: "Customer Details\n", style: "sectionHeader" },
              { text: `Name: ${orderData.customerName}\n` },
              { text: `Phone: ${orderData.customerPhone}\n` },
            ],
          },
          {
            width: "*",
            text: [
              { text: "Order Details\n", style: "sectionHeader" },
              { text: `Order ID: ${orderData._id}\n` },
              { text: `Date: ${formattedDate}\n` },
              { text: `Payment Method: ${orderData.paymentMethod}\n` },
              { text: `Status: ${orderData.status}\n` },
            ],
          },
        ],
        margin: [0, 0, 0, 20],
      },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto"],
          body: tableBody,
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          { width: "*", text: "" },
          {
            width: "auto",
            table: {
              body: [
                ["Subtotal:", `₹${orderData.total}`],
                ["Tax (Included):", "₹0"],
                [
                  { text: "Total:", bold: true },
                  { text: `₹${orderData.total}`, bold: true },
                ],
              ],
            },
            layout: "noBorders",
          },
        ],
      },
      {
        text: "\n\nThank you for your business!",
        style: "footer",
        alignment: "center",
        margin: [0, 20, 0, 0],
      },
    ],
    styles: {
      font: "Roboto",
      header: {
        fontSize: 22,
        bold: true,
      },
      subheader: {
        fontSize: 16,
        bold: true,
      },
      sectionHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 5],
      },
      tableHeader: {
        fontSize: 12,
        bold: true,
      },
      footer: {
        fontSize: 12,
        italic: true,
      },
    },
    defaultStyle: {
      fontSize: 10,
    },
  };

  // Generate PDF
  return pdfMake.createPdf(docDefinition);
}

// Usage example:
export function generateAndDownloadPDF(orderData: any) {
  const pdfDoc = generateBillPDF(orderData);
  pdfDoc.download(`bill_${orderData._id}.pdf`);
}

// To open in new window instead of downloading
export function generateAndOpenPDF(orderData: any) {
  const pdfDoc = generateBillPDF(orderData);
  pdfDoc.open();
}
