terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>2.0"
    }
  }
}

provider "tls" {
  version = "2.1.0"
}

provider "azurerm" {
  features {}
}
