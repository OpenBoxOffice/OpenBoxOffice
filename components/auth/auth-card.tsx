"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface AuthCardProps {
    title: string;
    description?: string;
    headerSlot?: React.ReactNode;
    footer?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    onBack?: () => void;
}

export function AuthCard({
    title,
    description,
    headerSlot,
    footer,
    children,
    className,
    contentClassName,
    onBack,
}: AuthCardProps) {
    return (
        <Card className={cn("relative mx-auto w-full max-w-sm", className)}>
            {onBack && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="absolute left-4 top-4 z-10"
                    onClick={onBack}
                    aria-label="Go back"
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            )}
            <CardHeader>
                {headerSlot}
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
            </CardHeader>
            <CardContent className={cn("flex flex-col gap-4", contentClassName)}>
                {children}
            </CardContent>
            {footer && (
                <CardFooter className="flex flex-col gap-4">
                    <Separator />
                    {footer}
                </CardFooter>
            )}
        </Card>
    );
}
