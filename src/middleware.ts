export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/projects/:path*", "/admin/certificates/:path*", "/admin/profile/:path*", "/admin/skills/:path*", "/admin/experience/:path*"],
};
