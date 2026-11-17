import { redirect } from "next/navigation";

// El contenido de /asesoria quedó viejo (precio y nicho anteriores): por ahora todo va al formulario de la home.
export default function Page() {
  redirect("/#aplicar");
}
