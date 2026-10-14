import { SERVICE_CATEGORIES } from "@/lib/booking";

interface ServiceCategorySelectorProps {
  value: string;
  onChange: (id: string) => void;
}

export default function ServiceCategorySelector({
  value,
  onChange,
}: ServiceCategorySelectorProps) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
        Service Category
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SERVICE_CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
              value === category.id
                ? "bg-[#146C36] text-white border-[#146C36] shadow-sm"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
