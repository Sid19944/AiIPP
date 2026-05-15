import { LucideProps } from "lucide-react";

export interface Difficulty {
  id: string;
  label: string;
  icon: React.ComponentType<LucideProps>;
  color: string;
  bg: string;
  border: string;
  desc: string;
  time: string;
  tag: string;
}
