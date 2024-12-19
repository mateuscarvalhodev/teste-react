import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from './dropdown-menu'
import { Button } from './button';
import { ScrollArea } from './scroll-area';

type MultiSelectDropdownProps = {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
}
export const MultiSelectDropdown = ({ categories, selectedCategories, setSelectedCategories }: MultiSelectDropdownProps) => {

  const handleSelectCategories = (category: string, isChecked: boolean) => {
    setSelectedCategories((prev) =>
      isChecked
        ? [...prev, category]
        : prev.filter((c) => c !== category)
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          Categorias ({selectedCategories.length})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full'>
        <DropdownMenuLabel>Categorias</DropdownMenuLabel>
        <ScrollArea className='h-72 w-48 rounded-md border'>
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={(isChecked) =>
                handleSelectCategories(category, isChecked)
              }
              className='cursor-pointer'
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

