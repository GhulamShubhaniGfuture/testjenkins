pipeline {
    agent any
    tools {
        nodejs 'NodeJS_LTS' // Replace with the name you configured in Global Tool Configuration
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}


// pipeline {
//     agent any
//     tools {
//         nodejs 'NodeJS_LTS' // Replace with your configured Node.js installation
//     }
//     stages {
//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install'
//             }
//         }
//         stage('Build') {
//             steps {
//                 bat 'npm run build'
//             }
//         }
//         stage('Test') {
//             steps {
//                 bat 'npm test'
//             }
//         }
//     }
// }


// pipeline {
//     agent any
//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/GhulamShubhaniGfuture/testjenkins.git'
//             }
//         }
//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install' // Use bat if on Windows
//             }
//         }
//         stage('Run Tests') {
//             steps {
//                 bat 'npm test' // Or bat 'npm test' on Windows
//             }
//         }
//         stage('Build') {
//             steps {
//                 bat 'npm run build' // Or bat 'npm run build'
//             }
//         }
//     }
// }


