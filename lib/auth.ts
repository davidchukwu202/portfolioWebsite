import { envConfig } from "./env"

export interface AuthSession {
  isAuthenticated: boolean
  loginTime: number
  expiresAt: number
  attempts?: number
  lockedUntil?: number
}

export class AuthManager {
  private static instance: AuthManager
  private session: AuthSession | null = null

  private constructor() {
    this.loadSession()
  }

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager()
    }
    return AuthManager.instance
  }

  private loadSession(): void {
    if (typeof window === "undefined") return // ✅ prevent crash on server
    try {
      const sessionData = localStorage.getItem(envConfig.sessionKey || "portfolio-admin-session")
      if (sessionData) {
        const session: AuthSession = JSON.parse(sessionData)
        if (session.expiresAt > Date.now()) {
          this.session = session
        } else {
          this.clearSession()
        }
      }
    } catch (error) {
      this.clearSession()
    }
  }

  private saveSession(session: AuthSession): void {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(envConfig.sessionKey || "portfolio-admin-session", JSON.stringify(session))
      this.session = session
    } catch (error) {
      console.error("Error saving session:", error)
    }
  }

  private clearSession(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(envConfig.sessionKey || "portfolio-admin-session")
    this.session = null
  }

  login(username: string, password: string): { success: boolean; error?: string } {
    if (username === envConfig.adminUsername && password === envConfig.adminPassword) {
      const now = Date.now()
      const session: AuthSession = {
        isAuthenticated: true,
        loginTime: now,
        expiresAt: now + envConfig.sessionDurationHours * 60 * 60 * 1000, // configurable
      }

      this.saveSession(session)
      return { success: true }
    } else {
      return { success: false, error: "Invalid username or password" }
    }
  }

  logout(): void {
    this.clearSession()
  }

  isAuthenticated(): boolean {
    if (!this.session) return false
    if (this.session.expiresAt <= Date.now()) {
      this.clearSession()
      return false
    }
    return this.session.isAuthenticated
  }

  getRemainingTime(): number {
    if (!this.session) return 0
    return Math.max(0, this.session.expiresAt - Date.now())
  }

  extendSession(): void {
    if (this.session && this.isAuthenticated()) {
      const now = Date.now()
      this.session.expiresAt = now + envConfig.sessionDurationHours * 60 * 60 * 1000
      this.saveSession(this.session)
    }
  }
}
