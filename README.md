# Inventory & Order System REST API

> A CRUD API for tracking inventory and orders

## Table of Contents

1. [Usage](#Usage)
   - [Requests](#Requests)
   - [Responses](#Responses)

## Usage

Below are the requests and responses for this API.

### Requests
#### Inventory
Request | URL | Method | Returns | Inputs
--------- | ---------- | ---------- | ---------- | ----------
Create inventory item | /inventory | POST | [inventory_item_created](#inventory_item_created) | [create_inventory_item](#create_inventory_item)
Read all inventory items | /inventory | GET | [inventory_items](#inventory_items) | none
Read single inventory item | /inventory/:id | GET | [inventory_item](#inventory_item) | param: `id`
Update inventory item | /inventory/:id | PUT | [inventory_item_updated](#inventory_item_updated) | param: `:id`, [update_inventory_item](#update_inventory_item)
Delete inventory item | /inventory/:id | DELETE | [inventory_item_deleted](#inventory_item_deleted) | param: `id`

#### Orders
Request | URL | Method | Returns | Inputs
--------- | ---------- | ---------- | ---------- | ----------
Create order | /orders | POST | [order_created](#order_created) | [create_order](#create_order)
Read all orders | /orders | GET | [orders](#orders) | none
Read single order | /orders/:id | GET | [order](#order) | param: `id`
Update order | /orders/:id | PUT | [order_updated](#order_updated) | param: `:id`, [update_order](#update_order)
Delete order | /orders/:id | DELETE | [inventory_deleted](#inventory_deleted) | param: `id`

### Responses

Response payloads are the following:

#### inventory
##### inventory_item_created
```json
  {
    "item": {
        "id": 1,
        "name": "Haribo",
        "description": "Gummies",
        "price": "19.99",
        "units_available": 10,
        "updatedAt": "2020-02-05T16:44:55.187Z",
        "createdAt": "2020-02-05T16:44:55.187Z"
    }
  }
```
##### inventory_items
```json
  {
    "items": [
        {
            "id": 1,
            "name": "Haribo",
            "description": "Gummies",
            "price": "19.99",
            "units_available": 10,
            "createdAt": "2020-02-06T04:57:14.914Z",
            "updatedAt": "2020-02-06T04:57:14.914Z"
        },
        {
            "id": 2,
            "name": "Generic",
            "description": "Gummies",
            "price": "19.99",
            "units_available": 10,
            "createdAt": "2020-02-06T04:57:24.529Z",
            "updatedAt": "2020-02-06T04:57:24.529Z"
        },
        {
            "id": 3,
            "name": "Premium",
            "description": "Gummies",
            "price": "19.99",
            "units_available": 10,
            "createdAt": "2020-02-06T04:57:31.889Z",
            "updatedAt": "2020-02-06T04:57:31.889Z"
        }
    ]
  }
```
##### inventory_item
```json
  {
    "item": {
        "id": 1,
        "name": "Haribo",
        "description": "Gummies",
        "price": "19.99",
        "units_available": 10,
        "createdAt": "2020-02-06T04:57:14.914Z",
        "updatedAt": "2020-02-06T04:57:14.914Z"
    }
  }
```
##### inventory_item_updated
```json
  {
    "item": [
        1
    ]
  }
```
##### inventory_item_deleted
```json
  {
    "id": 1,
    "name": "Haribobo",
    "description": "Jumbo Gummies",
    "price": "44.99",
    "units_available": 100,
    "createdAt": "2020-02-06T04:57:14.914Z",
    "updatedAt": "2020-02-06T04:59:35.453Z"
  }
```

### Inputs

Endpoints expect the following request body contents:

#### inventory

##### create_inventory_json
```json
  {
    "name": "Haribo",
    "description": "Gummies",
    "price": 19.99,
    "quantity": 10
  }
```
##### update_inventory_json
```json
  {
    "name": "Haribobo",
    "description": "Jumbo Gummies",
    "price": 44.99,
    "quantity": 100
  }
```