"use client";

import React, { ReactNode } from "react";

export default function CalButton({ 
    children, 
    calLink = "mindscape/strategy", 
    className = "" 
}: { 
    children: ReactNode;
    calLink?: string;
    className?: string;
}) {
    return (
        <div 
            onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
            className={`cursor-pointer ${className}`}
        >
            {children}
        </div>
    );
}
