export default function SignalsTable({ data }) {

  const generateSignals = (dataArray) => {
    return dataArray.map((item) => {
      let signal = "HOLD";

      if (item.RSI < 30) signal = "BUY";
      else if (item.RSI > 70) signal = "SELL";

      return {
        date: item.date,
        price: item.close,
        rsi: item.RSI,
        signal,
      };
    });
  };

  const signals = data ? generateSignals(data) : [];

  if (!signals.length) return <p>No data yet</p>;

  return (
    <table style={{ width: "100%", marginTop: "10px" }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Price</th>
          <th>RSI</th>
          <th>Signal</th>
        </tr>
      </thead>

      <tbody>
        {signals.map((row, idx) => (
          <tr key={idx}>
            <td>{row.date}</td>
            <td>{row.price}</td>
            <td>{row.rsi}</td>
            <td style={{
              color:
                row.signal === "BUY"
                  ? "#22c55e"
                  : row.signal === "SELL"
                  ? "#f87171"
                  : "#94a3b8",
              fontWeight: "600"
            }}>
              {row.signal}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}