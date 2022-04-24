const addToHistory = (routeInfo) => {
  if (routeInfo.startPosition == null || routeInfo.endPosition == null) return;
  if (sessionStorage.getItem("history") == null) {
    sessionStorage.setItem(
      "history",
      JSON.stringify([
        { start: routeInfo.startPosition[0], end: routeInfo.endPosition[0] },
      ])
    );
  } else {
    const history = JSON.parse(sessionStorage.getItem("history"));
    const lastElem = history[0];

    // Don't add to history if queried same location
    if (
      lastElem.start == routeInfo.startPosition[0] &&
      lastElem.end == routeInfo.endPosition[0]
    )
      return;

    history.unshift({
      start: routeInfo.startPosition[0],
      end: routeInfo.endPosition[0],
    });

    const jsonHistory = JSON.stringify(history);
    sessionStorage.setItem("history", jsonHistory);
  }
};

export default addToHistory;
