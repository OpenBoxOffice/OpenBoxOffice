import { Plus, Mail } from "lucide-react";

interface StepChoiceProps {
    onCreateChoice: () => void;
    onJoinChoice: () => void;
}

export function StepChoice({ onCreateChoice, onJoinChoice }: StepChoiceProps) {
    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                onClick={onCreateChoice}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-left text-sm font-medium shadow-sm transition-all hover:border-foreground/20 hover:shadow-md"
            >
                <Plus className="h-4 w-4" />
                Create new organization
            </button>
            <button
                type="button"
                onClick={onJoinChoice}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-left text-sm font-medium shadow-sm transition-all hover:border-foreground/20"
            >
                <Mail className="h-4 w-4" />
                Join with invitation
            </button>
        </div>
    );
}
