node('slaves') {
    stage('git-pull') {
        git 'https://github.com/Adrian-Covaciu/node_chat_app/'
    }
    stage('run-docker'){
        sh 'chmod +x docker-install.sh'
	sh './docker-install.sh'
    }
}
