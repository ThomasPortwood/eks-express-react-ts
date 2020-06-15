resource "kubernetes_ingress" "react" {
  metadata {
    name      = "react"
    namespace = kubernetes_namespace.react.metadata[0].name
    annotations = {
      "kubernetes.io/ingress.class"               = "alb"
      "alb.ingress.kubernetes.io/scheme"          = "internet-facing"
      "alb.ingress.kubernetes.io/target-type"     = "ip"
      "alb.ingress.kubernetes.io/success-codes"   = "200-399"
      "alb.ingress.kubernetes.io/certificate-arn" = var.ssl_cert_arn
      "alb.ingress.kubernetes.io/listen-ports"    = "[{\"HTTPS\":443}]"
    }
  }
  spec {
    rule {
      host = "leslie.somesoftwareteam.com"
      http {
        path {
          backend {
            service_name = kubernetes_service.react.metadata[0].name
            service_port = 3000
          }
        }
      }
    }
  }
}