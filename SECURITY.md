# Security Policy

The security of the **Virtual Assistant** platform is a top priority. We appreciate the efforts of security researchers and community contributors to report vulnerabilities responsibly.

---

## Supported Versions

Only the latest active branch (`main`) is actively supported with security updates and patches.

| Version | Supported | Status |
|---|---|---|
| `main` (v1.x) | :white_check_mark: | Active support & continuous security patching |
| `< 1.0.0` | :x: | Deprecated |

---

## Reporting a Vulnerability

If you discover a security vulnerability, **please do not open a public issue or discuss it publicly.**

### Recommended Reporting Channels
1. **GitHub Private Vulnerability Reporting**:
   - Go to the repository's **Security** tab → **Advisories** → **Report a vulnerability**.
2. **Direct Contact**:
   - Contact repository maintainer: [swagatsouravdhar](https://github.com/SWAGAT10241).

### Information to Include in Your Report
To help us triage and resolve the issue quickly, please provide:
- A clear description of the vulnerability.
- Steps to reproduce or a Proof of Concept (PoC) script.
- Potential impact and severity assessment.
- Affected component(s) (e.g., Auth middleware, Gemini AI service, Cloudinary upload, Frontend session).

### Response SLA
- **Initial Acknowledgement**: Within **24–48 hours**.
- **Assessment & Triage**: Within **3 business days**.
- **Fix & Public Disclosure**: We adhere to coordinated vulnerability disclosure (CVD) and will coordinate release timing with you.

---

## Built-in Security Architecture & Controls

This repository implements multi-layered security controls:

### 1. Authentication & Session Security
- **HTTP-Only Cookies**: Authentication tokens (`token`) are stored in `httpOnly`, `sameSite: none`, `secure: true` cookies to eliminate client-side token extraction via XSS.
- **Header Fallback**: Supports `Authorization: Bearer <token>` for API/mobile clients.
- **Automatic Password Sanitization**: Passwords are automatically stripped from User schema serialization before returning HTTP responses.
- **Bcrypt Hashing**: User passwords are encrypted with bcrypt (10 salt rounds).

### 2. Static Analysis & Vulnerability Scanning
- **CodeQL SAST**: GitHub CodeQL scans all JavaScript/TypeScript code for NoSQL injections, XSS, prototype pollution, and security regressions on every push, PR, and weekly schedule.
- **Gitleaks Secret Scanning**: Scans git commit diffs to prevent accidental commits of API keys (Gemini API keys, Cloudinary credentials, MongoDB connection strings, JWT secrets).
- **Dependency Review & Dependabot**: Automated weekly checks and PR scanning for vulnerable third-party npm packages.

### 3. File Upload Safety
- **MIME Type Validation**: Only verified `image/*` MIME types are accepted.
- **Size Gating**: File uploads are capped at 5MB.
- **Disk Cleanup**: Temporary upload files on local disk are strictly cleaned up immediately after Cloudinary processing, whether the upload succeeds or fails.

---

## Best Practices for Developers

- **Never commit `.env` files**: All secrets, database credentials, and API keys must be kept in untracked `.env` files.
- **Revoke Exposed Keys**: If any credential is accidentally exposed in git history, revoke and rotate it immediately in the corresponding service provider dashboard (Google AI Studio, Cloudinary, MongoDB Atlas).
- **Keep Dependencies Fresh**: Regularly run `pnpm update` or review Dependabot security pull requests.