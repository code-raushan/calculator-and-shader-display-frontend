import type { FC } from "react";

interface DisplayProps {
  value: string;
}
const Display: FC<DisplayProps> = ({ value }) => {
  return (
    <div className="bg-stone-900 text-white text-2xl font-light text-right p-4 rounded-lg overflow-x-auto">
      {value}
    </div>
  );
};

export default Display;
