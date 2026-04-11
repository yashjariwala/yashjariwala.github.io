"use client";

import { ChangeEvent, FormEvent, useId, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { invitationData } from "@/lib/invitationData";

const EASE = [0.22, 1, 0.36, 1] as const;

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
};

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  notes: "",
  consent: false,
};

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Unable to read file."));
        return;
      }

      const base64 = reader.result.split(",")[1];

      if (!base64) {
        reject(new Error("Unable to encode file."));
        return;
      }

      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}

function formatAcceptedTypes(acceptedMimeTypes: readonly string[]) {
  return acceptedMimeTypes
    .map((mimeType) => {
      switch (mimeType) {
        case "application/pdf":
          return "PDF";
        case "image/jpeg":
          return "JPG";
        case "image/png":
          return "PNG";
        case "image/webp":
          return "WEBP";
        default:
          return mimeType;
      }
    })
    .join(", ");
}

export default function FamilyStayDocumentForm() {
  const { familyStayForm } = invitationData;
  const isConfigured = familyStayForm.appsScriptUrl.trim().length > 0;
  const acceptedTypes = formatAcceptedTypes(familyStayForm.acceptedMimeTypes);
  const maxUploadBytes = familyStayForm.maxUploadMb * 1024 * 1024;
  const fileInputId = useId();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleFieldChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = event.target;
      const nextValue = target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

      setValues((current) => ({
        ...current,
        [field]: nextValue,
      }));
    };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setErrorMessage("");
    setSuccessMessage("");

    if (!file) {
      setAadhaarFile(null);
      return;
    }

    if (!familyStayForm.acceptedMimeTypes.includes(file.type)) {
      setAadhaarFile(null);
      event.target.value = "";
      setErrorMessage(`Please upload one of these file types: ${acceptedTypes}.`);
      return;
    }

    if (file.size > maxUploadBytes) {
      setAadhaarFile(null);
      event.target.value = "";
      setErrorMessage(`Please keep the file under ${familyStayForm.maxUploadMb} MB.`);
      return;
    }

    setAadhaarFile(file);
  };

  const resetForm = () => {
    setValues(initialValues);
    setAadhaarFile(null);

    const input = document.getElementById(fileInputId) as HTMLInputElement | null;
    if (input) {
      input.value = "";
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isConfigured) {
      setErrorMessage("The hotel form is not connected yet. Add the Apps Script web app URL to enable submissions.");
      return;
    }

    if (!values.firstName.trim() || !values.lastName.trim()) {
      setErrorMessage("Please enter both first name and last name.");
      return;
    }

    if (!aadhaarFile) {
      setErrorMessage("Please attach a masked Aadhaar copy before submitting.");
      return;
    }

    if (!values.consent) {
      setErrorMessage("Please confirm that you consent to storing the document for hotel check-in.");
      return;
    }

    startTransition(async () => {
      try {
        const aadhaarBase64 = await fileToBase64(aadhaarFile);

        const payload = {
          submittedAt: new Date().toISOString(),
          sourcePage: "/family-stay",
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          notes: values.notes.trim(),
          consent: values.consent,
          fileName: aadhaarFile.name,
          fileMimeType: aadhaarFile.type,
          fileSize: aadhaarFile.size,
          aadhaarBase64,
        };

        await fetch(familyStayForm.appsScriptUrl, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(payload),
        });

        setSuccessMessage("Details submitted. If the hotel list does not update within a minute, check the Apps Script deployment URL.");
        resetForm();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to submit the form right now.";
        setErrorMessage(message);
      }
    });
  };

  return (
    <section
      id="hotel-form"
      className="relative px-4 py-16 sm:py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fffbf5 0%, #fef6e8 100%)" }}
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12 sm:mb-14 flex flex-col items-center"
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">
            Hotel Check-In
          </p>
          <h2
            className="font-script text-[#4C1215] leading-none mb-5"
            style={{
              fontSize: "clamp(2.8rem, 11vw, 5rem)",
              textShadow: "0 0 40px rgba(212,175,55,0.15)",
            }}
          >
            Share Stay Details
          </h2>
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[#4C1215]/72">
            Please submit one response per hotel guest with a masked Aadhaar copy so the hotel team can prepare the check-in list.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="relative bg-[#fef9f2]/92 backdrop-blur-sm border border-[#D4AF37]/40 p-6 sm:p-8 lg:p-10 overflow-hidden shadow-[0_10px_48px_rgba(212,175,55,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]"
        >
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="absolute inset-[6px] border border-[#D4AF37]/15 pointer-events-none" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] mb-2">
                  Before You Upload
                </p>
                <h3 className="font-serif text-2xl text-[#4C1215] mb-3">
                  Document Checklist
                </h3>
                <p className="text-sm leading-relaxed text-[#4C1215]/72">
                  Upload a masked Aadhaar in PDF or image format. The file will be saved to Google Drive and the sheet will receive the guest details plus the Drive link.
                </p>
              </div>

              <div className="grid gap-3">
                <ChecklistItem label="Use a masked Aadhaar copy whenever possible." />
                <ChecklistItem label={`Accepted formats: ${acceptedTypes}.`} />
                <ChecklistItem label={`Maximum upload size: ${familyStayForm.maxUploadMb} MB.`} />
                <ChecklistItem label="Submit once for each guest who needs hotel check-in." />
              </div>

              {!isConfigured && (
                <div className="rounded-2xl border border-[#F97316]/30 bg-[#fff6ed] px-4 py-4 text-sm leading-relaxed text-[#7a3511]">
                  The form UI is ready, but the Google Apps Script endpoint is not connected yet. Add the deployed web app URL in
                  {" "}
                  <code className="font-mono text-[0.9em]">src/lib/invitationData.ts</code>
                  {" "}
                  to make submissions live.
                </div>
              )}
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <input
                    value={values.firstName}
                    onChange={handleFieldChange("firstName")}
                    className="w-full rounded-2xl border border-[#D4AF37]/30 bg-white/90 px-4 py-3 text-sm text-[#4C1215] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    placeholder="First name"
                    autoComplete="given-name"
                  />
                </Field>
                <Field label="Last name">
                  <input
                    value={values.lastName}
                    onChange={handleFieldChange("lastName")}
                    className="w-full rounded-2xl border border-[#D4AF37]/30 bg-white/90 px-4 py-3 text-sm text-[#4C1215] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    placeholder="Last name"
                    autoComplete="family-name"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone (optional)">
                  <input
                    value={values.phone}
                    onChange={handleFieldChange("phone")}
                    className="w-full rounded-2xl border border-[#D4AF37]/30 bg-white/90 px-4 py-3 text-sm text-[#4C1215] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    placeholder="Phone number"
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Email (optional)">
                  <input
                    value={values.email}
                    onChange={handleFieldChange("email")}
                    className="w-full rounded-2xl border border-[#D4AF37]/30 bg-white/90 px-4 py-3 text-sm text-[#4C1215] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    placeholder="Email address"
                    autoComplete="email"
                    type="email"
                  />
                </Field>
              </div>

              <Field label="Room or stay note (optional)">
                <textarea
                  value={values.notes}
                  onChange={handleFieldChange("notes")}
                  className="min-h-28 w-full rounded-2xl border border-[#D4AF37]/30 bg-white/90 px-4 py-3 text-sm text-[#4C1215] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                  placeholder="Anything the hotel team should know"
                />
              </Field>

              <Field label="Masked Aadhaar copy">
                <div className="rounded-2xl border border-dashed border-[#D4AF37]/45 bg-white/80 px-4 py-4">
                  <input
                    id={fileInputId}
                    type="file"
                    accept={familyStayForm.acceptedMimeTypes.join(",")}
                    onChange={handleFileChange}
                    className="block w-full text-sm text-[#4C1215] file:mr-4 file:rounded-full file:border-0 file:bg-[#4C1215] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#6b191e]"
                  />
                  <p className="mt-3 text-xs text-[#4C1215]/62">
                    {aadhaarFile ? `Selected file: ${aadhaarFile.name}` : "No file selected yet."}
                  </p>
                </div>
              </Field>

              <label className="flex items-start gap-3 rounded-2xl border border-[#D4AF37]/20 bg-white/60 px-4 py-3 text-sm leading-relaxed text-[#4C1215]/78">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={handleFieldChange("consent")}
                  className="mt-1 h-4 w-4 rounded border-[#D4AF37]/50 text-[#4C1215] focus:ring-[#D4AF37]/30"
                />
                <span>
                  I confirm that this document can be stored in Google Drive and referenced in Google Sheets for hotel check-in coordination.
                </span>
              </label>

              {errorMessage && (
                <p className="rounded-2xl border border-[#dc6a5b]/30 bg-[#fff3f1] px-4 py-3 text-sm text-[#9c2f23]">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="rounded-2xl border border-[#7ca57d]/30 bg-[#f4fbf2] px-4 py-3 text-sm text-[#2f6a35]">
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center rounded-full bg-[#4C1215] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#68171c] disabled:cursor-not-allowed disabled:opacity-65"
              >
                {isPending ? "Submitting..." : "Submit Hotel Details"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
        {label}
      </span>
      {children}
    </label>
  );
}

function ChecklistItem({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#D4AF37]/18 bg-white/70 px-4 py-3 text-sm text-[#4C1215]/74">
      <span className="mt-1 h-2.5 w-2.5 rotate-45 bg-[#D4AF37]/75" />
      <span>{label}</span>
    </div>
  );
}
