
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
        <div className="field">
            <label htmlFor={id} className="field-label">{label}</label>

            {children ?? (
                <input
                    id={id}
                    className={`input ${
                        error
                            ? "input-error"
                            : ""
                    } ${className}`}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...inputProps}
                />
            )}

            {error && (
                <p id={`${id}-error`} role="alert" className="field-error">{error}</p>
            )}
        </div>
    );
};

export default FormField;
