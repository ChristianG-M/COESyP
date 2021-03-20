def COLOR_MAP = ['SUCCESS': 'good', 'FAILURE': 'danger', 'UNSTABLE': 'danger', 'ABORTED': 'danger']
pipeline{
  agent{
    kubernetes {
      cloud 'kubernetes_dev'
      yamlFile 'JenkinsPod.yml'
    }
  }
  environment {
      GIT_SHORT = sh(returnStdout: true, script: 'echo $GIT_COMMIT | cut -c1-10').trim()
      APP_VERSION = sh(returnStdout: true, script: 'awk \'/version/{gsub(/("|",)/,"",$2);print $2};\' package.json').trim()
  }
  stages {
    stage('ESLint') {
      steps {
        container('node-12') {
          sh '''
          echo "Corriendo stage de ESLint."
          echo "Instalación de dependencias ESLint."
          npm install
          echo "Ejecución del ESLint."
          npm run eslint
          '''
        }
      }
    }
    stage('Pruebas unitarias') {
      steps {
        container('node-12') {
          sh 'npm run test'
          echo 'Terminando de ejecutar pruebas unitarias.'
        }
      }
    }
    stage('Pruebas de Mutación') {
      steps {
        container('node-12') {
          echo 'Corriendo stage de Stryker ( pruebas de mutación ).'
          sh '''
            apk add git
            npm run stryker
            '''
            echo 'Terminando de ejecutar pruebas de mutación.'
        }
      }
    }
    stage('Construcción de imagen docker') {
      steps {
        container('docker'){
          withDockerRegistry([ credentialsId: "prueba", url: "http://prueba.registry.coesyp.com.mx" ]) {
            sh '''
            docker build --add-host prueba.npm.coesyp.com.mx:0.0.0.0 -t nexus.registry.coesyp.com.mx/frontend-contenedor-principal:$APP_VERSION.$GIT_SHORT \
            docker push nexus.registry.coesyp.com.mx/frontend-contenedor-principal:$APP_VERSION.$GIT_SHORT
            '''
          }
        }
      }
    }
    stage('Despliegue') {
      steps {
        container('kubectl'){
            configFileProvider([configFile(fileId: 'kubectl-configuration', targetLocation: 'kubeconfig')]) {
                sh '''
                export KUBECONFIG=`pwd`/kubeconfig
                kubectl set image -n reactencabezadons deployment/contenedor-principal contenedor-principal=nexus.registry.coesyp.com.mx/frontend-contenedor-principal:$APP_VERSION.$GIT_SHORT
                '''
            }
        }
      }
    }
  }
  post{
     always{
        slackSend( message: "Deploy *${currentBuild.currentResult}:* - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.RUN_DISPLAY_URL}>)", teamDomain: 'coesypgroup', tokenCredentialId: 'jenkins_slack_netac', color: COLOR_MAP[currentBuild.currentResult], baseUrl: 'https://coesypgroup.slack.com/services/hooks/jenkins-ci/', botUser: false, channel: '#ci')
      }
  }
}