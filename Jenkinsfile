// TODO : Pipeline script goes here
pipeline {
    agent any

    tools {
        nodejs 'Nodejs_22'
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        IMAGE_NAME = 'moabdelazem/items-api'
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

        stage('Build Docker Image') {
            steps {
                dir('server') {
                    script {
                        def imageTag = "${env.BUILD_NUMBER}"

                        // Build Docker image
                        sh "docker build -t ${env.IMAGE_NAME}:${imageTag} ."
                        sh "docker tag ${env.IMAGE_NAME}:${imageTag} ${env.IMAGE_NAME}:latest"

                        // Login to Docker Hub and push
                        withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                            sh "docker push ${env.IMAGE_NAME}:${imageTag}"
                            sh "docker push ${env.IMAGE_NAME}:latest"
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
