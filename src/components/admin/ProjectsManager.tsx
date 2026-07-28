"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { AdminAlert, AdminButton, AdminCheckbox, AdminInput, AdminModal, AdminTextarea } from "@/components/admin/ui";
import { parseTechStack } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  description: string;
  longDesc: string | null;
  imageUrl: string | null;
  techStack: string;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  order: number;
};

const emptyProject = {
  title: "",
  description: "",
  longDesc: "",
  imageUrl: "",
  techStack: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  order: 0,
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [alert, setAlert] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyProject);
    setAlert("");
    setModalOpen(true);
  }

  function openEdit(project: Project) {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      longDesc: project.longDesc || "",
      imageUrl: project.imageUrl || "",
      techStack: project.techStack,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured,
      order: project.order,
    });
    setAlert("");
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setAlert("");

    const url = editing ? `/api/projects/${editing.id}` : "/api/projects";
    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      setAlert("Failed to save project");
      return;
    }

    setModalOpen(false);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) fetchProjects();
  }

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted">Add, edit, or remove portfolio projects</p>
        </div>
        <AdminButton onClick={openCreate}>
          <Plus size={16} className="mr-2 inline" /> Add Project
        </AdminButton>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-start justify-between rounded-xl border border-border bg-surface p-5">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-semibold">{project.title}</h3>
                {project.featured && (
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent-light">Featured</span>
                )}
              </div>
              <p className="mb-2 text-sm text-muted">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {parseTechStack(project.techStack).map((tech) => (
                  <span key={tech} className="rounded border border-border px-2 py-0.5 text-xs text-muted">{tech}</span>
                ))}
              </div>
            </div>
            <div className="ml-4 flex gap-2">
              <button onClick={() => openEdit(project)} className="rounded-lg p-2 text-muted hover:bg-surface-light hover:text-foreground">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(project.id)} className="rounded-lg p-2 text-muted hover:bg-red-500/10 hover:text-red-400">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="py-12 text-center text-muted">No projects yet. Add your first project!</p>
        )}
      </div>

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Project" : "Add Project"}>
        <form onSubmit={handleSave} className="space-y-4">
          {alert && <AdminAlert message={alert} />}
          <AdminInput label="Title" id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <AdminTextarea label="Short Description" id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} required />
          <AdminTextarea label="Long Description" id="longDesc" value={form.longDesc} onChange={(e) => setForm({ ...form, longDesc: e.target.value })} rows={3} />
          <AdminInput label="Tech Stack (comma-separated)" id="techStack" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} placeholder="React, Node.js, PostgreSQL" required />
          <AdminInput label="Live URL" id="liveUrl" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
          <AdminInput label="GitHub URL" id="githubUrl" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
          <AdminInput label="Image URL" id="imageUrl" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <AdminInput label="Order" id="order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
          <AdminCheckbox label="Featured project" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          <div className="flex gap-3 pt-2">
            <AdminButton type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</AdminButton>
            <AdminButton type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
