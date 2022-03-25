terraform {
  backend "azurerm" {
    resource_group_name  = "NetworkWatcherRG"
    storage_account_name = "terr4fm"
    container_name       = "terraform"
    key                  = "terraform.tfstate"
  }
}
