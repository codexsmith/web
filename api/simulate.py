from __future__ import annotations

from http.server import BaseHTTPRequestHandler
import hashlib
import json
from typing import Any

import numpy as np

ENGINE_VERSION = "boundary-attractor-web-0.1.0"

BOUNDS = {
    "particles": {"min": 80, "max": 600, "default": 420},
    "frames": {"min": 12, "max": 72, "default": 60},
    "work_units_max": 36000,
    "dt": {"min": 0.008, "max": 0.050, "default": 0.026},
    "damping": {"min": 0.08, "max": 0.38, "default": 0.215},
    "radius": {"min": 0.8, "max": 4.0, "default": 2.15},
    "closure_strength": {"min": 0.0, "max": 2.8, "default": 1.15},
    "shell_amplitude": {"min": 0.0, "max": 0.95, "default": 0.34},
    "harmonic": {"min": 1, "max": 16, "default": 6},
    "selectivity": {"min": 0.2, "max": 10.0, "default": 3.4},
    "twist": {"min": 0.0, "max": 1.8, "default": 0.62},
    "braid_strength": {"min": 0.0, "max": 1.5, "default": 0.42},
    "flow_rate": {"min": 0.0, "max": 1.8, "default": 0.55},
}

PRESETS = {
    "cathedral": {"label": "Closure Cathedral", "description": "Stronger repair with moderate harmonic deformation.", "damping": .215, "closure_strength": 1.15, "shell_amplitude": .34, "harmonic": 6, "selectivity": 3.4, "twist": .62, "braid_strength": .42, "flow_rate": .55},
    "defect-flame": {"label": "Defect Flame", "description": "Weaker repair, stronger braid, and sharper closure selection.", "damping": .175, "closure_strength": .46, "shell_amplitude": .58, "harmonic": 9, "selectivity": 5.2, "twist": .92, "braid_strength": .86, "flow_rate": .82},
    "hopf-like": {"label": "Hopf-Like Braid", "description": "Twist-dominant winding with lower shell deformation.", "damping": .255, "closure_strength": 1.48, "shell_amplitude": .16, "harmonic": 3, "selectivity": 2.5, "twist": 1.18, "braid_strength": .24, "flow_rate": .46},
    "chaos-storm": {"label": "Chaos Storm", "description": "High deformation and low damping expose the chaos/closure competition.", "damping": .145, "closure_strength": .28, "shell_amplitude": .76, "harmonic": 11, "selectivity": 6.2, "twist": .66, "braid_strength": 1.02, "flow_rate": 1.05},
}

DEFAULTS = {"preset": "cathedral", "seed": 17, "particles": 420, "frames": 60, "dt": .026, "chaos_frequency": 1.0, "radius": 2.15, **{k: PRESETS["cathedral"][k] for k in ("damping", "closure_strength", "shell_amplitude", "harmonic", "selectivity", "twist", "braid_strength", "flow_rate")}}


def _num(v: Any, name: str, integer=False):
    try:
        return int(v) if integer else float(v)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be {'an integer' if integer else 'a number'}")


def _bound(v: Any, name: str, integer=False):
    spec = BOUNDS[name]
    x = _num(v, name, integer)
    if x < spec["min"] or x > spec["max"]:
        raise ValueError(f"{name} must be between {spec['min']} and {spec['max']}")
    return x


def normalize(body: dict[str, Any]):
    preset_name = str(body.get("preset", DEFAULTS["preset"]))
    if preset_name not in PRESETS:
        raise ValueError(f"unknown preset: {preset_name}")
    p = dict(DEFAULTS)
    p.update({k: v for k, v in PRESETS[preset_name].items() if k not in {"label", "description"}})
    p.update({k: v for k, v in body.items() if k in p or k == "preset"})
    p["preset"] = preset_name
    p["seed"] = max(0, _num(p["seed"], "seed", True))
    for n in ("particles", "frames", "harmonic"):
        p[n] = _bound(p[n], n, True)
    for n in ("dt", "damping", "radius", "closure_strength", "shell_amplitude", "selectivity", "twist", "braid_strength", "flow_rate"):
        p[n] = _bound(p[n], n)
    p["chaos_frequency"] = 1.0
    p["work_units"] = p["particles"] * p["frames"]
    if p["work_units"] > BOUNDS["work_units_max"]:
        raise ValueError(f"run is too large: particles x frames = {p['work_units']}; maximum is {BOUNDS['work_units_max']}")
    return p


def radius(xyz):
    r = np.linalg.norm(xyz, axis=1)
    return r, np.maximum(r, 1e-7)


def target(xyz, t, p):
    x, y, z = xyz.T
    rho = np.sqrt(x*x + y*y)
    az = np.arctan2(y, x)
    el = np.arctan2(z, np.maximum(rho, 1e-7))
    phase = p["flow_rate"] * t
    modulation = np.cos(p["harmonic"] * az + phase) * np.cos((p["harmonic"] - 1) * el - .63 * phase)
    return p["radius"] * (1 + p["shell_amplitude"] * modulation)


