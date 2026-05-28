'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Github, Menu, X } from 'lucide-react'
import { useState } from 'react'

import { cn } from '#/lib/utils'
import { useOidc } from '#/oidc'
import { Logo } from './logo'
import { ModeToggle } from './mode-toggle'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet'

const navigationItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Features', href: '#features' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

// Smooth scroll function
const smoothScrollTo = (targetId: string) => {
  if (targetId.startsWith('#')) {
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
}

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { login } = useOidc({ assert: 'user not logged in' })
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a
            href="https://shadcnstore.com"
            className="flex items-center space-x-2 cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo size={32} />
            <span className="font-bold">Keycloak Theme Editor</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden xl:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    if (item.href.startsWith('#')) {
                      smoothScrollTo(item.href)
                    } else {
                      window.location.href = item.href
                    }
                  }}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center space-x-2">
          <ModeToggle />
          <a
            href="https://github.com/silicondeck/shadcn-dashboard-landing-template"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'cursor-pointer',
            )}
          >
            <Github className="h-5 w-5" />
          </a>
          <Button onClick={() => login()}>Get Started</Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            }
            className="xl:hidden"
          ></SheetTrigger>
          <SheetContent className="w-full sm:w-100 p-0 gap-0 [&>button]:hidden overflow-hidden flex flex-col">
            <div className="flex flex-col h-full">
              {/* Header */}
              <SheetHeader className="space-y-0 p-4 pb-2 border-b">
                <div className="flex items-center gap-2">
                  <Logo size={32} />

                  <div className="ml-auto flex items-center gap-2">
                    <ModeToggle />
                    <a
                      href="https://github.com/silicondeck/shadcn-dashboard-landing-template"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Repository"
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'icon' }),
                        'cursor-pointer h-8 w-8',
                      )}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="cursor-pointer h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-6 space-y-1">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      <a
                        href={item.href}
                        className="flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        onClick={(e) => {
                          setIsOpen(false)
                          if (item.href.startsWith('#')) {
                            e.preventDefault()
                            setTimeout(() => smoothScrollTo(item.href), 100)
                          }
                        }}
                      >
                        {item.name}
                      </a>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Footer Actions */}
              <div className="border-t p-6 space-y-4">
                <Button size="lg" onClick={() => login()}>
                  Get Started
                </Button>

                {/*<div className="space-y-3">
                  <a
                    href={getAppUrl('/auth/sign-up')}
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'cursor-pointer',
                    )}
                  >
                    Get Started
                  </a>
                </div>*/}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
