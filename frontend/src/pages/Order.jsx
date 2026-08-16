import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from "lucide-react";
import BottlePreview from "@/components/BottlePreview";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Paste your real values from the EmailJS dashboard here
const EMAILJS_SERVICE_ID = "service_xq84uz1";
const EMAILJS_TEMPLATE_ID = "template_0d0iz6";
const EMAILJS_PUBLIC_KEY = "89X5kY0I9BY2QdzCu";

const SIZES = ["250 ml", "500 ml", "1 L"];
const VARIETIES = ["Mineral water", "RO water", "Scented water", "Flavoured water"];
const CAPS = [
  { name: "Navy", value: "#0B2545" },
  { name: "Black", value: "#1B1B18" },
  { name: "Sage", value: "#9CAF88" },
];
const PAPERS = [
  { name: "Bone", value: "#F4EEE2" },
  { name: "White", value: "#FFFFFF" },
  { name: "Kraft", value: "#C9A876" },
];
const STEP_TITLES = ["Size", "Variety", "Cap and label", "Summary"];

const OptionCard = ({ selected, onClick, title, sub, testid }) => (
  <button
    type="button"
    data-testid={testid}
    onClick={onClick}
    aria-pressed={selected}
    className={`w-full border px-6 py-5 text-left transition-colors duration-300 ${
      selected ? "border-navy bg-navy text-bone" : "border-line bg-paper hover:border-navy/40"
    }`}
  >
    <span className="flex items-center justify-between">
      <span className="text-base font-medium">{title}</span>
      {selected && <Check size={16} />}
    </span>
    {sub && (
      <span className={`mt-1 block text-xs ${selected ? "text-bone/70" : "text-inklight"}`}>
        {sub}
      </span>
    )}
  </button>
);

