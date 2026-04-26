"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { DESTINATIONS } from "@/data/tours";

const BUDGET_MIN = 500;
const BUDGET_MAX = 3000;
const ACTIVITIES = [
  "Any Activity",
  "Camping in the Wild",
  "Desert Camping",
  "Forest Trek",
  "Jungle Trekking",
  "Safari",
  "Hiking",
  "Cultural Tour",
  "Adventure",
];
const DURATIONS = [
  "2 Days - 10 Days",
  "1 - 3 Days",
  "4 - 7 Days",
  "1 - 2 Weeks",
  "2+ Weeks",
];

function IconBudget() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function IconActivity() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}
function IconChevron({ up }: { up: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#b0b7c3"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: up ? "rotate(180deg)" : "none",
        transition: "transform 0.2s ease",
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconSearchSvg() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  );
}

function Dropdown({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: 0,
        minWidth: 248,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 14,
        padding: "8px",
        zIndex: 9999,
        boxShadow: "0 16px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)",
        animation: "hsIn 0.17s cubic-bezier(.16,1,.3,1) both",
      }}
    >
      {children}
    </div>
  );
}

function Opt({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "9px 12px",
        borderRadius: 8,
        fontSize: 13.5,
        fontWeight: active ? 600 : 400,
        color: active ? "#1aab60" : "#374151",
        background: active ? "#f0faf5" : hov ? "#f9fafb" : "transparent",
        cursor: "pointer",
        transition: "background 0.1s",
        userSelect: "none",
      }}
    >
      {label}
    </div>
  );
}

function DropLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10.5,
        fontWeight: 700,
        color: "#b0b7c3",
        textTransform: "uppercase",
        letterSpacing: "0.9px",
        padding: "6px 12px 8px",
      }}
    >
      {children}
    </div>
  );
}

function Field({
  icon,
  label,
  value,
  active,
  onClick,
  placeholder,
  wide,
}: {
  icon: React.ReactNode;
  label?: string;
  value: string;
  active: boolean;
  onClick: () => void;
  placeholder?: string;
  wide?: boolean;
}) {
  const isPlaceholder = value === placeholder || !placeholder;
  const [hov, setHov] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "12px 15px",
        border: `1.5px solid ${active ? "#2ecc7a" : hov && !active ? "#d1d5db" : "#e5e7eb"}`,
        borderRadius: 10,
        background: active ? "#f8fffc" : "#fff",
        cursor: "pointer",
        transition: "border-color 0.18s, background 0.18s, box-shadow 0.18s",
        width: wide ? "100%" : "auto",
        minWidth: 0,
        textAlign: "left",
        fontFamily: "inherit",
        boxShadow: active
          ? "0 0 0 3px rgba(46,204,122,0.14)"
          : hov
            ? "0 2px 8px rgba(0,0,0,0.06)"
            : "none",
        outline: "none",
        height: 50,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        {icon}
      </span>
      <span
        style={{
          flex: 1,
          fontSize: 13.5,
          fontWeight: isPlaceholder ? 400 : 500,
          color: isPlaceholder ? "#b0b7c3" : "#1a1a1a",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
        }}
      >
        {value}
      </span>
      <IconChevron up={active} />
    </button>
  );
}

