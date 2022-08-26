pipeline {
    agent any

    tools {
        nodejs 'node-16.16'
    }
    environment {
        registry = "zeitodoreg.azurecr.io/zeitodofrontend"
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
                    docker.build(registry, "--build-arg VUE_APP_BASE_URL=http://zeitodobackend.northeurope.azurecontainer.io -t \"${registry}:${params.BRANCH_TAG}-${env.BUILD_NUMBER}\" .")
                }
            }
        }
    }
}