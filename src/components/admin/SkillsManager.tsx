"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminAlert, AdminButton, AdminInput, AdminModal, AdminSelect } from "@/components/admin/ui";

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  order: number;
};

const categories = ["Languages", "Frontend", "Backend", "Database", "Tools", "Other"];

const emptySkill = { name: "", category: "Languages", level: 80, order: 0 };

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState(emptySkill);
  const [alert, setAlert] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchSkills() {
    const res = await fetch("/api/skills");
    const data = await res.json();
    setSkills(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptySkill);
    setAlert("");
    setModalOpen(true);
  }

  function openEdit(skill: Skill) {
    setEditing(skill);
    setForm({ name: skill.name, category: skill.category, level: skill.level, order: skill.order });
    setAlert("");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setAlert("");

    const url = editing ? `/api/skills/${editing.id}` : "/api/skills";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      setAlert("Failed to save skill");
      return;
    }

    setModalOpen(false);
    fetchSkills();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
    if (res.ok) fetchSkills();
  }

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-sm text-muted">Manage your technical skills</p>
        </div>
        <AdminButton onClick={openCreate}>
          <Plus size={16} className="mr-2 inline" /> Add Skill
        </AdminButton>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div>
              <span className="font-medium">{skill.name}</span>
              <span className="ml-3 text-xs text-muted">{skill.category} · {skill.level}%</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(skill)} className="rounded-lg p-2 text-muted hover:text-foreground"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(skill.id)} className="rounded-lg p-2 text-muted hover:text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Skill" : "Add Skill"}>
        <form onSubmit={handleSave} className="space-y-4">
          {alert && <AdminAlert message={alert} />}
          <AdminInput label="Name" id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <AdminSelect label="Category" id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </AdminSelect>
          <AdminInput label="Level (%)" id="level" type="number" min={0} max={100} value={form.level} onChange={(e) => setForm({ ...form, level: parseInt(e.target.value) || 0 })} />
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
