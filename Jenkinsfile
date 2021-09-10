node('permanent') {
    stage('git-pull') {
        git 'https://github.com/Adrian-Covaciu/node_chat_app/'
    }
    stage('run-docker'){
        sh 'ls -ltrh'
        sh 'sudo docker build -t weather .'
        sh 'sudo docker container run -d -p 8080:3000 weather'
    }
}
