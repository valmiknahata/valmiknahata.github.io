"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
    width?: number
    height?: number
    className?: string
    isDarkMode?: boolean
}

export default function RotatingEarth({ width = 800, height = 600, className = "", isDarkMode = true }: RotatingEarthProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        if (!context) return

        // Set up responsive dimensions - Reverting to user's original radius/distortion parameters
        const containerWidth = Math.min(width, window.innerWidth - 40)
        const containerHeight = Math.min(height, window.innerHeight - 100)
        const radius = Math.min(containerWidth, containerHeight) / 2.5

        const dpr = window.devicePixelRatio || 1
        canvas.width = containerWidth * dpr
        canvas.height = containerHeight * dpr
        canvas.style.width = `${containerWidth}px`
        canvas.style.height = `${containerHeight}px`
        context.scale(dpr, dpr)

        // Create projection and path generator for Canvas
        // Center on SoCal [-118, 34] -> rotate [118, -34]
        const defaultRotation: [number, number, number] = [118, -34, 0]
        const rotation: [number, number, number] = [...defaultRotation]
        const defaultScale = radius

        const projection = d3
            .geoOrthographic()
            .scale(radius)
            .translate([containerWidth / 2, containerHeight / 2])
            .rotate(defaultRotation)
            .clipAngle(90)

        const path = d3.geoPath().projection(projection).context(context)

        const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
            const [x, y] = point
            let inside = false

            for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                const [xi, yi] = polygon[i]
                const [xj, yj] = polygon[j]

                if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
                    inside = !inside
                }
            }

            return inside
        }

        const pointInFeature = (point: [number, number], feature: any): boolean => {
            const geometry = feature.geometry

            if (geometry.type === "Polygon") {
                const coordinates = geometry.coordinates
                // Check if point is in outer ring
                if (!pointInPolygon(point, coordinates[0])) {
                    return false
                }
                // Check if point is in any hole (inner rings)
                for (let i = 1; i < coordinates.length; i++) {
                    if (pointInPolygon(point, coordinates[i])) {
                        return false // Point is in a hole
                    }
                }
                return true
            } else if (geometry.type === "MultiPolygon") {
                // Check each polygon in the MultiPolygon
                for (const polygon of geometry.coordinates) {
                    // Check if point is in outer ring
                    if (pointInPolygon(point, polygon[0])) {
                        // Check if point is in any hole
                        let inHole = false
                        for (let i = 1; i < polygon.length; i++) {
                            if (pointInPolygon(point, polygon[i])) {
                                inHole = true
                                break
                            }
                        }
                        if (!inHole) {
                            return true
                        }
                    }
                }
                return false
            }

            return false
        }

        const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
            const dots: [number, number][] = []
            const bounds = d3.geoBounds(feature)
            const [[minLng, minLat], [maxLng, maxLat]] = bounds

            const stepSize = dotSpacing * 0.08
            let pointsGenerated = 0

            for (let lng = minLng; lng <= maxLng; lng += stepSize) {
                for (let lat = minLat; lat <= maxLat; lat += stepSize) {
                    const point: [number, number] = [lng, lat]
                    if (pointInFeature(point, feature)) {
                        dots.push(point)
                        pointsGenerated++
                    }
                }
            }
            return dots
        }

        interface DotData {
            lng: number
            lat: number
            visible: boolean
        }

        const allDots: DotData[] = []
        let landFeatures: any
        const SOCAL: [number, number] = [-118.2437, 34.0522]
        let pulseTimer = 0
        let isInteracting = false

        const render = () => {
            // Clear canvas
            context.clearRect(0, 0, containerWidth, containerHeight)

            const currentScale = projection.scale()
            const scaleFactor = currentScale / radius

            // Draw ocean (globe background) - Match panel backgrounds
            context.beginPath()
            context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
            context.fillStyle = isDarkMode ? "#000000" : "#f7f5f3"
            context.fill()
            context.strokeStyle = isDarkMode ? "#ffffff" : "#000000"
            context.lineWidth = 2 * scaleFactor
            context.stroke()

            if (landFeatures) {
                // Draw graticule
                const graticule = d3.geoGraticule()
                context.beginPath()
                path(graticule())
                context.strokeStyle = isDarkMode ? "#ffffff" : "#000000"
                context.lineWidth = 1 * scaleFactor
                context.globalAlpha = 0.25
                context.stroke()
                context.globalAlpha = 1

                // Draw land outlines
                context.beginPath()
                landFeatures.features.forEach((feature: any) => {
                    path(feature)
                })
                context.strokeStyle = isDarkMode ? "#ffffff" : "#000000"
                context.lineWidth = 1 * scaleFactor
                context.stroke()

                // Draw halftone dots
                allDots.forEach((dot) => {
                    const projected = projection([dot.lng, dot.lat])
                    if (
                        projected &&
                        projected[0] >= 0 &&
                        projected[0] <= containerWidth &&
                        projected[1] >= 0 &&
                        projected[1] <= containerHeight
                    ) {
                        context.beginPath()
                        context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
                        context.fillStyle = isDarkMode ? "#999999" : "#444444"
                        context.fill()
                    }
                })

                // Draw pulsing ping for Southern California
                const projectedPing = projection(SOCAL)
                if (projectedPing) {
                    const distance = d3.geoDistance(SOCAL, [
                        -projection.rotate()[0],
                        -projection.rotate()[1]
                    ])

                    // Only show if it's on the visible side of the globe
                    if (distance < Math.PI / 2) {
                        pulseTimer += 0.05
                        const pulse = (Math.sin(pulseTimer) + 1) / 2 // 0 to 1

                        const pingColor = isDarkMode ? "hsl(320, 100%, 70%)" : "hsl(220, 100%, 70%)"

                        // Inner solid dot
                        context.beginPath()
                        context.arc(projectedPing[0], projectedPing[1], 4 * scaleFactor, 0, 2 * Math.PI)
                        context.fillStyle = pingColor
                        context.fill()

                        // Outer pulsing ring
                        context.beginPath()
                        context.arc(projectedPing[0], projectedPing[1], (4 + pulse * 12) * scaleFactor, 0, 2 * Math.PI)
                        context.strokeStyle = pingColor
                        context.lineWidth = 2 * scaleFactor
                        context.globalAlpha = 1 - pulse
                        context.stroke()
                        context.globalAlpha = 1
                    }
                }
            }
        }

        const loadWorldData = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(
                    "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
                )
                if (!response.ok) throw new Error("Failed to load land data")
                landFeatures = await response.json()

                landFeatures.features.forEach((feature: any) => {
                    const dots = generateDotsInPolygon(feature, 16)
                    dots.forEach(([lng, lat]) => {
                        allDots.push({ lng, lat, visible: true })
                    })
                })

                render()
                setIsLoading(false)
            } catch (err) {
                setError("Failed to load land map data")
                setIsLoading(false)
            }
        }

        const lerp = (start: number, end: number, t: number) => {
            return start * (1 - t) + end * t
        }

        const animate = () => {
            if (!isInteracting) {
                // Snap back rotation
                // Handle potential wrapping issues for cleaner rotation? 
                // For now simple lerp is enough since we aren't doing 360 spins mostly
                rotation[0] = lerp(rotation[0], defaultRotation[0], 0.05)
                rotation[1] = lerp(rotation[1], defaultRotation[1], 0.05)

                // Snap back zoom
                const currentScale = projection.scale()
                const newScale = lerp(currentScale, defaultScale, 0.05)
                projection.scale(newScale)

                // Update projection rotation
                // Note: rotation[2] (gamma) is typically 0 for this view
                projection.rotate([rotation[0], rotation[1], 0])
            }

            render()
        }

        const rotationTimer = d3.timer(animate)

        const handleMouseDown = (event: MouseEvent) => {
            isInteracting = true
            const startX = event.clientX
            const startY = event.clientY
            const startRotation = [...rotation]

            const handleMouseMove = (moveEvent: MouseEvent) => {
                const sensitivity = 0.5
                const dx = moveEvent.clientX - startX
                const dy = moveEvent.clientY - startY

                rotation[0] = startRotation[0] + dx * sensitivity
                rotation[1] = startRotation[1] - dy * sensitivity
                // Clamp latitude to prevent flipping
                rotation[1] = Math.max(-90, Math.min(90, rotation[1]))

                projection.rotate(rotation as [number, number, number])
                render()
            }

            const handleMouseUp = () => {
                isInteracting = false
                document.removeEventListener("mousemove", handleMouseMove)
                document.removeEventListener("mouseup", handleMouseUp)
            }

            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        const handleWheel = (event: WheelEvent) => {
            event.preventDefault()
            const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
            const currentScale = projection.scale()
            const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, currentScale * scaleFactor))

            // Allow manual zoom, but it will snap back once wheeling stops (technically almost immediately unless we debounce)
            // Ideally we should set isInteracting = true for a bit.
            projection.scale(newRadius)
            render()

            // Simple debounce to keep it "interacting" while scrolling
            isInteracting = true
            if ((window as any).wheelTimeout) clearTimeout((window as any).wheelTimeout)
                ; (window as any).wheelTimeout = setTimeout(() => {
                    isInteracting = false
                }, 100)
        }

        canvas.addEventListener("mousedown", handleMouseDown)
        canvas.addEventListener("wheel", handleWheel)

        loadWorldData()

        return () => {
            rotationTimer.stop()
            canvas.removeEventListener("mousedown", handleMouseDown)
            canvas.removeEventListener("wheel", handleWheel)
        }
    }, [width, height, isDarkMode])

    if (error) {
        return (
            <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
                <div className="text-center">
                    <p className="dark text-destructive font-semibold mb-2">Error loading Earth visualization</p>
                    <p className="dark text-muted-foreground text-sm">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            <canvas
                ref={canvasRef}
                className={`w-full h-auto rounded-2xl ${isDarkMode ? "bg-black" : "bg-[#f7f5f3]"}`}
                style={{ maxWidth: "100%", height: "auto", cursor: "grab" }}
            />
        </div>
    )
}
