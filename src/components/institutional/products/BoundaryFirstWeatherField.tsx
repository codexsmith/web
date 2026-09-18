"use client";

import { useState } from "react";
import {
  weatherModes,
  type WeatherModeId,
} from "../content/boundaryFirstWeather";
import styles from "../styles/BoundaryFirstWeather.module.css";

export function BoundaryFirstWeatherField() {
  const [activeMode, setActiveMode] = useState<WeatherModeId>("boundary");
  const mode = weatherModes.find((item) => item.id === activeMode) ?? weatherModes[0];

  return (
    <div className={styles.weatherInstrument}>
      <div className={styles.weatherInstrumentTopline}>
        <div>
          <span>WEATHER LAB · ILLUSTRATIVE SIMULATION FIELD</span>
          <strong>One evolving field. Five diagnostic projections.</strong>
        </div>
        <span className={styles.weatherInstrumentLamp} aria-hidden="true" />
      </div>

      <div className={styles.weatherModeControls} aria-label="Boundary First Weather diagnostic modes">
        {weatherModes.map((item) => (
          <button
            aria-pressed={item.id === activeMode}
            key={item.id}
            onClick={() => setActiveMode(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.weatherFieldStage}>
        <div
          className={styles.weatherField}
          data-mode={activeMode}
          role="img"
          aria-label="Illustrative weather simulation field showing flow, boundaries, defect regions, refinement, and comparison overlays"
        >
          <svg viewBox="0 0 720 470" aria-hidden="true">
            <defs>
              <linearGradient id="weatherFieldGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#173d53" />
                <stop offset="46%" stopColor="#245d70" />
                <stop offset="100%" stopColor="#101f2c" />
              </linearGradient>
              <radialGradient id="weatherCell" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8be0dc" stopOpacity=".7" />
                <stop offset="100%" stopColor="#8be0dc" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="720" height="470" fill="url(#weatherFieldGradient)" />
            <g className={styles.weatherGrid}>
              {Array.from({ length: 11 }).map((_, index) => (
                <line key={`v-${index}`} x1={index * 72} x2={index * 72} y1="0" y2="470" />
              ))}
              {Array.from({ length: 8 }).map((_, index) => (
                <line key={`h-${index}`} x1="0" x2="720" y1={index * 67} y2={index * 67} />
              ))}
            </g>

            <g className={styles.weatherBaseContours}>
              <path d="M-20 112 C85 44 154 167 259 114 S455 51 552 125 S687 177 754 91" />
              <path d="M-30 190 C92 123 181 220 293 176 S473 111 583 193 S674 231 756 167" />
              <path d="M-20 312 C115 226 211 350 333 291 S492 235 585 311 S680 351 754 279" />
              <path d="M26 390 C140 325 235 423 354 372 S539 333 687 396" />
            </g>

            <g className={styles.weatherFlowOverlay}>
              <path d="M73 308 C170 252 249 241 340 257 S520 287 650 206" />
              <path d="M84 334 l18 -18 M84 334 l24 2" />
              <path d="M245 263 l17 -18 M245 263 l23 3" />
              <path d="M428 276 l18 -18 M428 276 l24 2" />
              <path d="M620 224 l16 -19 M620 224 l23 0" />
            </g>

            <g className={styles.weatherBoundaryOverlay}>
              <path d="M62 86 C146 106 174 177 247 190 C318 202 356 163 415 190 C478 218 500 293 584 306 C630 314 669 294 708 263" />
              <circle cx="248" cy="190" r="22" />
              <circle cx="416" cy="190" r="19" />
              <circle cx="585" cy="306" r="23" />
            </g>

            <g className={styles.weatherDefectOverlay}>
              <ellipse cx="423" cy="197" rx="112" ry="76" />
              <circle cx="444" cy="184" r="28" />
              <circle cx="496" cy="237" r="17" />
              <path d="M363 141 l121 118 M484 141 l-121 118" />
            </g>

            <g className={styles.weatherRefineOverlay}>
              {[
                [340,134],[396,134],[452,134],[508,134],
                [340,190],[396,190],[452,190],[508,190],
                [340,246],[396,246],[452,246],[508,246],
              ].map(([x,y]) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="56" height="56" />
              ))}
            </g>

            <g className={styles.weatherCompareOverlay}>
              <path d="M50 97 C146 121 181 187 258 196 C337 207 374 171 427 201 C493 239 515 300 590 313 C639 322 674 302 714 275" />
              <path d="M62 86 C146 106 174 177 247 190 C318 202 356 163 415 190 C478 218 500 293 584 306 C630 314 669 294 708 263" />
              <line x1="415" x2="427" y1="190" y2="201" />
              <line x1="584" x2="590" y1="306" y2="313" />
            </g>

            <g className={styles.weatherCellGlow}>
              <circle cx="420" cy="194" r="125" fill="url(#weatherCell)" />
            </g>
          </svg>

          <div className={styles.weatherFieldLegend}>
            <span>SIM T+06:00</span>
            <span>2D WEATHER-LIKE DOMAIN</span>
            <span>ILLUSTRATIVE · NOT FORECAST DATA</span>
          </div>
        </div>

        <div className={styles.weatherModeReadout}>
          <p>{mode.kicker}</p>
          <h2>{mode.title}</h2>
          <span>{mode.description}</span>
          <blockquote>{mode.question}</blockquote>
          <small>
            This instrument illustrates the research grammar. It does not display an operational forecast or validated weather result.
          </small>
        </div>
      </div>
    </div>
  );
}