export default function Order() {
  const [step, setStep] = useState(0);
  const [size, setSize] = useState("500 ml");
  const [variety, setVariety] = useState("Mineral water");
  const [cap, setCap] = useState(CAPS[0]);
  const [paper, setPaper] = useState(PAPERS[0]);
  const [labelText, setLabelText] = useState("");
  const [labelError, setLabelError] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(null);
  const [touched, setTouched] = useState(false);

  const validateLabel = (v) => {
    if (!v.trim()) return "Label text is required — up to 14 characters.";
    return "";
  };

  const next = () => {
    if (step === 2) {
      const err = validateLabel(labelText);
      setLabelError(err);
      setTouched(true);
      if (err) return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    const err = validateLabel(labelText);
    if (err) {
      setLabelError(err);
      setStep(2);
      return;
    }
    if (!name.trim() || !phone.trim()) {
      toast.error("Add your name and phone number so we can reach you.");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API}/orders`, {
        size,
        variety,
        capColor: cap.name,
        labelPaper: paper.name,
        labelText: labelText.trim(),
        quantity,
        name: name.trim(),
        phone: phone.trim(),
      });
      setPlaced(data);
      toast.success("Order received. We will call you with a quote.");

      // Notify the owner by email — this runs after the order is already
      // saved, so a failure here never blocks or loses the order itself.
      emailjs
        .send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            size,
            variety,
            capColor: cap.name,
            labelPaper: paper.name,
            labelText: labelText.trim(),
            quantity,
            name: name.trim(),
            phone: phone.trim(),
          },
          { publicKey: EMAILJS_PUBLIC_KEY }
        )
        .catch((err) => console.error("Order email failed to send:", err));
    } catch {
      toast.error("Something went wrong sending the order. Please call us instead.");
    } finally {
      setSubmitting(false);
    }
  };

  const summary = useMemo(
    () => [
      ["Size", size],
      ["Variety", variety],
      ["Cap", cap.name],
      ["Label paper", paper.name],
      ["Label text", labelText || "—"],
      ["Quantity", quantity.toLocaleString("en-IN")],
    ],
    [size, variety, cap, paper, labelText, quantity]
  );

  if (placed) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-48 md:px-12 lg:px-24" data-testid="order-success">
        <p className="label-caps text-silver">Order received</p>
        <h1 className="mt-6 font-serif text-4xl tracking-tight text-navy md:text-6xl">
          Thank you, {placed.name.split(" ")[0]}.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink">
          Your request for {placed.quantity.toLocaleString("en-IN")} × {placed.size}{" "}
          {placed.variety.toLowerCase()} bottles labelled "{placed.labelText}" is with
          the plant. We will call {placed.phone} shortly with pricing.
        </p>
        <p className="mt-8 text-xs text-inklight">Reference · {placed.id}</p>
        <button
          data-testid="order-again-btn"
          onClick={() => {
            setPlaced(null);
            setStep(0);
          }}
          className="mt-10 rounded-sm border border-navy px-8 py-4 text-sm text-navy transition-colors duration-300 hover:bg-navy hover:text-bone"
        >
          Place another order
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-40 md:px-12 lg:px-24" data-testid="order-page">
      <p className="label-caps text-silver">Order — three steps</p>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-navy md:text-6xl">
        Build your bottle
      </h1>

      <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Preview */}
        <div className="lg:order-2">
          <div className="sticky top-28 flex flex-col items-center border border-line bg-bone px-8 py-12">
            <BottlePreview
              size={size}
              variety={variety}
              capColor={cap.value}
              labelPaper={paper.value}
              labelText={labelText}
            />
            <div className="mt-8 flex w-full items-center justify-between border-t border-line pt-6 text-xs text-inklight">
              <span data-testid="preview-recap">{size} · {variety}</span>
              <span>{cap.name} cap · {paper.name} label</span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="lg:order-1">
          <p className="label-caps text-silver" data-testid="step-indicator">
            Step {Math.min(step + 1, 3)} of 3 — {STEP_TITLES[step]}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              {step === 0 && (
                <div className="space-y-4" data-testid="step-size">
                  <h2 className="font-serif text-2xl tracking-tight text-navy">Choose a size</h2>
                  {SIZES.map((s) => (
                    <OptionCard
                      key={s}
                      testid={`size-${s.replace(/\s/g, "-").toLowerCase()}`}
                      title={s}
                      sub={s === "250 ml" ? "Events and travel" : s === "500 ml" ? "Everyday retail" : "Tables and families"}
                      selected={size === s}
                      onClick={() => setSize(s)}
                    />
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4" data-testid="step-variety">
                  <h2 className="font-serif text-2xl tracking-tight text-navy">Choose a variety</h2>
                  {VARIETIES.map((v) => (
                    <OptionCard
                      key={v}
                      testid={`variety-${v.split(" ")[0].toLowerCase()}`}
                      title={v}
                      selected={variety === v}
                      onClick={() => setVariety(v)}
                    />
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10" data-testid="step-customize">
                  <h2 className="font-serif text-2xl tracking-tight text-navy">Cap and label</h2>

                  <div>
                    <p className="label-caps text-inklight">Cap colour</p>
                    <div className="mt-4 flex gap-4">
                      {CAPS.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          data-testid={`cap-${c.name.toLowerCase()}`}
                          onClick={() => setCap(c)}
                          aria-pressed={cap.name === c.name}
                          aria-label={`${c.name} cap`}
                          className={`h-10 w-10 rounded-full border-2 transition-transform duration-300 hover:scale-110 ${
                            cap.name === c.name ? "border-navy ring-2 ring-navy ring-offset-2 ring-offset-paper" : "border-line"
                          }`}
                          style={{ backgroundColor: c.value }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="label-caps text-inklight">Label paper</p>
                    <div className="mt-4 flex gap-4">
                      {PAPERS.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          data-testid={`paper-${p.name.toLowerCase()}`}
                          onClick={() => setPaper(p)}
                          aria-pressed={paper.name === p.name}
                          className={`flex items-center gap-3 border px-5 py-3 text-sm transition-colors duration-300 ${
                            paper.name === p.name ? "border-navy bg-bone" : "border-line hover:border-navy/40"
                          }`}
                        >
                          <span className="h-5 w-5 rounded-full border border-line" style={{ backgroundColor: p.value }} />
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="label-text" className="label-caps text-inklight">
                      Label text — up to 14 characters
                    </label>
                    <input
                      id="label-text"
                      data-testid="label-text-input"
                      type="text"
                      maxLength={14}
                      value={labelText}
                      placeholder="Your name or brand"
                      onChange={(e) => {
                        setLabelText(e.target.value);
                        if (touched) setLabelError(validateLabel(e.target.value));
                      }}
                      onBlur={() => {
                        setTouched(true);
                        setLabelError(validateLabel(labelText));
                      }}
                      className="mt-3 w-full border-b border-silver bg-transparent px-0 py-3 font-serif text-2xl text-navy placeholder:text-silver/60 focus:border-navy focus:outline-none"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      {labelError ? (
                        <p className="text-xs text-red-800" role="alert" data-testid="label-text-error">
                          {labelError}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-inklight">{labelText.length}/14</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10" data-testid="step-summary">
                  <h2 className="font-serif text-2xl tracking-tight text-navy">Review and place</h2>

                  <dl className="divide-y divide-line border-y border-line">
                    {summary.map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between py-4 text-sm">
                        <dt className="label-caps text-inklight">{k}</dt>
                        <dd className="text-navy" data-testid={`summary-${k.toLowerCase().replace(/\s/g, "-")}`}>{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div>
                    <p className="label-caps text-inklight">Quantity</p>
                    <div className="mt-4 flex items-center gap-6">
                      <button
                        type="button"
                        data-testid="qty-minus"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity((q) => Math.max(10, q - 10))}
                        className="flex h-10 w-10 items-center justify-center border border-line transition-colors duration-300 hover:border-navy"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-20 text-center font-serif text-2xl" data-testid="qty-value">
                        {quantity.toLocaleString("en-IN")}
                      </span>
                      <button
                        type="button"
                        data-testid="qty-plus"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity((q) => q + 10)}
                        className="flex h-10 w-10 items-center justify-center border border-line transition-colors duration-300 hover:border-navy"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="order-name" className="label-caps text-inklight">Your name</label>
                      <input
                        id="order-name"
                        data-testid="order-name-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-3 w-full border-b border-silver bg-transparent px-0 py-3 text-navy focus:border-navy focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="order-phone" className="label-caps text-inklight">Phone</label>
                      <input
                        id="order-phone"
                        data-testid="order-phone-input"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-3 w-full border-b border-silver bg-transparent px-0 py-3 text-navy focus:border-navy focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="mt-14 flex items-center justify-between border-t border-line pt-8">
            <button
              type="button"
              data-testid="step-back-btn"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm text-ink transition-colors duration-300 hover:text-navy disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft size={15} /> Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                data-testid="step-next-btn"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-sm bg-navy px-8 py-4 text-sm text-bone transition-colors duration-300 hover:bg-navy/90"
              >
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                data-testid="place-order-btn"
                onClick={submit}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-sm bg-navy px-8 py-4 text-sm text-bone transition-colors duration-300 hover:bg-navy/90 disabled:opacity-50"
              >
                {submitting ? "Placing…" : "Place order"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
