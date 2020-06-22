pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Running build automation'
                bat "npm install"
                echo 'Modules installed'
                bat "node ./"
                echo 'Application is running'
            }
        }
    }
}
