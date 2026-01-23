"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MindscapeLogo from "@/components/mindscape-logo";


interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [isRotating, setIsRotating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { [id]: !prev[id] };
      if (!prev[id]) {
        setActiveNodeId(id);
        setIsRotating(false);
        const currentItem = timelineData.find(i => i.id === id);
        const newPulseEffect: Record<number, boolean> = {};
        if (currentItem) {
          currentItem.relatedIds.forEach(relId => newPulseEffect[relId] = true);
        }
        setPulseEffect(newPulseEffect);
      } else {
        setActiveNodeId(null);
        setIsRotating(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-white bg-black border-white";
      case "in-progress": return "text-black bg-white border-black";
      case "pending": return "text-white bg-black/40 border-white/50";
      default: return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-start bg-transparent overflow-hidden mt-8 md:-mt-8"
      ref={containerRef}
      onClick={() => {
        setExpandedItems({});
        setActiveNodeId(null);
        setIsRotating(true);
        setPulseEffect({});
      }}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        {/* Rotating Container */}
        <motion.div
          className="absolute w-full h-full hidden md:flex items-center justify-center"
          animate={{ rotate: isRotating ? 360 : 0 }}
          style={{ perspective: "1000px" }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {/* Orbit Line */}
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white/10 opacity-50" />

          {/* Timeline Nodes */}
          {timelineData.map((item, index) => {
            const angle = (index / timelineData.length) * 360;
            const isExpanded = expandedItems[item.id];
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-300"
                style={{
                  transform: `rotate(${angle}deg) translate(200px) rotate(${-angle}deg)`,
                  zIndex: isExpanded ? 200 : 10,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Counter-rotating Wrapper to keep content upright */}
                <motion.div
                  className="flex flex-col items-center justify-center"
                  animate={{ rotate: isRotating ? -360 : 0 }}
                  transition={{
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >

                  {/* Energy Field */}
                  <div
                    className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse" : ""}`}
                    style={{
                      background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)`,
                      width: `${item.energy * 0.4 + 40}px`,
                      height: `${item.energy * 0.4 + 40}px`,
                      transform: 'translate(-50%, -50%)',
                      left: '50%',
                      top: '50%'
                    }}
                  ></div>

                  {/* Node */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-20
                      ${isExpanded ? "bg-white text-black border-white scale-125 shadow-lg shadow-white/20" : "bg-black text-white border-white/40"}
                    `}
                  >
                    <Icon size={16} />
                  </div>

                  {/* Label */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-widest text-white/60">
                    {item.title.toUpperCase()}
                  </div>

                  {/* Card */}
                  {isExpanded && (
                    <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/95 backdrop-blur-xl border-white/20 shadow-2xl z-[300] cursor-default text-left">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center mb-2">
                          <Badge className={`text-[9px] ${getStatusStyles(item.status)}`}>
                            {item.status.toUpperCase()}
                          </Badge>
                          <span className="text-[9px] font-mono text-white/50">{item.date}</span>
                        </div>
                        <CardTitle className="text-sm font-black tracking-tight">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-[11px] leading-relaxed text-white/70">
                        <p className="mb-4">{item.content}</p>
                        <div className="pt-3 border-t border-white/10">
                          <div className="flex justify-between text-[9px] mb-1 font-bold">
                            <span>ENERGY CAPACITY</span>
                            <span>{item.energy}%</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-white transition-all duration-500" style={{ width: `${item.energy}%` }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Static Central Hub - Doesn't rotate */}
        <div className="relative z-20 flex items-center justify-center pointer-events-none">
          <div className="absolute w-40 h-40 rounded-full border border-white/5 animate-ping" />
          <div className="animate-heartbeat scale-150">
            <MindscapeLogo size="lg" showText={false} variant="white" pulseEffect={true} />
          </div>
        </div>
      </div>
    </div>
  );
}