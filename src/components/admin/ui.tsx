"use client";

import { cn } from "@/lib/utils";

export function AdminInput({
  label,
  id,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      <input
        id={id}
        className={cn(
          "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function AdminTextarea({
  label,
  id,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      <textarea
        id={id}
        className={cn(
          "w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function AdminSelect({
  label,
  id,
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      <select
        id={id}
        className={cn(
          "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export function AdminCheckbox({
  label,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-border accent-accent"
        {...props}
      />
      {label}
    </label>
  );
}

export function AdminButton({
  variant = "primary",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:opacity-50",
        variant === "primary" && "bg-accent text-white hover:bg-accent-light",
        variant === "secondary" && "border border-border hover:border-accent",
        variant === "danger" && "bg-red-500/10 text-red-400 hover:bg-red-500/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminModal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function AdminAlert({ message, type = "error" }: { message: string; type?: "error" | "success" }) {
  return (
    <div
      className={cn(
        "mb-4 rounded-lg px-4 py-3 text-sm",
        type === "error" && "bg-red-500/10 text-red-400",
        type === "success" && "bg-green-500/10 text-green-400"
      )}
    >
      {message}
    </div>
  );
}
