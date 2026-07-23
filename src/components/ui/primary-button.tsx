'use client';

import React from 'react';
import { Button } from './button'; // Import from local directory since they are in the same folder likely, or verify path.
// File is `src/components/ui/primary-button.tsx`. Button is `src/components/ui/button.tsx`. So `./button` is correct.

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
    href?: string;
    target?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const PrimaryButton = ({
    children,
    href,
    className,
    onClick,
    ...props
}: PrimaryButtonProps) => {

    // If href exists, use asChild pattern for clean semantic HTML
    if (href) {
        // Shadcn Button with asChild renders the child (a tag) with button styles
        return (
            <Button
                asChild
                variant="softblue"
                className={className}
                onClick={onClick}
                {...props}
            >
                <a href={href}>
                    {children}
                </a>
            </Button>
        );
    }

    return (
        <Button
            variant="softblue"
            className={className}
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;
