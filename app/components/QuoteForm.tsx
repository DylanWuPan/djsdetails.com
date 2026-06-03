"use client";

import { useState } from "react";

interface QuoteForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function QuoteForm() {
  const [form, setForm] = useState<QuoteForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  if (submitted) {
    return (
      <div className="success-msg" role="status">
        <div className="success-title">Quote Request Sent!</div>
        <p className="success-sub">
          DJ will personally reach out within 24 hours to talk through your car
          and what you are looking for.
        </p>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Full Name *
        </label>
        <input
          id="name"
          name="name"
          className="form-control"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="form-control"
          placeholder="(781) 690-2612"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group full">
        <label className="form-label" htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group full">
        <label className="form-label" htmlFor="message">
          Service Requests
        </label>
        <textarea
          id="message"
          name="message"
          className="form-control"
          placeholder="Tell me about your car and what you are looking to get done..."
          value={form.message}
          onChange={handleChange}
        />
      </div>
      <div className="form-group full">
        <button className="btn-primary form-submit" type="submit">
          Send Quote Request
        </button>
      </div>
    </form>
  );
}
