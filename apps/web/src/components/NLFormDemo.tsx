"use client";
import NLForm, { Parsed } from "@/components/NLForm";

export default function NLFormDemo() {
  const onSubmit = (p: Parsed) => {
    // Demo: replace with navigation or API call
    console.log("Parsed:", p);
    alert("Parsed: " + JSON.stringify(p));
  };

  return <NLForm onSubmit={onSubmit} />;
}
