import type { ComponentType } from "react";

// interface is used to define shape
export interface Step {
  id: number;
  label: string;
  component: ComponentType;
}
