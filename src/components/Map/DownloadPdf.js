const DownloadPdf = (routeNavInfo) => {
  if (routeNavInfo == null) {
    alert(
      "Informacje odnośnie trasy nie zostały jeszcze załadowane. Spróbuj ponownie."
    );
    return;
  }

  console.log(routeNavInfo);
};

export default DownloadPdf;
