/*
 * Jenkinsfile – Declarative pipeline for a Vite-powered React app
 * Prerequisites on the Jenkins agent:
 *   1. “NodeJS_LTS” tool configured in Manage Jenkins ▸ Global Tool Configuration
 *      (Node ≥ 18 is ideal for Vite 5+).
 *   2. Git credentials / SSH keys added to the Credentials store
 *   3. Optional: AWS CLI, rsync, or scp installed if you use the publish stage.
 */

pipeline {
  /* ———————————————————————————————————————————————————————————————————
     Where to run the build
     ——————————————————————————————————————————————————————————————————— */
  agent any            // or agent { label 'react-builder' } if you pin a node

  /* ———————————————————————————————————————————————————————————————————
     Tool versions
     ——————————————————————————————————————————————————————————————————— */
  tools {
    nodejs 'NodeJS_LTS'   // exact name must match what you configured in Jenkins
  }

  /* ———————————————————————————————————————————————————————————————————
     Global environment variables
     ——————————————————————————————————————————————————————————————————— */
  environment {
    // If you need API endpoints or secrets in CI, inject them here.
    // Example, pulling an API base URL from Jenkins credentials:
    // VITE_API_BASE_URL = credentials('react-api-base-url')
    CI = 'true'
  }

  /* ———————————————————————————————————————————————————————————————————
     Pipeline stages
     ——————————————————————————————————————————————————————————————————— */
  stages {

    stage('Checkout') {
      steps {
        checkout scm          // pulls the branch that triggered the build
      }
    }

    stage('Install dependencies') {
      steps {
        // `npm ci` is faster & repeatable for CI; falls back to npm install for non-lockfile projects
        sh '''
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi
        '''
      }

      /* Cache the ~/.npm directory between builds to speed things up.        */
      // Requires the "Pipeline Utility Steps" plugin for stash/unstash,
      // or use the built-in cache step on recent Jenkins versions.
      post {
        always {
          cache(name: 'npm-cache', paths: ['~/.npm'], key: "npm-cache-${env.NODE_NAME}")
        }
      }
    }

    stage('Lint & Unit Tests') {
      when { expression { fileExists('package.json') } }
      steps {
        // Skip if you don't have lint/test scripts
        sh 'npm run lint --if-present'
        sh 'npm test --if-present'
      }
    }

    stage('Build') {
  steps {
    // fail fast if anything goes wrong
    sh '''
      set -euxo pipefail
      npm run build
    '''
  }
}


    /* ——————————————————————————————————————————————————————————————————
       Optional deploy stage – only runs on main|master
       —————————————————————————————————————————————————————————————————— */
    stage('Publish') {
      when {
        branch pattern: '^(main|master)$', comparator: 'REGEXP'
      }
      steps {
        /* Example options (pick one):
           1. rsync to NGINX box:
              sh 'rsync -avz --delete dist/ myuser@frontend.example.com:/var/www/app'
           2. S3 static hosting:
              sh 'aws s3 sync dist s3://my-react-site --delete'
           3. Copy to another Jenkins job or artifact repo.
        */
        echo 'Publishing build…'
      }
    }
  }

  /* ———————————————————————————————————————————————————————————————————
     Post-build notifications
     ——————————————————————————————————————————————————————————————————— */
  post {
    success {
      echo '✅ React app built and published successfully.'
      // slackSend, email, etc.
    }
    failure {
      echo '❌ Build failed – check logs.'
      // mail to: ..., slackSend ...
    }
  }
}
