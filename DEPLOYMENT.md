# 🚀 Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- ✅ Built the project locally (`npm run build`)
- ✅ Tested the production build (`npm run preview`)
- ✅ Replaced JSON Server with a real API (for production)
- ✅ Set up environment variables

---

## 🌐 Netlify Deployment

### Method 1: Netlify CLI

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Build the project**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod
```

4. **Follow prompts**:
   - Choose "Create & configure a new site"
   - Select your team
   - Enter site name
   - Publish directory: `dist`

### Method 2: Netlify UI

1. **Build locally**:
```bash
npm run build
```

2. **Go to [Netlify](https://app.netlify.com)**

3. **Drag & drop** the `dist` folder

4. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Method 3: Git Integration

1. **Push to GitHub/GitLab/Bitbucket**

2. **Connect to Netlify**:
   - Click "New site from Git"
   - Choose your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Environment Variables** (if needed):
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL=https://your-api.com`

4. **Deploy**!

### Netlify Configuration

The `netlify.toml` file is already configured:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  command = "npm run build"
  publish = "dist"
```

---

## ▲ Vercel Deployment

### Method 1: Vercel CLI

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Follow prompts**:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: admin-dashboard
   - Directory: ./
   - Override settings: No

4. **Production deployment**:
```bash
vercel --prod
```

### Method 2: Vercel UI

1. **Go to [Vercel](https://vercel.com)**

2. **Import Project**:
   - Click "New Project"
   - Import from Git repository

3. **Configure**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables**:
   - Add: `VITE_API_URL=https://your-api.com`

5. **Deploy**!

### Vercel Configuration

Create `vercel.json` (optional):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 🔥 Firebase Hosting

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login**:
```bash
firebase login
```

3. **Initialize**:
```bash
firebase init hosting
```

4. **Configure**:
   - Public directory: `dist`
   - Single-page app: Yes
   - Automatic builds: No

5. **Build**:
```bash
npm run build
```

6. **Deploy**:
```bash
firebase deploy
```

---

## 🐙 GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**:
```json
{
  "homepage": "https://yourusername.github.io/admin-dashboard",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js**:
```js
export default defineConfig({
  base: '/admin-dashboard/',
  // ... rest of config
});
```

4. **Deploy**:
```bash
npm run deploy
```

---

## 🌊 Surge

1. **Install Surge**:
```bash
npm install -g surge
```

2. **Build**:
```bash
npm run build
```

3. **Deploy**:
```bash
cd dist
surge
```

4. **Follow prompts**:
   - Email and password (first time)
   - Domain name (or use generated)

---

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Create nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build and Run

```bash
# Build image
docker build -t admin-dashboard .

# Run container
docker run -p 8080:80 admin-dashboard
```

---

## ☁️ AWS S3 + CloudFront

### 1. Build the project
```bash
npm run build
```

### 2. Create S3 Bucket
- Go to AWS S3 Console
- Create bucket (e.g., `admin-dashboard`)
- Enable static website hosting
- Upload `dist` folder contents

### 3. Configure Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::admin-dashboard/*"
    }
  ]
}
```

### 4. Create CloudFront Distribution
- Origin: Your S3 bucket
- Default root object: `index.html`
- Error pages: 404 → /index.html (for SPA routing)

### 5. Deploy with AWS CLI
```bash
aws s3 sync dist/ s3://admin-dashboard --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## 🔧 Environment Variables

### Create `.env.production`

```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=AdminPro
VITE_ENABLE_ANALYTICS=true
```

### Platform-specific Setup

**Netlify**: Site settings → Environment variables

**Vercel**: Project settings → Environment Variables

**GitHub Actions**: Repository settings → Secrets

---

## 🔄 CI/CD with GitHub Actions

### Create `.github/workflows/deploy.yml`

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=dist
```

---

## 🔒 Security Checklist

Before deploying:

- [ ] Replace mock API with real backend
- [ ] Set up proper authentication
- [ ] Configure CORS on backend
- [ ] Use HTTPS (SSL certificate)
- [ ] Set up environment variables
- [ ] Remove console.logs
- [ ] Enable rate limiting
- [ ] Add security headers
- [ ] Implement CSP (Content Security Policy)
- [ ] Set up monitoring/logging

---

## 📊 Post-Deployment

### 1. Test Production Build
```bash
npm run preview
```

### 2. Check Performance
- Run Lighthouse audit
- Test on different devices
- Check loading times

### 3. Monitor
- Set up error tracking (Sentry)
- Set up analytics (Google Analytics)
- Monitor API calls

### 4. Custom Domain
- Configure DNS records
- Set up SSL certificate
- Update environment variables

---

## 🐛 Troubleshooting

### Blank Page After Deploy
- Check browser console for errors
- Verify `base` in vite.config.js
- Check routing configuration
- Ensure SPA redirects are set up

### 404 on Refresh
- Configure server redirects
- For Netlify: Check `netlify.toml`
- For Vercel: Check `vercel.json`
- For others: Configure server to serve index.html

### Environment Variables Not Working
- Prefix with `VITE_`
- Rebuild after adding variables
- Check platform-specific syntax

### Build Fails
- Clear node_modules and reinstall
- Check Node version (18+)
- Verify all dependencies installed
- Check for TypeScript errors

---

## 📞 Support

For deployment issues:
- Check platform documentation
- Review build logs
- Test locally first
- Check environment variables

---

**Happy Deploying! 🎉**

Your modern admin dashboard is ready for production!
