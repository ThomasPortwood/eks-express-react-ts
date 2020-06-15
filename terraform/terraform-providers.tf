terraform {
  backend "remote" {
    organization = "SomeSoftwareTeam"
    workspaces {
      name = "eks-express-react"
    }
  }
}

data "aws_eks_cluster_auth" "default" {
  name = "default"
}

provider "kubernetes" {
  host                   = var.kubernetes_api_server_endpoint
  cluster_ca_certificate = base64decode(var.kubernetes_api_server_cert_auth)
  token                  = data.aws_eks_cluster_auth.default.token
  load_config_file       = false
}

provider "aws" {
  profile    = "default"
  region     = "us-east-1"
  access_key = var.provider_access_key
  secret_key = var.provider_secret_key
}

provider "github" {
  token        = var.github_token
  organization = "SomeSoftwareTeam"
}