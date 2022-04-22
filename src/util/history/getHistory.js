const getHistory = () => {
  if (sessionStorage.getItem("history") == null) return null;

  const historyJson = sessionStorage.getItem("history");
  const history = JSON.parse(historyJson);

  return history;
};

export default getHistory;
