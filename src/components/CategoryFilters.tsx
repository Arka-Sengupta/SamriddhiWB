
import { Button } from '@/components/ui/button';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryFilters = ({ categories, selectedCategory, setSelectedCategory }: CategoryFiltersProps) => {
  const gradients = [
    'from-violet-500 via-purple-500 to-pink-500', // All
    'from-rose-500 via-red-500 to-orange-500', // Textiles
    'from-amber-500 via-yellow-500 to-lime-500', // Handicrafts
    'from-emerald-500 via-green-500 to-teal-500', // Eco-Products
    'from-cyan-500 via-blue-500 to-indigo-500', // Metalwork
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 md:mb-8 justify-center md:justify-start">
      {categories.map((category, index) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => setSelectedCategory(category)}
          size="sm"
          className={`text-xs md:text-sm relative overflow-hidden group transition-all duration-500 ${
            selectedCategory === category 
              ? "bg-terracotta hover:bg-terracotta/90 text-white border-terracotta" 
              : "border-gray-600 text-secondary-text hover:text-white hover:border-transparent"
          }`}
        >
          {selectedCategory !== category && (
            <>
              <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index]} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
            </>
          )}
          <span className="relative z-10 group-hover:font-semibold transition-all duration-300">
            {category}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilters;
