resource "azurerm_container_registry" "container_registry" {
  name                = "fl1xtub3"
  resource_group_name = azurerm_resource_group.flixtube.name
  location            = "westus"
  admin_enabled       = true
  sku                 = "Basic"
}

output "registry_hostname" {
  value = azurerm_container_registry.container_registry.login_server
}

output "registry_un" {
  value = azurerm_container_registry.container_registry.admin_username
}

output "registry_pw" {
  value = azurerm_container_registry.container_registry.admin_password
  sensitive = true
}