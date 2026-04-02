import { Check, Loader2, X } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

export type SlugStatus = "idle" | "checking" | "available" | "taken" | "error";

interface SlugInputProps {
    id: string;
    placeholder?: string;
    registration: UseFormRegisterReturn;
    displayStatus: SlugStatus;
    error?: string;
}

export function SlugInput({
    id,
    placeholder = "acme-theaters",
    registration,
    displayStatus,
    error,
}: SlugInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex h-9 items-center overflow-hidden rounded-md border border-input shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
                <span className="flex h-full items-center border-r border-input bg-muted px-3 text-sm text-muted-foreground select-none">
                    /
                </span>
                <div className="relative flex-1">
                    <input
                        id={id}
                        placeholder={placeholder}
                        className="h-full w-full bg-transparent px-3 pr-8 text-base outline-none placeholder:text-muted-foreground md:text-sm"
                        {...registration}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {displayStatus === "checking" && (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                        )}
                        {displayStatus === "available" && (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                        )}
                        {displayStatus === "taken" && (
                            <X className="h-3.5 w-3.5 text-destructive" />
                        )}
                        {displayStatus === "error" && (
                            <X className="h-3.5 w-3.5 text-destructive" />
                        )}
                    </div>
                </div>
            </div>
            {error ? (
                <p className="text-xs text-destructive">{error}</p>
            ) : displayStatus === "available" ? (
                <p className="text-xs text-green-600">Available</p>
            ) : displayStatus === "taken" ? (
                <p className="text-xs text-destructive">This URL is already taken</p>
            ) : displayStatus === "error" ? (
                <p className="text-xs text-destructive">Unable to check availability. Try again.</p>
            ) : null}
        </div>
    );
}
