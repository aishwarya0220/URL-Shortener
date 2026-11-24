// Returns true only for http(s) URLs with a real-looking host (blocks "javascript:", "not-a-url", etc.)
export default function isValidHttpUrl(value: string): boolean {
    try {
        const url = new URL(value)

        const isHttp = url.protocol === 'http:' || url.protocol === 'https:'
        const hasHost = url.hostname.includes('.') || url.hostname === 'localhost'

        return isHttp && hasHost
    } catch {
        return false
    }
}
