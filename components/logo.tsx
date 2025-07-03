import Image from "next/image"

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return <Image src="/sprkle.png" alt="SparkleSmart Technologies Logo" width={40} height={40} className={className} />
}
