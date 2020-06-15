resource "kubernetes_deployment" "react" {
  metadata {
    name = "react"
    labels = {
      App = "react"
    }
    namespace = kubernetes_namespace.react.metadata[0].name
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        App = "react"
      }
    }
    template {
      metadata {
        labels = {
          App = "react"
        }
      }

      spec {

        image_pull_secrets {
          name = "regcred"
        }

        container {
          image             = "${var.github_docker_registry_url}:latest"
          image_pull_policy = "Always"
          name              = "react"

          port {
            container_port = 3000
          }

          resources {
            limits {
              cpu    = "2.0"
              memory = "4096Mi"
            }
            requests {
              cpu    = "250m"
              memory = "50Mi"
            }
          }
        }
      }
    }
  }
}