"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Run {
  value: string;
  label: string;
}

interface SelectRunProps {
  placeholder: string;
  emptySearchLabel: string;
  runs: Array<Run>;
  selectedRun?: string;
  onSelectedRun: (run: string) => void;
}

const SelectRun: React.FC<SelectRunProps> = ({
  placeholder,
  emptySearchLabel,
  runs,
  selectedRun,
  onSelectedRun,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedRun
            ? runs.find((run) => run.value === selectedRun)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptySearchLabel}</CommandEmpty>
            <CommandGroup>
              {runs.map((run) => (
                <CommandItem
                  key={run.value}
                  value={run.value}
                  onSelect={(currentValue) => {
                    onSelectedRun(currentValue);
                    setOpen(false);
                  }}
                >
                  {run.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export { SelectRun };
