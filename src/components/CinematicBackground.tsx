"use client";

import React from "react";

const CinematicBackground = React.memo(function CinematicBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#111115]">
            {/* Elegant, static deep ambient gradients instead of heavy DOM-calculated effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] opacity-[0.25] mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] opacity-[0.20] mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-[30%] left-[60%] w-[40vw] h-[40vw] opacity-[0.15] mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />

            {/* Clean, faint static grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('/grid.svg')] bg-repeat"
                style={{ backgroundSize: '60px 60px' }}
            />
            {/* Very faint vertical edge fade for a sophisticated center-focus feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#111115]/70 via-transparent to-[#111115]/70 pointer-events-none" />
        </div>
    );
});

export default CinematicBackground;
