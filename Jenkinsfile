pipeline {
    /* --------------------------------------------------
       1) use the default Linux node (the one in /var/lib/jenkins/…)
       -------------------------------------------------- */
    agent any

    /* --------------------------------------------------
       2) make Node.js available (Configure once in
          Manage Jenkins ▸ Global Tool Configuration)
       -------------------------------------------------- */
    tools {
        nodejs 'NodeJS_LTS'   // ← the name you gave the tool
    }

    stages {

        /* ---------- checkout source ---------- */
        stage('Checkout') {
            steps {
                /*
                 * If the repo is private add   credentialsId: 'github-ssh'
                 * and keep the url as   git@github.com:org/repo.git
                 */
                git branch: 'main',
                    url: 'https://github.com/GhulamShubhaniGfuture/testjenkins.git'
            }
        }

        /* ---------- dependencies ---------- */
        stage('Install dependencies') {
            steps {
                sh 'npm ci'            // reproducible install
            }
        }

        /* ---------- tests ---------- */
        stage('Test') {
            steps {
                sh 'npm test --silent'
            }
            post {
                always {
                    /* if your tests output junit.xml */
                    junit '**/junit.xml'
                }
            }
        }

        /* ---------- build ---------- */
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    /* optional notifications, cleanup, etc. */
    post {
        success {
            echo '✅ Build & tests passed'
        }
        failure {
            echo '❌ Build failed'
        }
    }
}
