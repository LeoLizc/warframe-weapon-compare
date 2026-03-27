# Warframe Weapon Compare

Aplicacion web para comparar armas de Warframe con visualizaciones interactivas.

Base URL de produccion: https://warframe.leoliz.tech/

## Caracteristicas

- Comparacion de hasta 6 armas en paralelo.
- Graficos para contrastar estadisticas clave como crit chance, crit multiplier, status chance, speed y dano total.
- Soporte para distintos modos de ataque por arma.
- Tabla comparativa detallada.
- Persistencia de seleccion en URL (`?weapons=...`) para compartir comparaciones.
- Datos obtenidos desde la API publica de warframestat.us.

## Stack

- Preact + TypeScript + Vite
- Mantine (UI)
- Recharts / Mantine Charts
- Tailwind CSS

## Requisitos

- Node.js 20+ recomendado
- pnpm 9+

## Instalacion

```bash
pnpm install
```

## Scripts

- `pnpm dev`: levanta el entorno local con recarga en caliente.
- `pnpm build`: compila TypeScript y genera build de produccion.
- `pnpm preview`: sirve localmente el build de produccion.

## Desarrollo

```bash
pnpm dev
```

Luego abre la URL que imprime Vite (normalmente http://localhost:5173).

## Build de produccion

```bash
pnpm build
pnpm preview
```

Los archivos generados quedan en `dist/`.

## Estructura del proyecto

```text
src/
  components/
    sections/
  hooks/
  services/
  constants/
  types/
  utils/
public/
```

## Fuente de datos

Los datos de armas se consultan desde:

- `https://api.warframestat.us/weapons/`

La app transforma y normaliza esos datos en `src/services/weapon.ts`.
