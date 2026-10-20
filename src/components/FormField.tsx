
import type { InputHTMLAttributes, ReactNode } from "react";

type FormFieldProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id"
> & {
    id: string;
    label: string;
    error?: string;
    children?: ReactNode;
};

const FormField = ({
    id,
    label,
    error,
    children,
    className = "",
    ...inputProps
}: FormFieldProps) => {
    return (
        <div className="mb-4 flex flex-col gap-1.5">
            <label
                htmlFor={id}
                className="text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            {children ?? (
                <input
                    id={id}
                    className={`rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 ${
                        error
                            ? "border-red-500"
                            : "border-slate-300 focus:border-blue-500"
                    } ${className}`}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...inputProps}
                />
            )}

            {error && (
                <p
                    id={`${id}-error`}
                    role="alert"
                    className="text-sm text-red-600"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormField;
