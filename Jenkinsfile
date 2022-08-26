pipeline {
    agent any

    tools {
        nodejs 'node-16.16'
    }

    parameters {
            gitParameter branchFilter: 'origin.*/(.*)',
                         name: 'BRANCH_TAG',
                         type: 'PT_BRANCH_TAG',
                         defaultValue: 'main'
        }

    stages {
        stage('Build') {
            steps {
                sh " npm version"
                checkout([$class: 'GitSCM',
                    branches: [[name: "${params.BRANCH_TAG}"]],
                    userRemoteConfigs: [[url: 'https://github.com/wok-gocaspi/zeitodo-frontend.git']]])
                sh "npm install"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh "npm run test"
            }
        }
        stage('Build Docker Image') {
            steps {
                script{
                    docker.withRegistry('https://zeitodoreg.azurecr.io', 'ZeiToDoAzure') {
                      docker.build("zeitodoreg.azurecr.io/zeitodofrontend")
                    }
                }
            }
        }
    }
}