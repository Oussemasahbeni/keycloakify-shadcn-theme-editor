import { LandingNavbar } from '#/components/landing'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: LandingNavbar })
