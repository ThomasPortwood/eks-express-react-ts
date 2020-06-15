resource "kubernetes_namespace" "react" {
  metadata {
    name = "react"
  }
}