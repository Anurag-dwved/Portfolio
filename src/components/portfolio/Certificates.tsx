import { Award, ExternalLink } from "lucide-react";
import type { Certificate } from "@prisma/client";
import { formatDate } from "@/lib/utils";

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
  return (
    <section id="certificates" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Certificates</span>
          </h2>
          <div className="mx-auto h-1 w-16 rounded-full bg-accent" />
          <p className="mt-4 text-muted">Professional certifications and credentials</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group rounded-2xl border border-border bg-surface-light p-6 transition-all hover:border-accent/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Award className="text-accent-light" size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{cert.title}</h3>
              <p className="mb-1 text-sm text-accent-light">{cert.issuer}</p>
              <p className="mb-3 text-xs text-muted">Issued {formatDate(cert.issueDate)}</p>
              {cert.credentialId && (
                <p className="mb-3 text-xs text-muted">ID: {cert.credentialId}</p>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent-light"
                >
                  <ExternalLink size={14} /> Verify
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