def metrics(xyz, t, p):
    r, _ = radius(xyz)
    defect = np.abs(r - target(xyz, t, p))
    score = np.exp(-p["selectivity"] * defect * defect)
    x, y, z = xyz.T
    rho = np.sqrt(x*x + y*y)
    az = np.arctan2(y, x)
    el = np.arctan2(z, np.maximum(rho, 1e-7))
    phase = np.mod(p["harmonic"] * az + .75 * el + p["flow_rate"] * t, 2*np.pi)
    return defect, score, phase


def field(xyz, t, p):
    x, y, z = xyz.T
    r, rs = radius(xyz)
    unit = xyz / rs[:, None]
    chaos = np.column_stack([np.sin(y) - p["damping"]*x, np.sin(z) - p["damping"]*y, np.sin(x) - p["damping"]*z])
    closure = -p["closure_strength"] * np.tanh(r - target(xyz, t, p))[:, None] * unit
    swirl = p["twist"] * np.column_stack([-y, x, np.zeros_like(z)]) / (1 + .35*r)[:, None]
    rho = np.sqrt(x*x + y*y)
    az = np.arctan2(y, x)
    ph = p["harmonic"] * az + p["flow_rate"] * t
    braid = p["braid_strength"] * np.column_stack([np.cos(ph)*z, np.sin(ph)*z, np.sin(ph - .7*np.arctan2(z, np.maximum(rho, 1e-7))) * rho/(1+rho)])
    return chaos + closure + swirl + braid


def simulate(p):
    rng = np.random.default_rng(p["seed"])
    n, frames, dt = p["particles"], p["frames"], p["dt"]
    u = rng.normal(size=(n, 3)).astype(np.float32)
    u /= np.maximum(np.linalg.norm(u, axis=1), 1e-7)[:, None]
    shell_r = p["radius"] * (.22 + 1.38 * rng.power(1.75, size=n))
    xyz = (u * shell_r[:, None] + .08*p["radius"]*rng.normal(size=u.shape)).astype(np.float32)
    positions = np.empty((frames, n, 3), np.float32)
    scores = np.empty((frames, n), np.float32)
    phases = np.empty((frames, n), np.float32)
    defects = np.empty((frames, n), np.float32)
    max_r = 5.5*p["radius"]
    for i in range(frames):
        t = i*dt
        positions[i] = xyz
        defect, score, phase = metrics(xyz, t, p)
        defects[i], scores[i], phases[i] = defect, score, phase
        k1 = field(xyz, t, p)
        k2 = field(xyz + .5*dt*k1, t + .5*dt, p)
        xyz = xyz + dt*k2
        rr = np.linalg.norm(xyz, axis=1)
        escaped = rr > max_r
        if np.any(escaped):
            xyz[escaped] *= (max_r / rr[escaped])[:, None]
    persistence = scores.mean(axis=0)
    ids = np.argsort(persistence)[-min(80, n):][::-1]
    extent = max(float(np.percentile(np.abs(positions), 99.6)), 1.0)
    canonical = json.dumps({k: p[k] for k in sorted(p) if k != "work_units"}, separators=(",", ":"), sort_keys=True)
    run_id = "ba-" + hashlib.sha256((ENGINE_VERSION + canonical).encode()).hexdigest()[:16]
    return {"schema_version": "web_run_v0.1", "engine_version": ENGINE_VERSION, "run_id": run_id, "claim_status": "prototype_dynamics", "parameters": {k: v for k, v in p.items() if k != "work_units"}, "bounds": {"work_units": p["work_units"], "work_units_max": BOUNDS["work_units_max"]}, "metrics": {"mean_closure": round(float(scores.mean()), 6), "max_closure": round(float(scores.max()), 6), "mean_defect": round(float(defects.mean()), 6), "strongly_admissible_last_frame": int(np.sum(scores[-1] > .72)), "extent_99_6": round(extent, 5)}, "persistent_ids": ids.tolist(), "positions": np.round(positions, 4).tolist(), "scores": np.round(scores, 4).tolist(), "phases": np.round(phases, 4).tolist()}


class handler(BaseHTTPRequestHandler):
    def send_json(self, status, payload):
        data = json.dumps(payload, separators=(",", ":")).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        self.send_json(200, {"ok": True, "engine_version": ENGINE_VERSION, "claim_status": "prototype_dynamics", "bounds": BOUNDS, "defaults": DEFAULTS, "presets": PRESETS})

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 65536:
                raise ValueError("request body must be between 1 byte and 64 KB")
            body = json.loads(self.rfile.read(length).decode())
            if not isinstance(body, dict):
                raise ValueError("request must be a JSON object")
            self.send_json(200, {"ok": True, **simulate(normalize(body))})
        except ValueError as exc:
            self.send_json(422, {"ok": False, "error": str(exc)})
        except Exception as exc:
            self.send_json(500, {"ok": False, "error": "simulation failed", "detail": str(exc)[:180]})
