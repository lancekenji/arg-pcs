export type DialogVariant = "success" | "error" | "warning" | "info";

export interface DialogPayload {
  variant: DialogVariant;

  title: string;

  description: string;

  buttonText?: string;
}
