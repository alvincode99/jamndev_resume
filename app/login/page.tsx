import { LoginForm } from "@/components/forms/login-form";
import { Container } from "@/components/ui/container";

/**
 * PÃ¡gina pÃºblica de login para acceso al panel admin.
 * @param props Query params del App Router.
 * @returns Formulario de autenticaciÃ³n.
 */
export default async function LoginPage(props: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md">
        <LoginForm callbackUrl={searchParams.callbackUrl ?? "/admin"} />
      </div>
    </Container>
  );
}
