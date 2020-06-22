pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Running build automation'
                bat "node ./"
                echo 'Application is running'
            }
        }
    }
}
