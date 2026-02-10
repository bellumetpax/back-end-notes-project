# Push to GitHub (Secure)

## Before pushing

- `.gitignore` excludes: `node_modules`, `.env`, `.env.*`, `*.key`, `*.pem`, `secrets/`
- No secrets or tokens are in the codebase

## Steps

1. **Create the repo** on GitHub: https://github.com/new  
   - Name: `back-end-notes-project`  
   - Public or private

2. **Add remote** (replace `YOUR_USERNAME` with your GitHub username):
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/back-end-notes-project.git
   ```

3. **Push using token** (choose one method):

   **Option A – Token in URL (use once, avoid long-term)**  
   Replace `YOUR_TOKEN` and `YOUR_USERNAME`:
   ```powershell
   git push https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/back-end-notes-project.git main
   ```
   Or if your branch is `master`:
   ```powershell
   git push https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/back-end-notes-project.git master
   ```

   **Option B – Env var (keeps token out of shell history)**  
   ```powershell
   $env:GITHUB_TOKEN = "your_token_here"
   git push https://$env:GITHUB_TOKEN@github.com/YOUR_USERNAME/back-end-notes-project.git main
   ```

   **Option C – GitHub CLI**  
   ```powershell
   gh auth login
   git push -u origin main
   ```

4. **Revoke token after use** (for Options A/B) at: https://github.com/settings/tokens
