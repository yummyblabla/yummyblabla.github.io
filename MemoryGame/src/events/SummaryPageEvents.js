const summaryPageEventParser = (game, canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  console.log(x, y);
};

export default summaryPageEventParser;
