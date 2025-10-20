// TODO : Pipeline script goes here
pipeline {
    agent any

    tools {
        nodejs 'node-22'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Lint Code') {
            steps {
                dir('server') {
                    sh 'npm run lint:fix'
                }
            }
        }

        stage('Build Application') {
            steps {
                dir('server') {
                    sh 'npm run build'
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
            cleanWs()
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
