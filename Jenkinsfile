// TODO : Pipeline script goes here
pipeline {
    agent any

    tools {
        nodejs 'Nodejs_22'
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        BUILD_NUMBER = 'latest'
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
                        def imageName = 'moabdelazem/items-api'
                        def imageTag = "${env.BUILD_NUMBER}"

                        // Build Docker image
                        sh "docker build -t ${imageName}:${imageTag} ."
                        sh "docker tag ${imageName}:${imageTag} ${imageName}:latest"

                    // Login to Docker Hub and push
                    // withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    //     sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                    //     sh "docker push ${imageName}:${imageTag}"
                    //     sh "docker push ${imageName}:latest"
                    // }
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
