import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,box-shadow,transform] " +
  "duration-200 ease-out active:translate-y-px";

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-accent text-background",
    "shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--color-accent)_55%,transparent)]",
    "hover:bg-accent-strong",
    "hover:shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--color-accent)_70%,transparent)]",
  ),
  secondary: cn(
    "border border-line bg-surface text-foreground",
    "hover:border-line-strong hover:bg-elevated",
  ),
  ghost: "text-muted hover:bg-elevated hover:text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "size-4",
  md: "size-4",
  lg: "size-[18px]",
};

/** Anchors get aria-disabled; buttons get the native disabled attribute. */
const disabledStyles =
  "disabled:pointer-events-none disabled:opacity-50 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-50";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Lucide icon component. Never pass raw SVG. */
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

type ButtonElementProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type AnchorElementProps = BaseProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    href: string;
    /** Anchors have no native disabled state; this maps to aria-disabled. */
    disabled?: boolean;
  };

export type ButtonProps = ButtonElementProps | AnchorElementProps;

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function buildClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    className,
  );
}

function ButtonContent({
  icon: Icon,
  iconPosition,
  size,
  children,
}: {
  icon?: LucideIcon;
  iconPosition: "left" | "right";
  size: ButtonSize;
  children: ReactNode;
}) {
  return (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className={iconSizeStyles[size]} aria-hidden="true" />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className={iconSizeStyles[size]} aria-hidden="true" />
      )}
    </>
  );
}

/**
 * Renders a <button>, a same-page <a> for hash links, or a next/link for
 * internal routes. Focus styling comes from the global :focus-visible rule,
 * so there is exactly one focus ring in the project.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      href,
      disabled,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      className,
      children,
      ...anchorProps
    } = props;

    const shared = {
      ...anchorProps,
      className: buildClasses(variant, size, className),
      "aria-disabled": disabled || undefined,
      tabIndex: disabled ? -1 : anchorProps.tabIndex,
    };

    const content = (
      <ButtonContent icon={icon} iconPosition={iconPosition} size={size}>
        {children}
      </ButtonContent>
    );

    if (isExternal(href)) {
      return (
        <a
          {...shared}
          href={href}
          target={anchorProps.target ?? "_blank"}
          rel={anchorProps.rel ?? "noopener noreferrer"}
        >
          {content}
        </a>
      );
    }

    // Hash links stay plain anchors so smooth scrolling is not intercepted.
    if (href.startsWith("#")) {
      return (
        <a {...shared} href={href}>
          {content}
        </a>
      );
    }

    return (
      <Link {...shared} href={href}>
        {content}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    className,
    children,
    type,
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type ?? "button"}
      className={buildClasses(variant, size, className)}
    >
      <ButtonContent icon={icon} iconPosition={iconPosition} size={size}>
        {children}
      </ButtonContent>
    </button>
  );
}
