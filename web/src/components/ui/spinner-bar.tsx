import * as React from "react";

export interface SpinnerBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SpinnerBar({ className, ...props }: SpinnerBarProps) {
    return (
        <div
            className={`relative h-0.5 w-full overflow-hidden rounded-full bg-muted [transform:translateZ(0)]${className ? ` ${className}` : ""}`}
            role="progressbar"
            aria-valuetext="Loading..."
            {...props}
        >
            <div className="animate-spinner-bar absolute top-0 h-full w-24 rounded-full bg-blue-base" />
        </div>
    );
}
