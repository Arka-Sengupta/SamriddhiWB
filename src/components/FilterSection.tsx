
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterSectionProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (open: boolean) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  showInStockOnly: boolean;
  setShowInStockOnly: (show: boolean) => void;
  clearFilters: () => void;
  locations: string[];
  priceRanges: { label: string; min: number; max: number }[];
}

const FilterSection = ({
  isFiltersOpen,
  setIsFiltersOpen,
  selectedLocation,
  setSelectedLocation,
  selectedPriceRange,
  setSelectedPriceRange,
  showInStockOnly,
  setShowInStockOnly,
  clearFilters,
  locations,
  priceRanges
}: FilterSectionProps) => {
  return (
    <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="md:w-auto border-gray-600 text-secondary-text hover:text-white relative overflow-hidden group transition-all duration-500 hover:border-transparent"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
          <Filter className="h-4 w-4 mr-2 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative z-10">Filters</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-dark-container border-gray-600 text-primary-text z-50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="bg-dark-base border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-black shadow-lg">
                {locations.map(location => (
                  <SelectItem 
                    key={location} 
                    value={location}
                    className="text-black cursor-pointer relative overflow-hidden group transition-all duration-300 hover:bg-transparent"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                    <span className="relative z-10 group-hover:font-bold group-hover:text-white transition-all duration-300 group-hover:scale-105 group-hover:text-shadow-lg">
                      {location}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Price Range</label>
            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger className="bg-dark-base border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-black shadow-lg">
                {priceRanges.map(range => (
                  <SelectItem 
                    key={range.label} 
                    value={range.label}
                    className="text-black cursor-pointer relative overflow-hidden group transition-all duration-300 hover:bg-transparent"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                    <span className="relative z-10 group-hover:font-bold group-hover:text-white transition-all duration-300 group-hover:scale-105 group-hover:text-shadow-lg">
                      {range.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inStock"
              checked={showInStockOnly}
              onChange={(e) => setShowInStockOnly(e.target.checked)}
              className="rounded border-gray-600"
            />
            <label htmlFor="inStock" className="text-sm">In stock only</label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterSection;
