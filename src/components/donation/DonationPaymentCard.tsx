import { useState } from "react";
import { Check, Copy, Smartphone } from "lucide-react";
import type { DonationMethod } from "@/types";
export function DonationPaymentCard({ method }: { method: DonationMethod }) {
  const [status, setStatus] = useState("");
  async function copyNumber() {
    if (!method.number) return;
    try { await navigator.clipboard.writeText(method.number); setStatus("নম্বর কপি হয়েছে"); }
    catch { setStatus("কপি হয়নি — নম্বরটি নির্বাচন করে কপি করুন"); }
  }
  return <article className={`donation-payment donation-payment-${method.id}`}>
    <h3><span className="payment-brand"><Smartphone size={24} /></span>{method.name}</h3>
    <p className="payment-number">{method.number}</p>
    <div className="payment-instruction"><Smartphone aria-hidden="true" size={30} /><span>মোবাইল ব্যাংকিংয়ের মাধ্যমে<br />সরাসরি দান পাঠান</span></div>
    <button type="button" onClick={copyNumber}>{status === "নম্বর কপি হয়েছে" ? <Check size={14} /> : <Copy size={14} />}নম্বর কপি করুন</button>
    <span role="status" className="payment-status">{status}</span>
  </article>;
}
