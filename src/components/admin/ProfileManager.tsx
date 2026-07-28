"use client";

import { useEffect, useState } from "react";
import { AdminAlert, AdminButton, AdminInput, AdminTextarea } from "@/components/admin/ui";

type Profile = {
  id: string;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string | null;
  location: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  resumeUrl: string | null;
  avatarUrl: string | null;
};

export default function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "error" | "success" } | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setAlert(null);

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    setSaving(false);

    if (res.ok) {
      setAlert({ message: "Profile updated successfully!", type: "success" });
    } else {
      setAlert({ message: "Failed to update profile", type: "error" });
    }
  }

  if (loading) return <p className="text-muted">Loading...</p>;
  if (!profile) return <p className="text-muted">No profile found.</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted">Edit your personal information and social links</p>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl space-y-4">
        {alert && <AdminAlert message={alert.message} type={alert.type} />}
        <AdminInput label="Name" id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
        <AdminInput label="Title" id="title" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} required />
        <AdminInput label="Tagline" id="tagline" value={profile.tagline} onChange={(e) => setProfile({ ...profile, tagline: e.target.value })} required />
        <AdminTextarea label="Bio" id="bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} rows={5} required />
        <AdminInput label="Email" id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
        <AdminInput label="Phone" id="phone" value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
        <AdminInput label="Location" id="location" value={profile.location || ""} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />
        <AdminInput label="GitHub URL" id="github" value={profile.github || ""} onChange={(e) => setProfile({ ...profile, github: e.target.value })} />
        <AdminInput label="LinkedIn URL" id="linkedin" value={profile.linkedin || ""} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} />
        <AdminInput label="Twitter URL" id="twitter" value={profile.twitter || ""} onChange={(e) => setProfile({ ...profile, twitter: e.target.value })} />
        <AdminInput label="Resume URL" id="resumeUrl" value={profile.resumeUrl || ""} onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })} />
        <AdminButton type="submit" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</AdminButton>
      </form>
    </div>
  );
}
