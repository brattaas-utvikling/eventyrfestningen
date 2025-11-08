// src/components/sections/Timeline.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import type { Milestone } from "@/types/sanity";

interface TimelineProps {
  milestones: Milestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative">
      <Container size="lg">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4"
          >
            Vår reise gjennom tid
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Fra første forestilling til i dag – historien om Kongsvinger
            Festningsteater
          </motion.p>
        </div>

        <div className="relative">
          {/* vertikal linje */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 sm:left-1/2 sm:-translate-x-px" />
          <motion.div
            className="absolute left-8 top-0 w-0.5 bg-linear-to-b from-gold-400 to-torch-500 origin-top sm:left-1/2 sm:-translate-x-px"
            style={{
              scaleY: scrollYProgress,
              transformOrigin: "top",
            }}
          />

          <div className="space-y-12 sm:space-y-16">
            {milestones.map((milestone, index) => (
              <TimelineItem
                key={milestone._id}
                milestone={milestone}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

interface TimelineItemProps {
  milestone: Milestone;
  index: number;
  isEven: boolean;
}

function TimelineItem({ milestone, index, isEven }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={itemRef}
      style={{ scale, opacity }}
      className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12"
    >
      {/* Års-badge */}
      <div className="absolute left-8 top-0 -translate-x-1/2 sm:left-1/2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
          className="relative flex items-center justify-center w-16 h-16 bg-linear-to-br from-gold-400 to-gold-600 rounded-full shadow-lg border-4 border-white"
        >
          <span className="text-white font-display font-bold text-lg">
            {milestone.year}
          </span>
          <div className="absolute inset-0 rounded-full bg-gold-400/30 blur-xl -z-10 animate-pulse" />
        </motion.div>
      </div>

      {/* tom kol for layout på desktop */}
      <div className={cn("col-span-1", !isEven && "sm:col-start-1 sm:text-right")}>
        <div className="hidden sm:block" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={cn("col-span-1 ml-20 sm:ml-0", isEven && "sm:col-start-2")}
      >
        <div className="group relative">
          <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-gold-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-gold-400 hover:-translate-y-1">
            {milestone.image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={urlFor(milestone.image)
                    .width(600)
                    .height(400)
                    .quality(85)
                    .url()}
                  alt={milestone.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-display font-bold text-navy-900 mb-3">
                {milestone.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {milestone.description}
              </p>
            </div>

            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
