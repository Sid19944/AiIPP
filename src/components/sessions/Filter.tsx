"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Filter({
  value,
  setValue,
  options,
}: {
  value: string;
  setValue: (val: string) => void;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={(val) => setValue(val)}>
      <SelectTrigger className="w-full max-w-48 cursor-pointer">
        <SelectValue placeholder="All Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          {options.map((el, idx) => (
            <SelectItem value={el} key={idx} className="cursor-pointer">
              {el}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Filter;
