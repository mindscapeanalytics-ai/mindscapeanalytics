"use client";

import React from "react";

const CinematicBackground = React.memo(function CinematicBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
            {/* Elegant, dynamic ambient mesh gradients */}
            <div className="absolute top-[-10%] left-[-5%] w-[80vw] h-[80vw] opacity-[0.3] mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none blur-[120px]" />
            <div className="absolute bottom-[-15%] right-[-5%] w-[70vw] h-[70vw] opacity-[0.2] mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none blur-[100px]" />
            <div className="absolute top-[20%] left-[50%] w-[50vw] h-[50vw] opacity-[0.1] mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none blur-[80px]" />

            {/* Clean, fainted static grid overlay with precision metrics */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grid.svg')] bg-repeat"
                style={{ backgroundSize: '80px 80px' }}
            />
            
            {/* Vignette for cinematic focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        </div>
    );
});

export default CinematicBackground;
