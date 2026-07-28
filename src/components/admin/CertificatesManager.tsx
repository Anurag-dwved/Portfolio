"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminAlert, AdminButton, AdminInput, AdminModal, AdminTextarea } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  imageUrl: string | null;
  order: number;
};

const emptyCert = {
  title: "",
  issuer: "",
  issueDate: "",
  expiryDate: "",
  credentialId: "",
  credentialUrl: "",
  imageUrl: "",
  order: 0,
};

export default function CertificatesManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [form, setForm] = useState(emptyCert);
  const [alert, setAlert] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchCertificates() {
    const res = await fetch("/api/certificates");
    const data = await res.json();
    setCertificates(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCertificates();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyCert);
    setAlert("");
    setModalOpen(true);
  }

  function openEdit(cert: Certificate) {
    setEditing(cert);
    setForm({
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate || "",
      credentialId: cert.credentialId || "",
      credentialUrl: cert.credentialUrl || "",
      imageUrl: cert.imageUrl || "",
      order: cert.order,
    });
    setAlert("");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setAlert("");

    const url = editing ? `/api/certificates/${editing.id}` : "/api/certificates";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      setAlert("Failed to save certificate");
      return;
    }

    setModalOpen(false);
    fetchCertificates();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" });
    if (res.ok) fetchCertificates();
  }

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Certificates</h1>
          <p className="text-sm text-muted">Manage your professional certifications</p>
        </div>
        <AdminButton onClick={openCreate}>
          <Plus size={16} className="mr-2 inline" /> Add Certificate
        </AdminButton>
      </div>

      <div className="space-y-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="flex items-start justify-between rounded-xl border border-border bg-surface p-5">
            <div>
              <h3 className="mb-1 font-semibold">{cert.title}</h3>
              <p className="text-sm text-accent-light">{cert.issuer}</p>
              <p className="text-xs text-muted">Issued {formatDate(cert.issueDate)}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(cert)} className="rounded-lg p-2 text-muted hover:bg-surface-light hover:text-foreground">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(cert.id)} className="rounded-lg p-2 text-muted hover:bg-red-500/10 hover:text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {certificates.length === 0 && (
          <p className="py-12 text-center text-muted">No certificates yet. Add your first certificate!</p>
        )}
      </div>

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Certificate" : "Add Certificate"}>
        <form onSubmit={handleSave} className="space-y-4">
          {alert && <AdminAlert message={alert} />}
          <AdminInput label="Title" id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <AdminInput label="Issuer" id="issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} required />
          <AdminInput label="Issue Date (YYYY-MM)" id="issueDate" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} placeholder="2024-06" required />
          <AdminInput label="Expiry Date (YYYY-MM)" id="expiryDate" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
          <AdminInput label="Credential ID" id="credentialId" value={form.credentialId} onChange={(e) => setForm({ ...form, credentialId: e.target.value })} />
          <AdminInput label="Credential URL" id="credentialUrl" value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} />
          <AdminInput label="Order" id="order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
          <div className="flex gap-3 pt-2">
            <AdminButton type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</AdminButton>
            <AdminButton type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
