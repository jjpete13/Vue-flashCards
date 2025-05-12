import {
	h as $,
	g as A,
	f as B,
	e as C,
	F,
	k as M,
	i as N,
	u as R,
	j as V,
	r as c,
	d as g,
	_ as h,
	t as i,
	c as p,
	a as s,
	o as v,
	w,
	b as y,
} from "./index-B2LONaH0.js";
const E = { class: "correct-incorrect-container" },
	L = g({
		__name: "CorrectIncorrect",
		props: {},
		emits: ["correct", "incorrect"],
		setup(d, { emit: r }) {
			const t = r;
			return (e, n) => (
				v(),
				p("div", E, [
					s(
						"button",
						{
							class: "red",
							type: "button",
							onClick: n[0] || (n[0] = (a) => t("incorrect")),
						},
						"Incorrect",
					),
					s(
						"button",
						{
							class: "green",
							type: "button",
							onClick: n[1] || (n[1] = (a) => t("correct")),
						},
						"Correct",
					),
				])
			);
		},
	}),
	T = h(L, [["__scopeId", "data-v-2d7eefa8"]]),
	j = { class: "end-buttons" },
	z = g({
		__name: "End",
		props: {
			percent: { type: Number, required: !0 },
			incorrectAmount: { type: Number, required: !0 },
			correctAmount: { type: String, required: !0 },
		},
		emits: ["restart", "studyIncorrect"],
		setup(d, { emit: r }) {
			const t = d,
				e = r,
				n = c(t.correctAmount);
			return (
				w(
					() => t.correctAmount,
					() => {
						n.value = t.correctAmount;
					},
				),
				(a, o) => {
					const l = B("RouterLink");
					return (
						v(),
						p(
							F,
							null,
							[
								s(
									"h2",
									null,
									i(n.value) + "(" + i(d.percent) + "%) Correct",
									1,
								),
								s("div", j, [
									d.incorrectAmount > 0
										? (v(),
											p(
												"button",
												{
													key: 0,
													class: "green",
													onClick: o[0] || (o[0] = (u) => e("studyIncorrect")),
												},
												"Study Incorrect",
											))
										: y("", !0),
									s(
										"button",
										{
											class: "green",
											onClick: o[1] || (o[1] = (u) => e("restart")),
										},
										"Restart",
									),
									C(
										l,
										{ class: "button", to: "/" },
										{
											default: A(
												() => o[2] || (o[2] = [$("Select Categories")]),
											),
											_: 1,
										},
									),
								]),
							],
							64,
						)
					);
				}
			);
		},
	}),
	D = h(z, [["__scopeId", "data-v-aae583bf"]]),
	H = {},
	Q = {
		xmlns: "http://www.w3.org/2000/svg",
		width: "16",
		height: "16",
		fill: "currentColor",
		class: "bi bi-arrow-repeat",
		viewBox: "0 0 16 16",
	};
function G(d, r) {
	return (
		v(),
		p(
			"svg",
			Q,
			r[0] ||
				(r[0] = [
					s(
						"path",
						{
							d: "M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9",
						},
						null,
						-1,
					),
					s(
						"path",
						{
							"fill-rule": "evenodd",
							d: "M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z",
						},
						null,
						-1,
					),
				]),
		)
	);
}
const J = h(H, [["render", G]]),
	K = { class: "card" },
	O = { class: "content" },
	P = g({
		__name: "FlashCard",
		emits: ["flip"],
		setup(d, { emit: r }) {
			const t = r;
			return (e, n) => (
				v(),
				p("div", K, [
					s("div", O, [s("h1", null, [N(e.$slots, "default", {}, void 0)])]),
					s(
						"button",
						{
							class: "flip",
							id: "flip-button",
							onMousedown: n[0] || (n[0] = (a) => t("flip")),
						},
						[C(J)],
						32,
					),
				])
			);
		},
	}),
	U = h(P, [["__scopeId", "data-v-b0fe180d"]]),
	W = { key: 0, class: "card-group" },
	X = { key: 1, class: "card-group" },
	Y = g({
		__name: "CardView",
		setup(d) {
			const r = R(),
				t = c(r.questions || []);
			w(
				() => r.questions,
				(f) => {
					t.value = f;
				},
			);
			let e = 0;
			const n = c(t.value[e]),
				a = c(t.value[e].question),
				o = c(a.value === n.value.answer),
				l = c([]),
				u = c(0),
				m = c(0),
				_ = c(!1),
				I = () => {
					var f;
					(f = document.getElementById("flip-button")) == null || f.blur(),
						setTimeout(() => {
							o.value
								? (a.value = n.value.question)
								: (a.value = n.value.answer),
								(o.value = !o.value);
						}, 375);
				},
				b = () => (u.value === 0 ? 0 : Math.floor((u.value / e) * 100)),
				k = () => {
					l.value.push(n.value),
						e === t.value.length - 1 && (_.value = !0),
						(e = e === t.value.length - 1 ? e : e + 1),
						(n.value = t.value[e]),
						(a.value = t.value[e].question),
						(o.value = !1),
						(m.value = b());
				},
				q = () => {
					u.value++,
						e === t.value.length - 1 && (_.value = !0),
						(e = e === t.value.length - 1 ? e : e + 1),
						(n.value = t.value[e]),
						(a.value = t.value[e].question),
						(o.value = !1),
						(m.value = b());
				},
				x = () => {
					(e = 0),
						(t.value = r.questions),
						(n.value = t.value[e]),
						(a.value = t.value[e].question),
						(o.value = !1),
						(l.value = []),
						(u.value = 0),
						(m.value = 0),
						(_.value = !1);
				},
				S = () => {
					(e = 0),
						(t.value = l.value),
						(n.value = t.value[e]),
						(a.value = t.value[e].question),
						(o.value = !1),
						(l.value = []),
						(u.value = 0),
						(m.value = 0),
						(_.value = !1);
				};
			return (f, Z) =>
				_.value
					? (v(),
						p("main", W, [
							C(
								D,
								{
									correctAmount: `${u.value} / ${u.value + l.value.length}`,
									percent: m.value,
									incorrectAmount: l.value.length,
									onRestart: x,
									onStudyIncorrect: S,
								},
								null,
								8,
								["correctAmount", "percent", "incorrectAmount"],
							),
						]))
					: (v(),
						p("main", X, [
							s(
								"h2",
								null,
								"Question: " + i(M(e) + 1) + " / " + i(t.value.length),
								1,
							),
							s(
								"h2",
								null,
								i(u.value) +
									" / " +
									i(u.value + l.value.length) +
									"(" +
									i(m.value) +
									"%) Correct",
								1,
							),
							C(
								U,
								{ onFlip: I },
								{ default: A(() => [$(i(a.value), 1)]), _: 1 },
							),
							o.value
								? (v(), V(T, { key: 0, onIncorrect: k, onCorrect: q }))
								: y("", !0),
						]));
		},
	}),
	te = h(Y, [["__scopeId", "data-v-478db4a2"]]);
export { te as default };
