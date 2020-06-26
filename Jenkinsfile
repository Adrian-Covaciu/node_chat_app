pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Running build automation'
                bat "npm install"
                echo 'Modules installed'
                sh "npm start"
                echo 'Application is running'
            }
        }
    }
}
