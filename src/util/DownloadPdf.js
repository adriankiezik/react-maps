import jsPDF from "jspdf";
import "jspdf-autotable";
import latinize from "latinize";

const DownloadPdf = (routeNavInfo, totalDistance, totalPrice) => {
  if (routeNavInfo == null) {
    alert(
      "Informacje odnośnie trasy nie zostały jeszcze załadowane. Spróbuj ponownie."
    );
    return;
  }

  const doc = new jsPDF();

  const tableColumn = [
    { header: "nr", dataKey: "nr" },
    { header: "Czas", dataKey: "time" },
    { header: "Odleglosc", dataKey: "distance" },
    { header: "Instrukcja", dataKey: "instruction" },
  ];
  const tableRows = [];

  routeNavInfo.instructions.forEach((instruction, index) => {
    const instructionData = {
      nr: ++index,
      // Convert polish characters with latin ones,
      // since jspdf doesn't support them
      instruction: latinize(instruction.text),
      time: Math.round(instruction.time / 60) + " min",
      distance:
        instruction.distance >= 1000
          ? (instruction.distance / 1000).toFixed(1) + " km"
          : Math.round(instruction.distance) + " m",
    };
    tableRows.push(instructionData);
  });

  doc.autoTable({
    columns: tableColumn,
    body: tableRows,
    margin: { top: 20 },
    didDrawPage: () => {
      doc.text(
        `Koszt: ${totalPrice} zl, trasa: ${(totalDistance / 1000).toFixed(
          2
        )} km`,
        14,
        15
      );
    },
  });
  doc.setFont("Helvetica");

  doc.save("nawigacja.pdf");
};

export default DownloadPdf;
