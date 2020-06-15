# eks-express-react-ts
This repository is for my own educational purposes. 

It contains Terraform infrastructure definition, Docker image definition, GitHub action definition, and configuration to serve a typescript [React](https://reactjs.org/) app with [Node Express](https://expressjs.com/) on [AWS Elastic Kubernetes Service](https://aws.amazon.com/eks/). 

[Terraform Cloud](https://www.terraform.io/) manages infrastructure state.

[GitHub Actions](https://github.com/features/actions) builds the Docker image, and [GitHub Packages](https://github.com/features/packages) stores it.

Steps:
1. Get set up on [AWS Elastic Kubernetes Service](https://aws.amazon.com/eks/)

2. [Set up authorization to access your Docker registry from Kubernetes](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)
    - kubectl create secret docker-registry regcred --namespace=<your-namespace> --docker-server=<your-registry-server> --docker-username=<github-username> --docker-password=<github-token>
    
3. Create version control repository

4. Get set up on [Terraform Cloud](https://www.terraform.io/):
   - create account
   - create workspace
   - link the workspace to version control system repository
   - define variables

5. Push code to the version control repository to trigger a Terraform run which will:
    - create Kubernetes resources
        - namespace
        - node deployment and service
        - ingress
            
- TODO
    - kubernetes secret for github package access in terraform
    - ssl cert via terraform
    - route53 records via terraform https://www.terraform.io/docs/providers/aws/r/route53_record.html