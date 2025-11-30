# Environment Configuration

## GitHub Repository
For production, Keystatic needs to know which GitHub repository to sync with.
Set the `NEXT_PUBLIC_GITHUB_REPO_PATH` environment variable in your Vercel project settings.

Example:
`NEXT_PUBLIC_GITHUB_REPO_PATH="YourUsername/YourRepoName"`

If not set, it defaults to `D-Murenzi/TanteBeauty`.

## Keystatic Authentication (Production)
In production, Keystatic uses GitHub OAuth for authentication instead of local passwords.
You must set the following environment variables in Vercel:

| Variable Name | Description | How to Get It |
| :--- | :--- | :--- |
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub OAuth Client ID | [GitHub Developer Settings](https://github.com/settings/developers) > New OAuth App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | Generated in GitHub OAuth App settings |
| `KEYSTATIC_SECRET` | Session Encryption Key | Run `openssl rand -base64 32` or generate a random string |

### GitHub OAuth App Setup
1. Go to **GitHub Developer Settings** > **OAuth Apps**.
2. Click **New OAuth App**.
3. **Application Name**: Tante Beauty CMS
4. **Homepage URL**: `https://tantebeauty.com` (Your production URL)
5. **Authorization callback URL**: `https://tantebeauty.com/api/keystatic/github/oauth/callback`
6. Register application and copy the Client ID and Client Secret.
