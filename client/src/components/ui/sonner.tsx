"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-cyber-gray group-[.toaster]:text-white group-[.toaster]:border-neon-pink group-[.toaster]:shadow-neon group-[.toaster]:backdrop-blur-sm group-[.toaster]:border-2 group-[.toaster]:rounded-lg group-[.toaster]:relative group-[.toaster]:overflow-visible group-[.toaster]:p-4 group-[.toaster]:min-w-[350px] group-[.toaster]:max-w-[450px] group-[.toaster]:z-50 group-[.toaster]:pr-12 group-[.toaster]:mb-2",
          description: "group-[.toast]:text-neon-blue group-[.toast]:text-sm group-[.toast]:font-mono group-[.toast]:mt-2 group-[.toast]:opacity-100 group-[.toast]:block group-[.toast]:leading-relaxed",
          actionButton:
            "group-[.toast]:bg-neon-pink group-[.toast]:text-cyber-black group-[.toast]:font-bold group-[.toast]:border-none group-[.toast]:hover:bg-neon-purple group-[.toast]:transition-all group-[.toast]:duration-300 group-[.toast]:rounded group-[.toast]:px-3 group-[.toast]:py-1 group-[.toast]:text-xs group-[.toast]:uppercase group-[.toast]:tracking-wider group-[.toast]:hover:shadow-neon group-[.toast]:hover:scale-105 group-[.toast]:mt-3 group-[.toast]:mr-2 group-[.toast]:inline-block",
          cancelButton:
            "group-[.toast]:bg-cyber-black group-[.toast]:text-neon-blue group-[.toast]:border-neon-blue group-[.toast]:hover:bg-neon-blue group-[.toast]:hover:text-cyber-black group-[.toast]:transition-all group-[.toast]:duration-300 group-[.toast]:rounded group-[.toast]:px-3 group-[.toast]:py-1 group-[.toast]:text-xs group-[.toast]:uppercase group-[.toast]:tracking-wider group-[.toast]:border group-[.toast]:hover:shadow-neon-blue group-[.toast]:hover:scale-105 group-[.toast]:mt-3 group-[.toast]:inline-block",
          title: "group-[.toast]:text-neon-pink group-[.toast]:font-bold group-[.toast]:text-base group-[.toast]:uppercase group-[.toast]:tracking-wider group-[.toast]:font-mono group-[.toast]:opacity-100 group-[.toast]:block group-[.toast]:mb-2 group-[.toast]:leading-tight",
          closeButton: "group-[.toast]:text-neon-red group-[.toast]:hover:text-neon-pink group-[.toast]:transition-colors group-[.toast]:duration-300 group-[.toast]:hover:scale-110 group-[.toast]:absolute group-[.toast]:top-2 group-[.toast]:right-2 group-[.toast]:z-10 group-[.toast]:p-1 group-[.toast]:bg-transparent group-[.toast]:border-none group-[.toast]:text-lg group-[.toast]:font-bold group-[.toast]:cursor-pointer group-[.toast]:w-6 group-[.toast]:h-6 group-[.toast]:flex group-[.toast]:items-center group-[.toast]:justify-center group-[.toast]:rounded group-[.toast]:hover:bg-neon-red group-[.toast]:hover:bg-opacity-20",
          success: "group-[.toast]:border-neon-green group-[.toast]:shadow-neon-green",
          error: "group-[.toast]:border-neon-red group-[.toast]:shadow-neon",
          warning: "group-[.toast]:border-neon-yellow group-[.toast]:shadow-neon",
          info: "group-[.toast]:border-neon-blue group-[.toast]:shadow-neon-blue",
        },
        style: {
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(10, 10, 10, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
        },
      }}
      position="top-right"
      duration={4000}
      closeButton={true}
      richColors={false}
      offset={20}
      gap={4}
      {...props}
    />
  )
}

export { Toaster }