function BudgetSlider({
  min,
  max,
  setMin,
  setMax,
}: {
  min: number;
  max: number;
  setMin: (v: number) => void;
  setMax: (v: number) => void;
}) {
  const pct = (v: number) =>
    ((v - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  return (
    <div style={{ padding: "4px 12px 4px" }}>
      <div
        style={{
          position: "relative",
          height: 4,
          background: "#e5e7eb",
          borderRadius: 4,
          margin: "20px 0 28px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${pct(min)}%`,
            right: `${100 - pct(max)}%`,
            top: 0,
            bottom: 0,
            background: "#2ecc7a",
            borderRadius: 4,
          }}
        />
        {[
          {
            val: min,
            zIndex: 3,
            onChange: (v: number) => {
              if (v < max - 200) setMin(v);
            },
          },
          {
            val: max,
            zIndex: 4,
            onChange: (v: number) => {
              if (v > min + 200) setMax(v);
            },
          },
        ].map((t, i) => (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                left: `${pct(t.val)}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 20,
                height: 20,
                background: "#fff",
                border: "2.5px solid #2ecc7a",
                borderRadius: "50%",
                boxShadow: "0 2px 6px rgba(46,204,122,0.3)",
                pointerEvents: "none",
                zIndex: t.zIndex - 1,
              }}
            />
            <input
              type="range"
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={100}
              value={t.val}
              onChange={(e) => t.onChange(+e.target.value)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                opacity: 0,
                cursor: "pointer",
                zIndex: t.zIndex,
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
        }}
      >
        <span>${min.toLocaleString()}</span>
        <span>${max.toLocaleString()}</span>
      </div>
      <div
        style={{
          marginTop: 14,
          paddingTop: 14,
          borderTop: "1px solid #f3f4f6",
        }}
      >
        <DropLabel>Quick Select</DropLabel>
        {[
          { label: "$500 – $1,000", min: 500, max: 1000 },
          { label: "$1,000 – $2,000", min: 1000, max: 2000 },
          { label: "$2,000 – $3,000", min: 2000, max: 3000 },
        ].map((p) => (
          <Opt
            key={p.label}
            label={p.label}
            active={min === p.min && max === p.max}
            onClick={() => {
              setMin(p.min);
              setMax(p.max);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSearchBar() {
  const [open, setOpen] = useState<
    "budget" | "destination" | "activity" | "duration" | null
  >(null);
  const [budgetMin, setBudgetMin] = useState(BUDGET_MIN);
  const [budgetMax, setBudgetMax] = useState(BUDGET_MAX);
  const [destination, setDestination] = useState("Destination");
  const [activity, setActivity] = useState("Activity");
  const [duration, setDuration] = useState("2 Days - 10 Days");
  const wrapRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(
    (field: typeof open) => setOpen((prev) => (prev === field ? null : field)),
    [],
  );

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const budgetLabel = `$${budgetMin.toLocaleString()} - $${budgetMax.toLocaleString()}`;

  return (
    <>
      <style>{`
        @keyframes hsIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0)   scale(1);     }
        }
       .hs-root {
          position: relative;
          top: -40px;
          background: #ffffff;
          border-radius: 18px;
          padding: 12px 14px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          max-width: 880px;
          width: 100%;
          margin: 0 auto;
          box-shadow:
            0 28px 72px rgba(0,0,0,0.24),
            0 4px 16px rgba(0,0,0,0.08);
        }
        .hs-field {
          position: relative;
          flex: 1;
          min-width: 0;
        }
        .hs-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 50px;
          padding: 0 26px;
          background: #2ecc7a;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          font-family: inherit;
          letter-spacing: 0.1px;
          flex-shrink: 0;
          align-self: flex-start;
          box-shadow: 0 4px 18px rgba(46,204,122,0.38);
          transition: background 0.18s, box-shadow 0.18s, transform 0.15s;
        }
        .hs-btn:hover {
          background: #1aab60;
          box-shadow: 0 8px 28px rgba(46,204,122,0.48);
          transform: translateY(-1px);
        }
        .hs-btn:active { transform: translateY(0); }
      `}</style>

      <div className="hs-root" ref={wrapRef}>
        {/* Budget */}
        <div className="hs-field">
          <Field
            icon={<IconBudget />}
            value={budgetLabel}
            placeholder="$500 - $3000"
            active={open === "budget"}
            onClick={() => toggle("budget")}
            wide
          />
          <Dropdown open={open === "budget"}>
            <DropLabel>Select Budget Range</DropLabel>
            <BudgetSlider
              min={budgetMin}
              max={budgetMax}
              setMin={setBudgetMin}
              setMax={setBudgetMax}
            />
          </Dropdown>
        </div>

        {/* Destination */}
        <div className="hs-field">
          <Field
            icon={<IconPin />}
            value={destination}
            placeholder="Destination"
            active={open === "destination"}
            onClick={() => toggle("destination")}
            wide
          />
          <Dropdown open={open === "destination"}>
            <DropLabel>Choose Destination</DropLabel>
            {["Destination", ...DESTINATIONS.map((d) => d.name)].map((d) => (
              <Opt
                key={d}
                label={d === "Destination" ? "Any Destination" : d}
                active={destination === d}
                onClick={() => {
                  setDestination(d);
                  setOpen(null);
                }}
              />
            ))}
          </Dropdown>
        </div>

        {/* Activity */}
        <div className="hs-field">
          <Field
            icon={<IconActivity />}
            value={activity}
            placeholder="Activity"
            active={open === "activity"}
            onClick={() => toggle("activity")}
            wide
          />
          <Dropdown open={open === "activity"}>
            <DropLabel>Choose Activity</DropLabel>
            {ACTIVITIES.map((a) => (
              <Opt
                key={a}
                label={a}
                active={activity === a}
                onClick={() => {
                  setActivity(a);
                  setOpen(null);
                }}
              />
            ))}
          </Dropdown>
        </div>

        {/* Duration */}
        <div className="hs-field">
          <Field
            icon={<IconClock />}
            value={duration}
            placeholder="2 Days - 10 Days"
            active={open === "duration"}
            onClick={() => toggle("duration")}
            wide
          />
          <Dropdown open={open === "duration"}>
            <DropLabel>Trip Duration</DropLabel>
            {DURATIONS.map((d) => (
              <Opt
                key={d}
                label={d}
                active={duration === d}
                onClick={() => {
                  setDuration(d);
                  setOpen(null);
                }}
              />
            ))}
          </Dropdown>
        </div>

        {/* Search */}
        <button className="hs-btn" type="button">
          <IconSearchSvg />
          Search
        </button>
      </div>
    </>
  );
}
