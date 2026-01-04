import { useState } from "react";
import { supabase } from "./supabase-client";

export default function CreditCard({
  id,
  card_name,
  card_number,
  card_expiry,
  gradient,
  is_paid,
}) {
  const [paid, setPaid] = useState(is_paid);

  const handlePaidToggle = async (e) => {
     e.preventDefault();
     const { error } = await supabase.from("credit_cards").update({is_paid:!paid}).eq("id",id)
     if (!error) {
       setPaid(!paid)
     } else {
       console.error(error)
     }
  }

  const copyNumber = async () => {
    await navigator.clipboard.writeText(card_number);
    alert("Card number copied!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Card Header */}
      <div
        className={`bg-gradient-to-br ${gradient} text-white px-6 py-6 relative`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold">{card_name}</h2>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                paid ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
              }`}>
                {paid ? "✓ Paid" : "Pending"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg tracking-wider font-mono">
              {card_number && String(card_number).replace(/(\d{4})(?=\d)/g, '$1 ')}
            </p>
            <p className="text-sm opacity-90">Expiry {card_expiry.slice(0,7).replace(/^(\d{4})-(\d{2})/, '$2/$1').slice(0,5)}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-5 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">
              Payment Status:
            </span>

            <button
              onClick={(e) => handlePaidToggle(e)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                paid
                  ? "bg-green-100 text-green-800 border border-green-200 hover:bg-green-200 focus:ring-green-500"
                  : "bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 focus:ring-red-500"
              }`}
            >
              {paid ? "✓ Paid" : "Mark as Paid"}
            </button>
          </div>

          <button
            onClick={copyNumber}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
