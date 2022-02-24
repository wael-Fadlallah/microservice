# Microservice demo project 

About the project 
the project is just a sample aiming to demonstrate how different parts communicate in a microservice architecture

Project components and technology stack
- Service-registry (NestJs,Typescript)
  a database(of sort) of services, Service instances are registered with the service registry on startup and deregistered on shutdown. 
  Client of the service and/or routers query the service registry to find the available instances of a service.
- Service (NestJs,Typescript)
  The main entity of the architecture which contain the logic that we require 
- Client (Vite, Typescript, Tailwind)
  The consumer of the service through the service provider 
  
  Run the project:
  - Open three terminals sessions 
  - `cd service-registry`
  - install the project dependencies
   `yarn # or npm install` 
  - Run the project `yarn run start:dev`
  - `cd service`
  - install the project dependencies
   `yarn # or npm install` 
  - Run the project `yarn run start:dev`
  - `cd client`
  - install the project dependencies
   `yarn # or npm install` 
  - Run the project `yarn run dev`



