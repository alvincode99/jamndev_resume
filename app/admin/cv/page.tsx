import { CvEditor } from "@/components/admin/cv-editor";
import { getCvProfile } from "@/server/repositories/cv.repository";

export const dynamic = "force-dynamic";

/**
 * PÃ¡gina de ediciÃ³n de informaciÃ³n central del CV.
 * @returns Formulario admin de perfil profesional.
 */
export default async function AdminCvPage() {
  const profile = await getCvProfile();

  return <CvEditor profile={profile} />;
}
