interface FareSummaryProps {
  display: string;
  explanation: string;
}

export default function FareSummary({ display, explanation }: FareSummaryProps) {
  return (
    <div className="bg-[#FAFDFB] rounded-2xl p-3.5 border border-emerald-100 flex items-center justify-between">
      <div>
        <span className="text-[11px] font-semibold text-gray-500 uppercase">
          Estimated Fare
        </span>
        <p className="text-xl font-black text-[#146C36]">{display}</p>
        <span className="block text-[11px] text-gray-500">{explanation}</span>
      </div>
      <div className="text-right text-[11px] text-gray-500">
        <span className="block font-medium text-emerald-800">No hidden extras</span>
        <span>Pay cash, card, or EFT</span>
      </div>
    </div>
  );
}
