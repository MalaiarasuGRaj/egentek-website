import { Button, type ButtonProps } from "@/components/ui/button";
import { APPLY_FORM_URL } from "@/lib/apply";

type ApplyButtonProps = {
  label?: string;
  className?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
};

export function ApplyButton({ label = "Apply", className, size, variant }: ApplyButtonProps) {
  if (!APPLY_FORM_URL) {
    return (
      <Button disabled className={className} size={size} variant={variant}>
        {label}
      </Button>
    );
  }

  return (
    <Button asChild className={className} size={size} variant={variant}>
      <a href={APPLY_FORM_URL} target="_blank" rel="noreferrer">
        {label}
      </a>
    </Button>
  );
}
