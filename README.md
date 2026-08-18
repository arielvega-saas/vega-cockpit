# Vega Cockpit

Panel personal del ecosistema de Ariel Vega: pendientes que requieren decisión, estado de los
proyectos y accesos. Funciona en iPhone (añadir a pantalla de inicio), MacBook y cualquier navegador.

**El repo es público solo porque GitHub Pages gratis lo requiere.** No contiene datos privados: la
página es un cascarón vacío que pide login por mail. Todos los datos viven en Supabase y están
protegidos por Row Level Security — sin sesión válida, la API no devuelve nada.

La clave que figura en el HTML es la *publishable key*, diseñada para viajar en el cliente.

Fuente de verdad: `~/vega-harness/cockpit/` · se sincroniza con `bin/cockpit-sync.py`.
