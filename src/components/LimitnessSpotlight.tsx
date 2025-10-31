"use client"
import { Spotlight } from "@/components/ui/spotlight-new"

type Props = React.ComponentProps<typeof Spotlight> & { opacity?: number }

export function LimitnessSpotlight({
  opacity = 0.12,
  duration = 10,
  xOffset = 120,
  translateY = -360,
  width = 520,
  height = 1280,
  smallWidth = 220,
  ...rest
}: Props) {
  const g1 = `radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(255,233,0,${opacity}) 0%, rgba(255,233,0,${opacity * 0.4}) 40%, rgba(255,233,0,0) 80%)`
  const g2 = `radial-gradient(50% 50% at 50% 50%, rgba(255,233,0,${opacity * 0.8}) 0%, rgba(255,233,0,${opacity * 0.2}) 60%, transparent 100%)`
  const g3 = `radial-gradient(50% 50% at 50% 50%, rgba(255,233,0,${opacity * 0.6}) 0%, rgba(255,233,0,${opacity * 0.2}) 70%, transparent 100%)`

  return (
    <Spotlight
      gradientFirst={g1}
      gradientSecond={g2}
      gradientThird={g3}
      duration={duration}
      xOffset={xOffset}
      translateY={translateY}
      width={width}
      height={height}
      smallWidth={smallWidth}
      {...rest}
    />
  )
}