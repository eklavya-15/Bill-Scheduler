import { useEffect, useState } from "react";
import CreditCard from "./CreditCard";
import { supabase } from "./supabase-client";


export default function Dashboard() {
  const [creditCards, setCreditCards] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    card_name: "",
    card_number: "",
    card_expiry: "",
  });

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from("credit_cards")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setCreditCards(data || []);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addCard = async () => {
    const { error } = await supabase.from("credit_cards").insert([
      {
        card_name: form.card_name,
        card_number: form.card_number,
        card_expiry: form.card_expiry,
        is_paid: false,
      },
    ]);

    if (error) {
      console.error(error);
      return;
    }

    setOpen(false);
    setForm({
      card_name: "",
      card_number: "",
      card_expiry: "",
    });

    fetchCards();
  };

  return (
    <div className="min-h-screen">
      {/* Header */} <header className="bg-black text-white py-16 shadow-xl relative overflow-hidden"> <div className="relative max-w-7xl mx-auto px-6 lg:px-8"> <div className="text-center"> <h1 className="text-4xl md:text-6xl font-bold flex items-center justify-center gap-4 mb-6">
              🔔 Credit Card Bill Pay Reminder
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto mt-4">
              <span className="font-semibold">Never Miss a Payment!</span> Stay on top of your credit card bills.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-indigo-50 transition mt-8"
          >
            + Add Credit Card
          </button>
        </div>
      </header>

      {/* Cards */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {creditCards.map((card) => (
            <div
              key={card.id}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <CreditCard {...card} />
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-4">Add Credit Card</h2>

            <div className="space-y-3">
              <input
                name="card_name"
                placeholder="Card Name"
                value={form.card_name}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />

              <input
                name="card_number"
                placeholder="Card Number"
                value={form.card_number}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />

              <input
                type="date"
                name="card_expiry"
                value={form.card_expiry}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />

            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={addCard}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
