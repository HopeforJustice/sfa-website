"use client";
import { useEffect, useRef } from "react";

const SPACING = 150;
const LIGHT_REACH = 50;
const AGENT_COUNT = 10;
const AGENT_SPEED = 0.0005; // t-units per ms
const TRAIL_DURATION = 1000; // ms until trail fully fades

export default function NetworkCanvas() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let animationId;
		let nodes = [];
		// adjacency[nodeIdx] = [neighbourIdx, ...]
		let adjacency = [];
		let agents = [];

		const buildGraph = () => {
			nodes = [];
			adjacency = [];
			const cols = Math.ceil(canvas.width / SPACING) + 2;
			const rows = Math.ceil(canvas.height / SPACING) + 2;
			// Start one half-cell before the edge so lines reach all borders
			// but nodes (and dots) stay off the visible boundary
			const offX = -(SPACING / 2);
			const offY = -(SPACING / 2);

			for (let c = 0; c < cols; c++) {
				for (let r = 0; r < rows; r++) {
					nodes.push({ x: offX + c * SPACING, y: offY + r * SPACING });
					adjacency.push([]);
				}
			}

			const connect = (a, b) => {
				adjacency[a].push(b);
				adjacency[b].push(a);
			};

			for (let c = 0; c < cols; c++) {
				for (let r = 0; r < rows; r++) {
					const idx = c * rows + r;
					if (c + 1 < cols) connect(idx, (c + 1) * rows + r);
					if (r + 1 < rows) connect(idx, c * rows + (r + 1));
				}
			}
		};

		const pickNext = (agent) => {
			const neighbours = adjacency[agent.nodeIdx];
			// Exclude reversal
			const forward = neighbours.filter((n) => n !== agent.prevNodeIdx);
			const pool = forward.length > 0 ? forward : neighbours;
			// Prefer unvisited neighbours; fall back to any forward neighbour
			const unvisited = agent.visited
				? pool.filter((n) => !agent.visited.has(n))
				: [];
			return (unvisited.length > 0 ? unvisited : pool)[
				Math.floor(
					Math.random() * (unvisited.length > 0 ? unvisited : pool).length,
				)
			];
		};

		const spawnAgents = () => {
			agents = [];
			for (let i = 0; i < AGENT_COUNT; i++) {
				const nodeIdx = Math.floor(Math.random() * nodes.length);
				const nextNodeIdx = pickNext({ nodeIdx, prevNodeIdx: -1 });
				agents.push({
					nodeIdx,
					nextNodeIdx,
					prevNodeIdx: -1,
					t: Math.random(),
					speed: AGENT_SPEED * (0.7 + Math.random() * 0.6),
					waitMs: 0,
					hopsLeft: 2 + Math.floor(Math.random() * 5),
					trail: [], // [{ax,ay,bx,by,age}] completed edges, newest first
					visited: new Set([nodeIdx]), // nodes visited this run
				});
			}
		};

		const resize = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			buildGraph();
			spawnAgents();
		};

		resize();
		window.addEventListener("resize", resize);

		let lastTime = null;
		const animate = (now) => {
			const dt = lastTime === null ? 16 : Math.min(now - lastTime, 50);
			lastTime = now;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Pass 1: dim static grid
			for (let i = 0; i < adjacency.length; i++) {
				const a = nodes[i];
				adjacency[i].forEach((j) => {
					if (j <= i) return; // draw each edge once
					const b = nodes[j];
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.strokeStyle = "rgba(255,255,255,0.08)";
					ctx.lineWidth = 0.6;
					ctx.stroke();
				});
			}

			// Pass 2: advance and draw each agent
			agents.forEach((agent) => {
				// Age and prune trail segments every frame
				agent.trail.forEach((s) => {
					s.age += dt;
				});
				agent.trail = agent.trail.filter((s) => s.age < TRAIL_DURATION);

				// Waiting at end of a run — count down then start moving again
				if (agent.waitMs > 0) {
					agent.waitMs -= dt;
				} else {
					agent.t += agent.speed * dt;

					// Arrived at next node
					if (agent.t >= 1) {
						// Capture completed edge for trail before updating state
						const ea = nodes[agent.nodeIdx];
						const eb = nodes[agent.nextNodeIdx];
						if (ea && eb) {
							agent.trail.unshift({
								ax: ea.x,
								ay: ea.y,
								bx: eb.x,
								by: eb.y,
								age: 0,
							});
							// Cap trail length to avoid unbounded growth
							if (agent.trail.length > 12) agent.trail.pop();
						}

						agent.prevNodeIdx = agent.nodeIdx;
						agent.nodeIdx = agent.nextNodeIdx;
						agent.visited.add(agent.nodeIdx);
						agent.nextNodeIdx = pickNext(agent);
						agent.t = 0;
						agent.hopsLeft -= 1;

						// End of run — pause, clear visited so next run explores fresh territory
						if (agent.hopsLeft <= 0) {
							agent.waitMs = 400 + Math.random() * 1200;
							agent.hopsLeft = 2 + Math.floor(Math.random() * 5);
							agent.visited = new Set([agent.nodeIdx]);
						}
					}
				}

				const a = nodes[agent.nodeIdx];
				const b = nodes[agent.nextNodeIdx];
				if (!a || !b) return;

				const px = a.x + (b.x - a.x) * agent.t;
				const py = a.y + (b.y - a.y) * agent.t;

				const dx = b.x - a.x;
				const dy = b.y - a.y;
				const len = Math.sqrt(dx * dx + dy * dy);
				const nx = dx / len;
				const ny = dy / len;

				// Draw fading trail: completed edges (newest = brightest)
				agent.trail.forEach((seg) => {
					const f = 1 - seg.age / TRAIL_DURATION;
					const trailGrad = ctx.createLinearGradient(
						seg.ax,
						seg.ay,
						seg.bx,
						seg.by,
					);
					trailGrad.addColorStop(0, `rgba(180,225,255,${f * 0.08})`);
					trailGrad.addColorStop(1, `rgba(180,225,255,${f * 0.35})`);
					ctx.beginPath();
					ctx.moveTo(seg.ax, seg.ay);
					ctx.lineTo(seg.bx, seg.by);
					ctx.strokeStyle = trailGrad;
					ctx.lineWidth = 1;
					ctx.stroke();
				});

				// Current partial edge trail: from a to current position
				if (agent.t > 0) {
					const partialGrad = ctx.createLinearGradient(a.x, a.y, px, py);
					partialGrad.addColorStop(0, "rgba(180,225,255,0.05)");
					partialGrad.addColorStop(1, "rgba(180,225,255,0.4)");
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(px, py);
					ctx.strokeStyle = partialGrad;
					ctx.lineWidth = 1;
					ctx.stroke();
				}

				const reach = LIGHT_REACH / len;
				const t1 = Math.max(0, agent.t - reach);
				const t2 = Math.min(1, agent.t + reach);

				// Spotlight along the current edge
				const grad = ctx.createLinearGradient(
					px - nx * LIGHT_REACH,
					py - ny * LIGHT_REACH,
					px + nx * LIGHT_REACH,
					py + ny * LIGHT_REACH,
				);
				grad.addColorStop(0, "rgba(255,255,255,0)");
				grad.addColorStop(0.42, "rgba(255,255,255,0.03)");
				grad.addColorStop(0.5, "rgba(255,255,255,0.12)");
				grad.addColorStop(0.58, "rgba(255,255,255,0.03)");
				grad.addColorStop(1, "rgba(255,255,255,0)");

				ctx.beginPath();
				ctx.moveTo(a.x + dx * t1, a.y + dy * t1);
				ctx.lineTo(a.x + dx * t2, a.y + dy * t2);
				ctx.strokeStyle = grad;
				ctx.lineWidth = 1.5;
				ctx.stroke();

				// Layered blue glow dot
				ctx.beginPath();
				ctx.arc(px, py, 14, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(100,180,255,0.02)";
				ctx.fill();

				ctx.beginPath();
				ctx.arc(px, py, 6, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(120,200,255,0.07)";
				ctx.fill();

				ctx.beginPath();
				ctx.arc(px, py, 2.5, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(180,225,255,0.3)";
				ctx.fill();
			});

			// Vignette overlay
			const vignette = ctx.createRadialGradient(
				canvas.width / 2,
				canvas.height / 2,
				canvas.height * 0.25,
				canvas.width / 2,
				canvas.height / 2,
				canvas.width * 0.85,
			);
			vignette.addColorStop(0, "rgba(0,0,0,0)");
			vignette.addColorStop(1, "rgba(0,0,0,0.65)");
			ctx.fillStyle = vignette;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 w-full h-full pointer-events-none z-0"
			aria-hidden="true"
		/>
	);
}
