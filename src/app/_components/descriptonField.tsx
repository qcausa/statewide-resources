// components/DescriptionField.tsx
import * as React from "react";

import { Label } from "@/components/ui/label"; // optional: if you want to label the field
import { Textarea } from "@/components/ui/textarea"; // adjust the import path based on your setup

type DescriptionFieldProps = {
  description: string;
  isAuthorized: boolean;
  onChange?: (newDescription: string) => void;
};

export const DescriptionField: React.FC<DescriptionFieldProps> = ({
  description,
  isAuthorized,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="">
      <Label htmlFor="description" className="absolute text-xs text-white">
        Description
      </Label>
      {isAuthorized ? (
        <Textarea
          id="description"
          value={description}
          onChange={handleChange}
          placeholder="Enter description..."
          className="resize-none bg-transparent text-white"
        />
      ) : (
        <div className="w-full rounded-md bg-slate-50/10 px-3 py-5">
          {description || "No description available."}
        </div>
      )}
    </div>
  );
};
