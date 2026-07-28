import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Anurag Dwivedi",
    },
  });

  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        name: "Anurag Dwivedi",
        title: "Full Stack Developer",
        tagline: "Building elegant digital experiences with clean code and thoughtful design.",
        bio: "I'm a passionate full stack developer with a strong foundation in modern web technologies. I enjoy turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing knowledge with the developer community.",
        email: "anurag@example.com",
        phone: "+91 98765 43210",
        location: "India",
        github: "https://github.com/anuragdwivedi",
        linkedin: "https://linkedin.com/in/anuragdwivedi",
        twitter: "https://twitter.com/anuragdwivedi",
        resumeUrl: "#",
        avatarUrl: "",
      },
    });
  }

  const skillCount = await prisma.skill.count();
  if (skillCount === 0) {
    await prisma.skill.createMany({
      data: [
        { name: "TypeScript", category: "Languages", level: 90, order: 1 },
        { name: "JavaScript", category: "Languages", level: 95, order: 2 },
        { name: "Python", category: "Languages", level: 80, order: 3 },
        { name: "React", category: "Frontend", level: 92, order: 4 },
        { name: "Next.js", category: "Frontend", level: 88, order: 5 },
        { name: "Tailwind CSS", category: "Frontend", level: 90, order: 6 },
        { name: "Node.js", category: "Backend", level: 85, order: 7 },
        { name: "Express", category: "Backend", level: 82, order: 8 },
        { name: "PostgreSQL", category: "Database", level: 80, order: 9 },
        { name: "MongoDB", category: "Database", level: 78, order: 10 },
        { name: "Git", category: "Tools", level: 90, order: 11 },
        { name: "Docker", category: "Tools", level: 75, order: 12 },
      ],
    });
  }

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "E-Commerce Platform",
          description: "A full-featured online store with cart, payments, and admin dashboard.",
          longDesc: "Built a scalable e-commerce platform with product catalog, shopping cart, Stripe payment integration, order management, and a comprehensive admin panel for inventory control.",
          techStack: "Next.js,TypeScript,Stripe,PostgreSQL,Prisma",
          liveUrl: "https://example.com",
          githubUrl: "https://github.com",
          featured: true,
          order: 1,
        },
        {
          title: "Task Management App",
          description: "Collaborative project management tool with real-time updates.",
          longDesc: "Developed a Kanban-style task management application with drag-and-drop boards, team collaboration, real-time notifications via WebSockets, and role-based access control.",
          techStack: "React,Node.js,Socket.io,MongoDB,Redis",
          liveUrl: "https://example.com",
          githubUrl: "https://github.com",
          featured: true,
          order: 2,
        },
        {
          title: "AI Content Generator",
          description: "SaaS tool that generates marketing copy using AI models.",
          longDesc: "Created a SaaS platform leveraging OpenAI APIs to generate blog posts, social media content, and ad copy. Includes subscription billing, usage tracking, and content history.",
          techStack: "Next.js,OpenAI API,Stripe,Tailwind CSS",
          githubUrl: "https://github.com",
          featured: false,
          order: 3,
        },
        {
          title: "Weather Dashboard",
          description: "Real-time weather app with forecasts and interactive maps.",
          longDesc: "Interactive weather dashboard featuring 7-day forecasts, hourly data, location search, and animated weather visualizations using OpenWeatherMap API.",
          techStack: "React,TypeScript,Chart.js,OpenWeather API",
          liveUrl: "https://example.com",
          githubUrl: "https://github.com",
          featured: false,
          order: 4,
        },
      ],
    });
  }

  const certCount = await prisma.certificate.count();
  if (certCount === 0) {
    await prisma.certificate.createMany({
      data: [
        {
          title: "AWS Certified Developer – Associate",
          issuer: "Amazon Web Services",
          issueDate: "2024-06",
          credentialId: "AWS-DEV-12345",
          credentialUrl: "https://aws.amazon.com/certification",
          order: 1,
        },
        {
          title: "Meta Front-End Developer Professional Certificate",
          issuer: "Meta (Coursera)",
          issueDate: "2023-11",
          credentialUrl: "https://coursera.org",
          order: 2,
        },
        {
          title: "Google Cloud Professional Cloud Developer",
          issuer: "Google Cloud",
          issueDate: "2024-03",
          credentialId: "GCP-PCD-67890",
          order: 3,
        },
      ],
    });
  }

  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    await prisma.experience.createMany({
      data: [
        {
          company: "Tech Solutions Inc.",
          role: "Senior Full Stack Developer",
          location: "Remote",
          startDate: "2023-01",
          current: true,
          description: "Lead development of customer-facing web applications serving 50K+ users. Architected microservices, mentored junior developers, and improved deployment pipeline reducing release time by 40%.",
          order: 1,
        },
        {
          company: "Digital Innovations Pvt. Ltd.",
          role: "Full Stack Developer",
          location: "Bangalore, India",
          startDate: "2021-06",
          endDate: "2022-12",
          current: false,
          description: "Built and maintained REST APIs and React frontends for enterprise clients. Implemented CI/CD pipelines and automated testing, increasing code coverage from 45% to 85%.",
          order: 2,
        },
        {
          company: "StartUp Labs",
          role: "Junior Web Developer",
          location: "Mumbai, India",
          startDate: "2020-01",
          endDate: "2021-05",
          current: false,
          description: "Developed responsive web pages and internal tools. Collaborated with design team to implement pixel-perfect UI components and optimized page load times by 30%.",
          order: 3,
        },
      ],
    });
  }

  console.log("Database seeded successfully!");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
