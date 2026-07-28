"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminAlert, AdminButton, AdminCheckbox, AdminInput, AdminModal, AdminTextarea } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";

type Experience = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  order: number;
};

const emptyExp = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  order: 0,
};

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState(emptyExp);
  const [alert, setAlert] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchExperiences() {
    const res = await fetch("/api/experience");
    const data = await res.json();
    setExperiences(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchExperiences();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyExp);
    setAlert("");
    setModalOpen(true);
  }

  function openEdit(exp: Experience) {
    setEditing(exp);
    setForm({
      company: exp.company,
      role: exp.role,
      location: exp.location || "",
      startDate: exp.startDate,
      endDate: exp.endDate || "",
      current: exp.current,
      description: exp.description,
      order: exp.order,
    });
    setAlert("");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setAlert("");

    const url = editing ? `/api/experience/${editing.id}` : "/api/experience";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      setAlert("Failed to save experience");
      return;
    }

    setModalOpen(false);
    fetchExperiences();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
    if (res.ok) fetchExperiences();
  }

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Experience</h1>
          <p className="text-sm text-muted">Manage your work history</p>
        </div>
        <AdminButton onClick={openCreate}>
          <Plus size={16} className="mr-2 inline" /> Add Experience
        </AdminButton>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex items-start justify-between rounded-xl border border-border bg-surface p-5">
            <div>
              <h3 className="font-semibold">{exp.role}</h3>
              <p className="text-sm text-accent-light">{exp.company}</p>
              <p className="text-xs text-muted">
                {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate || "")}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(exp)} className="rounded-lg p-2 text-muted hover:text-foreground"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(exp.id)} className="rounded-lg p-2 text-muted hover:text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Experience" : "Add Experience"}>
        <form onSubmit={handleSave} className="space-y-4">
          {alert && <AdminAlert message={alert} />}
          <AdminInput label="Role" id="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          <AdminInput label="Company" id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
          <AdminInput label="Location" id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <AdminInput label="Start Date (YYYY-MM)" id="startDate" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
          <AdminInput label="End Date (YYYY-MM)" id="endDate" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} disabled={form.current} />
          <AdminCheckbox label="Currently working here" id="current" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? "" : form.endDate })} />
          <AdminTextarea label="Description" id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} required />
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
