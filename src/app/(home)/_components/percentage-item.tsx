import React from "react";
type PercentageItemProps = {
  icon: React.ReactNode;
  title: string;
  value: number;
};
export default function PercentageItem({
  icon,
  title,
  value,
}: PercentageItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
}
