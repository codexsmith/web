"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function CollapsibleSection({
  header,
  children,
  defaultOpen = false,
  className,
  as: Component = "section",
  ...rest
}: {
  header: (props: { isOpen: boolean; toggle: () => void }) => React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Component className={className} {...rest}>
      {header({ isOpen, toggle: () => setIsOpen(!isOpen) })}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "1px" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Component>
  );
}
