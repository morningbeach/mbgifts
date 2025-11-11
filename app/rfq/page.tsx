export default function RFQ() {
  return (
    <section>
      <h1>Request a Quote</h1>
      <form method="post" action="/api/rfq">
        <input name="company" placeholder="Company" required />
        <input name="email" placeholder="Email" required />
        <input name="quantity" type="number" placeholder="Quantity" required />
        <input name="unit_budget" type="number" step="0.01" placeholder="Unit Budget (USD)" />
        <textarea name="notes" placeholder="Notes"></textarea>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
