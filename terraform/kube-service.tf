resource "kubernetes_service" "react" {
  metadata {
    name      = "react-service"
    namespace = kubernetes_namespace.react.metadata[0].name
  }
  spec {
    selector = {
      App = kubernetes_deployment.react.spec.0.template.0.metadata[0].labels.App
    }
    port {
      port = 3000
    }
    type = "ClusterIP"
  }
}